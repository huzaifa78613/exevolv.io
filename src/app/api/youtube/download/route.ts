import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

const INNERTUBE_API_KEY = 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8'
const INNERTUBE_BASE = 'https://www.youtube.com/youtubei/v1'

const ANDROID_CONTEXT = {
  client: {
    hl: 'en',
    gl: 'US',
    clientName: 'ANDROID',
    clientVersion: '19.09.37',
    androidSdkVersion: 30,
    userAgent: 'com.google.android.youtube/19.09.37 (Linux; U; Android 11) gzip',
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const videoId = searchParams.get('videoId')
  const itag = searchParams.get('itag')
  const format = searchParams.get('format') // 'video' or 'audio'

  if (!videoId || !itag) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  if (!/^[\w-]{11}$/.test(videoId)) {
    return NextResponse.json({ error: 'Invalid video ID format' }, { status: 400 })
  }

  try {
    // Fetch fresh stream URLs from YouTube Innertube API
    const playerResponse = await fetch(
      `${INNERTUBE_BASE}/player?key=${INNERTUBE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'com.google.android.youtube/19.09.37 (Linux; U; Android 11) gzip',
        },
        body: JSON.stringify({
          context: ANDROID_CONTEXT,
          videoId: videoId,
          contentCheckOk: true,
          racyCheckOk: true,
        }),
      }
    )

    if (!playerResponse.ok) {
      throw new Error(`YouTube API returned ${playerResponse.status}`)
    }

    const playerData = await playerResponse.json()

    // Check playability
    if (playerData.playabilityStatus?.status !== 'OK') {
      return NextResponse.json(
        { error: playerData.playabilityStatus?.reason || 'Video unavailable' },
        { status: 404 }
      )
    }

    const streamingData = playerData.streamingData
    if (!streamingData) {
      return NextResponse.json({ error: 'No streaming data available' }, { status: 500 })
    }

    // Find the requested format by itag
    const allFormats = [
      ...(streamingData.formats || []),
      ...(streamingData.adaptiveFormats || []),
    ]

    const itagNum = parseInt(itag)
    const selectedFormat = allFormats.find((f: { itag: number }) => f.itag === itagNum)

    if (!selectedFormat?.url) {
      return NextResponse.json(
        { error: 'Selected quality not available. Please try a different one.' },
        { status: 404 }
      )
    }

    // Generate clean filename
    const title = (playerData.videoDetails?.title || 'video')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 100)

    const ext = format === 'audio'
      ? (selectedFormat.mimeType?.includes('webm') ? 'webm' : 'm4a')
      : (selectedFormat.mimeType?.includes('webm') ? 'webm' : 'mp4')

    const filename = `${title}.${ext}`

    // Redirect to direct YouTube CDN stream URL
    const streamUrl = selectedFormat.url

    return NextResponse.redirect(streamUrl, {
      status: 302,
      headers: {
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error: unknown) {
    console.error('Download Error:', error)
    return NextResponse.json(
      { error: 'Download failed. Please try again.' },
      { status: 500 }
    )
  }
}
