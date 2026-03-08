import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

// Proxy the download through our server to avoid CORS issues
// The client sends the direct YouTube streaming URL obtained from /api/youtube/info
export async function POST(request: NextRequest) {
  try {
    const { downloadUrl, filename, contentType } = await request.json()

    if (!downloadUrl) {
      return NextResponse.json({ error: 'Download URL is required' }, { status: 400 })
    }

    // Fetch the video/audio from YouTube's CDN
    const res = await fetch(downloadUrl, {
      headers: {
        'User-Agent': 'com.google.android.youtube/19.09.37 (Linux; U; Android 11) gzip',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Range': 'bytes=0-',
      },
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to download from YouTube. The link may have expired.' },
        { status: res.status }
      )
    }

    const headers = new Headers()
    headers.set('Content-Type', contentType || res.headers.get('content-type') || 'video/mp4')
    headers.set('Content-Disposition', `attachment; filename="${filename || 'youtube-video.mp4'}"`)
    
    const contentLength = res.headers.get('content-length')
    if (contentLength) {
      headers.set('Content-Length', contentLength)
    }
    
    // Stream the response
    return new NextResponse(res.body, {
      status: 200,
      headers,
    })
  } catch (error: any) {
    console.error('YouTube download proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to process download. Please try again.' },
      { status: 500 }
    )
  }
}
