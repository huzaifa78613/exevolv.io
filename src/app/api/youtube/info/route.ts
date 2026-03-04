import { NextRequest, NextResponse } from 'next/server'

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

    // Fetch video info using noembed (oEmbed provider)
    const noembedRes = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`)
    const noembedData = await noembedRes.json()

    if (noembedData.error) {
      return NextResponse.json({ error: 'Video not found or unavailable' }, { status: 404 })
    }

    // Fetch additional info from YouTube's public API (no key needed for basic info)
    let duration = ''
    let viewCount = ''
    let channelThumbnail = ''
    
    try {
      const pageRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
      const pageData = await pageRes.json()
      if (pageData.author_name) {
        noembedData.author_name = pageData.author_name
      }
    } catch {
      // Ignore errors from additional info fetch
    }

    const videoInfo = {
      id: videoId,
      title: noembedData.title || 'Unknown Title',
      author: noembedData.author_name || 'Unknown Channel',
      authorUrl: noembedData.author_url || '',
      thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      thumbnailMq: `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`,
      duration,
      viewCount,
      channelThumbnail,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      formats: [
        { quality: '1080p', type: 'video', format: 'mp4', label: 'HD 1080p (MP4)' },
        { quality: '720p', type: 'video', format: 'mp4', label: 'HD 720p (MP4)' },
        { quality: '480p', type: 'video', format: 'mp4', label: 'SD 480p (MP4)' },
        { quality: '360p', type: 'video', format: 'mp4', label: 'SD 360p (MP4)' },
        { quality: '128kbps', type: 'audio', format: 'mp3', label: 'Audio Only (MP3 128kbps)' },
        { quality: '256kbps', type: 'audio', format: 'mp3', label: 'Audio Only (MP3 256kbps)' },
      ],
    }

    return NextResponse.json(videoInfo)
  } catch (error) {
    console.error('YouTube info error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch video information. Please try again.' },
      { status: 500 }
    )
  }
}
