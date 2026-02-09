import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const videoId = searchParams.get('videoId')
  const itag = searchParams.get('itag')
  const format = searchParams.get('format') // 'video' or 'audio'

  if (!videoId || !itag) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  // Validate video ID format
  if (!/^[\w-]{11}$/.test(videoId)) {
    return NextResponse.json({ error: 'Invalid video ID format' }, { status: 400 })
  }

  try {
    // Use a public API to get download links
    // cobalt.tools is a popular free API for this purpose
    const cobaltResponse = await fetch('https://api.cobalt.tools/api/json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        url: `https://www.youtube.com/watch?v=${videoId}`,
        vCodec: 'h264',
        vQuality: getQualityFromItag(itag),
        aFormat: format === 'audio' ? 'mp3' : 'best',
        isAudioOnly: format === 'audio',
        filenamePattern: 'basic',
      }),
    })

    const data = await cobaltResponse.json()

    if (data.status === 'error') {
      // Fallback: redirect to a working third-party service
      const fallbackUrl = format === 'audio'
        ? `https://api.vevioz.com/api/button/mp3/${videoId}`
        : `https://api.vevioz.com/api/button/videos/${videoId}`

      return NextResponse.redirect(fallbackUrl)
    }

    if (data.url) {
      return NextResponse.redirect(data.url)
    }

    // If cobalt doesn't return a direct URL, use ssyoutube fallback
    const fallbackUrl = format === 'audio'
      ? `https://www.y2mate.com/youtube-mp3/${videoId}`
      : `https://www.y2mate.com/youtube/${videoId}`

    return NextResponse.redirect(fallbackUrl)
  } catch (error) {
    console.error('Download Error:', error)

    // Fallback redirect
    const fallbackUrl = format === 'audio'
      ? `https://www.y2mate.com/youtube-mp3/${videoId}`
      : `https://www.y2mate.com/youtube/${videoId}`

    return NextResponse.redirect(fallbackUrl)
  }
}

function getQualityFromItag(itag: string): string {
  const qualityMap: Record<string, string> = {
    '137': '1080',
    '136': '720',
    '135': '480',
    '134': '360',
    '140': '128',
    '251': '160',
  }
  return qualityMap[itag] || '720'
}
