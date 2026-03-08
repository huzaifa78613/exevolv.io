from http.server import BaseHTTPRequestHandler
import json
import re
import yt_dlp


def extract_video_id(url):
    # Clean the URL - strip whitespace
    url = url.strip()
    
    patterns = [
        # Standard watch URL: youtube.com/watch?v=VIDEO_ID (with optional extra params like &feature=share, &si=xxx)
        r'(?:youtube\.com\/watch\?.*?v=)([a-zA-Z0-9_-]{11})',
        # Short URL: youtu.be/VIDEO_ID (with optional ?si=xxx or other params)
        r'(?:youtu\.be\/)([a-zA-Z0-9_-]{11})',
        # Embed URL: youtube.com/embed/VIDEO_ID
        r'(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})',
        # Shorts URL: youtube.com/shorts/VIDEO_ID
        r'(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})',
        # Old embed URL: youtube.com/v/VIDEO_ID
        r'(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})',
        # Live URL: youtube.com/live/VIDEO_ID
        r'(?:youtube\.com\/live\/)([a-zA-Z0-9_-]{11})',
        # Music URL: music.youtube.com/watch?v=VIDEO_ID
        r'(?:music\.youtube\.com\/watch\?.*?v=)([a-zA-Z0-9_-]{11})',
        # Just a video ID (11 characters)
        r'^([a-zA-Z0-9_-]{11})$',
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None


def format_duration(seconds):
    if not seconds:
        return ''
    seconds = int(seconds)
    h = seconds // 3600
    m = (seconds % 3600) // 60
    s = seconds % 60
    if h > 0:
        return f'{h}:{m:02d}:{s:02d}'
    return f'{m}:{s:02d}'


def format_views(views):
    if not views:
        return ''
    views = int(views)
    if views >= 1_000_000:
        return f'{views / 1_000_000:.1f}M views'
    if views >= 1_000:
        return f'{views / 1_000:.1f}K views'
    return f'{views} views'


def format_file_size(bytes_val):
    if not bytes_val:
        return ''
    bytes_val = int(bytes_val)
    if bytes_val >= 1_073_741_824:
        return f'{bytes_val / 1_073_741_824:.1f} GB'
    if bytes_val >= 1_048_576:
        return f'{bytes_val / 1_048_576:.1f} MB'
    if bytes_val >= 1024:
        return f'{bytes_val / 1024:.1f} KB'
    return f'{bytes_val} B'


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body = json.loads(self.rfile.read(content_length)) if content_length else {}
            url = body.get('url', '')

            if not url:
                self.send_json(400, {'error': 'URL is required'})
                return

            video_id = extract_video_id(url)
            if not video_id:
                self.send_json(400, {'error': 'Invalid YouTube URL'})
                return

            ydl_opts = {
                'quiet': True,
                'no_warnings': True,
                'skip_download': True,
                'no_check_certificates': True,
            }

            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=False)

            if not info:
                self.send_json(500, {'error': 'Failed to extract video information'})
                return

            raw_formats = info.get('formats', [])
            formats = []
            seen_video = set()
            seen_audio = set()

            # Collect muxed formats (video + audio in one stream)
            for f in raw_formats:
                f_url = f.get('url')
                if not f_url:
                    continue

                vcodec = f.get('vcodec', 'none') or 'none'
                acodec = f.get('acodec', 'none') or 'none'
                height = f.get('height')

                has_video = vcodec != 'none' and height
                has_audio = acodec != 'none'

                if has_video and has_audio:
                    quality = f'{height}p'
                    if quality not in seen_video:
                        seen_video.add(quality)
                        size = f.get('filesize') or f.get('filesize_approx') or 0
                        ext = f.get('ext', 'mp4')
                        formats.append({
                            'quality': quality,
                            'type': 'video',
                            'format': ext,
                            'label': f'{quality} ({ext.upper()})',
                            'itag': str(f.get('format_id', '')),
                            'size': format_file_size(size),
                            'hasAudio': True,
                            'downloadUrl': f_url,
                        })

            # Collect video-only adaptive formats (higher quality options)
            for f in raw_formats:
                f_url = f.get('url')
                if not f_url:
                    continue

                vcodec = f.get('vcodec', 'none') or 'none'
                acodec = f.get('acodec', 'none') or 'none'
                height = f.get('height')
                ext = f.get('ext', 'mp4')

                has_video = vcodec != 'none' and height
                has_audio = acodec != 'none'

                # Only add video-only if we don't already have a muxed format at this quality
                # and only for higher quality formats (720p+)
                if has_video and not has_audio and ext == 'mp4':
                    quality = f'{height}p'
                    key = f'{quality}_vidonly'
                    if quality not in seen_video and key not in seen_video and height >= 720:
                        seen_video.add(key)
                        size = f.get('filesize') or f.get('filesize_approx') or 0
                        formats.append({
                            'quality': quality,
                            'type': 'video',
                            'format': ext,
                            'label': f'{quality} ({ext.upper()}) - Video Only',
                            'itag': str(f.get('format_id', '')),
                            'size': format_file_size(size),
                            'hasAudio': False,
                            'downloadUrl': f_url,
                        })

            # Collect audio-only formats
            for f in raw_formats:
                f_url = f.get('url')
                if not f_url:
                    continue

                vcodec = f.get('vcodec', 'none') or 'none'
                acodec = f.get('acodec', 'none') or 'none'
                height = f.get('height')

                has_video = vcodec != 'none' and height
                has_audio = acodec != 'none'

                if has_audio and not has_video:
                    abr = f.get('abr') or f.get('tbr') or 0
                    abr = int(abr) if abr else 128
                    key = f'{abr}kbps'
                    ext = f.get('ext', 'm4a')
                    if key not in seen_audio:
                        seen_audio.add(key)
                        size = f.get('filesize') or f.get('filesize_approx') or 0
                        formats.append({
                            'quality': key,
                            'type': 'audio',
                            'format': ext,
                            'label': f'Audio {key} ({ext.upper()})',
                            'itag': str(f.get('format_id', '')),
                            'size': format_file_size(size),
                            'hasAudio': True,
                            'downloadUrl': f_url,
                        })

            # Sort video formats by resolution (highest first)
            video_formats = sorted(
                [f for f in formats if f['type'] == 'video'],
                key=lambda x: int(re.sub(r'[^0-9]', '', x['quality']) or '0'),
                reverse=True,
            )

            # Sort audio formats by bitrate (highest first)
            audio_formats = sorted(
                [f for f in formats if f['type'] == 'audio'],
                key=lambda x: int(re.sub(r'[^0-9]', '', x['quality']) or '0'),
                reverse=True,
            )

            result = {
                'id': video_id,
                'title': info.get('title', 'Unknown Title'),
                'author': info.get('uploader') or info.get('channel', 'Unknown Channel'),
                'authorUrl': info.get('channel_url', ''),
                'thumbnail': f'https://i.ytimg.com/vi/{video_id}/maxresdefault.jpg',
                'thumbnailMq': f'https://i.ytimg.com/vi/{video_id}/mqdefault.jpg',
                'duration': format_duration(info.get('duration', 0)),
                'viewCount': format_views(info.get('view_count', 0)),
                'url': f'https://www.youtube.com/watch?v={video_id}',
                'formats': video_formats + audio_formats,
            }

            self.send_json(200, result)

        except Exception as e:
            self.send_json(500, {
                'error': f'Failed to fetch video information. Please try again.'
            })

    def send_json(self, status, data):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
