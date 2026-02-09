import { NextRequest, NextResponse } from 'next/server'

// YouTube Data API - using oEmbed + noembed for basic info (no API key needed)
// For a production app, you'd use the YouTube Data API v3 with an API key

interface VideoFormat {
  itag: number
  quality: string
  mimeType: string
  qualityLabel: string
  bitrate: number
  audioQuality?: string
  hasAudio: boolean
  hasVideo: boolean
  container: string
  size?: string
}

interface VideoInfo {
  title: string
  thumbnail: string
  duration: string
  channel: string
  viewCount: string
  formats: VideoFormat[]
}

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const videoId = searchParams.get('videoId')

  if (!videoId) {
    return NextResponse.json({ error: 'Video ID is required' }, { status: 400 })
  }

  // Validate video ID format
  if (!/^[\w-]{11}$/.test(videoId)) {
    return NextResponse.json({ error: 'Invalid video ID format' }, { status: 400 })
  }

  try {
    // Fetch video info from noembed (free, no API key needed)
    const oembedResponse = await fetch(
      `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`,
      { next: { revalidate: 3600 } }
    )

    if (!oembedResponse.ok) {
      throw new Error('Failed to fetch video info')
    }

    const oembedData = await oembedResponse.json()

    if (oembedData.error) {
      return NextResponse.json({ error: 'Video not found or is private' }, { status: 404 })
    }

    // Build available formats list (standard YouTube formats)
    const videoFormats: VideoFormat[] = [
      {
        itag: 137,
        quality: 'hd1080',
        mimeType: 'video/mp4',
        qualityLabel: '1080p',
        bitrate: 4000000,
        hasAudio: true,
        hasVideo: true,
        container: 'mp4',
        size: '~150-500 MB',
      },
      {
        itag: 136,
        quality: 'hd720',
        mimeType: 'video/mp4',
        qualityLabel: '720p',
        bitrate: 2500000,
        hasAudio: true,
        hasVideo: true,
        container: 'mp4',
        size: '~80-250 MB',
      },
      {
        itag: 135,
        quality: 'large',
        mimeType: 'video/mp4',
        qualityLabel: '480p',
        bitrate: 1000000,
        hasAudio: true,
        hasVideo: true,
        container: 'mp4',
        size: '~40-120 MB',
      },
      {
        itag: 134,
        quality: 'medium',
        mimeType: 'video/mp4',
        qualityLabel: '360p',
        bitrate: 600000,
        hasAudio: true,
        hasVideo: true,
        container: 'mp4',
        size: '~20-60 MB',
      },
    ]

    const audioFormats: VideoFormat[] = [
      {
        itag: 140,
        quality: 'high',
        mimeType: 'audio/mp4',
        qualityLabel: 'MP3 - 128kbps',
        bitrate: 128000,
        audioQuality: 'AUDIO_QUALITY_MEDIUM',
        hasAudio: true,
        hasVideo: false,
        container: 'mp3',
        size: '~3-10 MB',
      },
      {
        itag: 251,
        quality: 'high',
        mimeType: 'audio/webm',
        qualityLabel: 'WebM Audio - 160kbps',
        bitrate: 160000,
        audioQuality: 'AUDIO_QUALITY_HIGH',
        hasAudio: true,
        hasVideo: false,
        container: 'webm',
        size: '~4-12 MB',
      },
    ]

    const videoInfo: VideoInfo = {
      title: oembedData.title || 'Unknown Title',
      thumbnail: oembedData.thumbnail_url || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      duration: 'N/A',
      channel: oembedData.author_name || 'Unknown Channel',
      viewCount: 'N/A',
      formats: [...videoFormats, ...audioFormats],
    }

    return NextResponse.json(videoInfo)
  } catch (error) {
    console.error('YouTube API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch video information. Please try again.' },
      { status: 500 }
    )
  }
}
