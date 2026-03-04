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
    const { url, quality, format } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const videoId = extractVideoId(url)
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }

    // Use cobalt.tools API (free, open-source YouTube download API)
    const cobaltPayload: Record<string, string | boolean> = {
      url: `https://www.youtube.com/watch?v=${videoId}`,
    }

    if (format === 'mp3') {
      cobaltPayload.isAudioOnly = true
      cobaltPayload.aFormat = 'mp3'
    } else {
      cobaltPayload.vQuality = quality?.replace('p', '') || '720'
    }

    // Try primary API (cobalt)
    try {
      const cobaltRes = await fetch('https://api.cobalt.tools/api/json', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cobaltPayload),
      })

      if (cobaltRes.ok) {
        const cobaltData = await cobaltRes.json()
        if (cobaltData.url) {
          return NextResponse.json({ 
            downloadUrl: cobaltData.url,
            filename: cobaltData.filename || `youtube-${videoId}.${format || 'mp4'}`
          })
        }
      }
    } catch {
      // Fall through to fallback
    }

    // Fallback: return a constructed download URL using a public service
    const fallbackUrl = format === 'mp3'
      ? `https://co.wuk.sh/api/json`
      : `https://co.wuk.sh/api/json`

    try {
      const fallbackRes = await fetch(fallbackUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: `https://www.youtube.com/watch?v=${videoId}`,
          ...(format === 'mp3' ? { isAudioOnly: true, aFormat: 'mp3' } : { vQuality: quality?.replace('p', '') || '720' }),
        }),
      })

      if (fallbackRes.ok) {
        const fallbackData = await fallbackRes.json()
        if (fallbackData.url) {
          return NextResponse.json({
            downloadUrl: fallbackData.url,
            filename: `youtube-${videoId}.${format || 'mp4'}`,
          })
        }
      }
    } catch {
      // Fall through
    }

    // If all APIs fail, provide a helpful response
    return NextResponse.json(
      { 
        error: 'Download service temporarily unavailable. Please try again later.',
        fallbackUrl: `https://www.y2mate.com/youtube/${videoId}`,
      },
      { status: 503 }
    )
  } catch (error) {
    console.error('YouTube download error:', error)
    return NextResponse.json(
      { error: 'Failed to process download request.' },
      { status: 500 }
    )
  }
}
