import { NextRequest, NextResponse } from 'next/server'
import ytdl from '@distube/ytdl-core'

export const dynamic = 'force-dynamic'

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const videoId = searchParams.get('videoId')

  if (!videoId) {
    return NextResponse.json({ error: 'Video ID is required' }, { status: 400 })
  }

  if (!/^[\w-]{11}$/.test(videoId)) {
    return NextResponse.json({ error: 'Invalid video ID format' }, { status: 400 })
  }

  try {
    const url = `https://www.youtube.com/watch?v=${videoId}`
    const info = await ytdl.getInfo(url)
    const details = info.videoDetails

    // Get video formats (with both audio & video)
    const videoFormats = ytdl.filterFormats(info.formats, 'videoandaudio')
      .filter(f => f.container === 'mp4' || f.container === 'webm')
      .sort((a, b) => (b.height || 0) - (a.height || 0))
      .filter((f, i, arr) => arr.findIndex(x => x.qualityLabel === f.qualityLabel) === i)
      .slice(0, 6)
      .map(f => ({
        itag: f.itag,
        quality: f.quality || '',
        mimeType: f.mimeType || '',
        qualityLabel: f.qualityLabel || `${f.height}p`,
        bitrate: f.bitrate || 0,
        hasAudio: f.hasAudio,
        hasVideo: f.hasVideo,
        container: f.container || 'mp4',
        size: f.contentLength ? formatBytes(parseInt(f.contentLength)) : 'Unknown',
      }))

    // Get audio-only formats
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly')
      .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))
      .filter((f, i, arr) => arr.findIndex(x => x.audioBitrate === f.audioBitrate) === i)
      .slice(0, 4)
      .map(f => ({
        itag: f.itag,
        quality: f.audioQuality || '',
        mimeType: f.mimeType || '',
        qualityLabel: `${f.audioBitrate || 0}kbps ${f.container === 'webm' ? 'Opus' : 'AAC'}`,
        bitrate: f.bitrate || 0,
        audioQuality: f.audioQuality || '',
        hasAudio: true,
        hasVideo: false,
        container: f.container || 'mp4',
        size: f.contentLength ? formatBytes(parseInt(f.contentLength)) : 'Unknown',
      }))

    const durationSec = parseInt(details.lengthSeconds) || 0

    const videoInfo = {
      title: details.title || 'Unknown Title',
      thumbnail: details.thumbnails?.[details.thumbnails.length - 1]?.url
        || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      duration: formatDuration(durationSec),
      channel: details.author?.name || details.ownerChannelName || 'Unknown',
      viewCount: parseInt(details.viewCount || '0').toLocaleString() + ' views',
      formats: [...videoFormats, ...audioFormats],
    }

    return NextResponse.json(videoInfo)
  } catch (error: unknown) {
    console.error('YouTube API Error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'

    if (message.includes('private') || message.includes('unavailable')) {
      return NextResponse.json(
        { error: 'This video is private or unavailable.' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to fetch video information. Please check the URL and try again.' },
      { status: 500 }
    )
  }
}
