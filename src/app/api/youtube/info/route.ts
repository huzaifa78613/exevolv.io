import { NextRequest, NextResponse } from 'next/server'
import ytdl from '@distube/ytdl-core'

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

function formatViews(views: string | number): string {
  const n = typeof views === 'string' ? parseInt(views, 10) : views
  if (isNaN(n)) return ''
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`
  return `${n} views`
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const videoId = extractVideoId(url)
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`

    // Use ytdl-core to get real video info and formats
    const info = await ytdl.getInfo(videoUrl)
    const { videoDetails } = info

    // Build available format list from real data
    const formats: Array<{
      quality: string
      type: 'video' | 'audio'
      format: string
      label: string
      itag: number
      size: string
      hasAudio: boolean
    }> = []

    // Collect video formats (with audio preferred)
    const qualityMap: Record<string, boolean> = {}
    
    // First pass: formats with both video + audio (these are best for direct download)
    for (const f of info.formats) {
      if (f.hasVideo && f.hasAudio && f.container === 'mp4') {
        const label = f.qualityLabel || `${f.height}p`
        const key = label
        if (!qualityMap[key]) {
          qualityMap[key] = true
          const size = f.contentLength
            ? `${(parseInt(f.contentLength) / (1024 * 1024)).toFixed(1)} MB`
            : ''
          formats.push({
            quality: label,
            type: 'video',
            format: 'mp4',
            label: `${label} (MP4)`,
            itag: f.itag,
            size,
            hasAudio: true,
          })
        }
      }
    }

    // Sort video formats by resolution (highest first)
    formats.sort((a, b) => {
      const aRes = parseInt(a.quality) || 0
      const bRes = parseInt(b.quality) || 0
      return bRes - aRes
    })

    // Add audio-only formats
    const audioBitrates: Record<string, boolean> = {}
    const audioFormats = info.formats
      .filter((f) => f.hasAudio && !f.hasVideo)
      .sort((a, b) => (b.audioBitrate || 0) - (a.audioBitrate || 0))

    for (const f of audioFormats) {
      const bitrate = f.audioBitrate || 128
      const key = `${bitrate}kbps`
      if (!audioBitrates[key]) {
        audioBitrates[key] = true
        const size = f.contentLength
          ? `${(parseInt(f.contentLength) / (1024 * 1024)).toFixed(1)} MB`
          : ''
        formats.push({
          quality: key,
          type: 'audio',
          format: f.container || 'mp4',
          label: `Audio ${key} (${(f.container || 'mp4').toUpperCase()})`,
          itag: f.itag,
          size,
          hasAudio: true,
        })
      }
    }

    const duration = videoDetails.lengthSeconds
      ? formatDuration(parseInt(videoDetails.lengthSeconds))
      : ''

    const viewCount = videoDetails.viewCount
      ? formatViews(videoDetails.viewCount)
      : ''

    const videoInfo = {
      id: videoId,
      title: videoDetails.title || 'Unknown Title',
      author: videoDetails.author?.name || 'Unknown Channel',
      authorUrl: videoDetails.author?.channel_url || '',
      thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      thumbnailMq: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
      duration,
      viewCount,
      url: videoUrl,
      formats,
    }

    return NextResponse.json(videoInfo)
  } catch (error: any) {
    console.error('YouTube info error:', error)

    // Handle specific ytdl errors
    if (error.message?.includes('private') || error.message?.includes('login')) {
      return NextResponse.json(
        { error: 'This video is private or requires login.' },
        { status: 403 }
      )
    }
    if (error.message?.includes('not a valid') || error.message?.includes('No video id')) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL. Please check the link.' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to fetch video information. Please try again.' },
      { status: 500 }
    )
  }
}
