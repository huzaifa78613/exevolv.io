import { NextRequest, NextResponse } from 'next/server'
import ytdl from '@distube/ytdl-core'

export const dynamic = 'force-dynamic'

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
    const url = `https://www.youtube.com/watch?v=${videoId}`
    const info = await ytdl.getInfo(url)

    // Find the selected format
    const selectedFormat = info.formats.find(f => f.itag === parseInt(itag))

    if (!selectedFormat || !selectedFormat.url) {
      return NextResponse.json(
        { error: 'Selected format not available. Please try a different quality.' },
        { status: 404 }
      )
    }

    // Get video title for filename
    const title = info.videoDetails.title
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 100)

    const ext = format === 'audio' ? 'm4a' : (selectedFormat.container || 'mp4')
    const filename = `${title}.${ext}`

    // Redirect to the direct YouTube CDN URL
    const redirectUrl = new URL(selectedFormat.url)

    // Set response headers for download via redirect
    return NextResponse.redirect(redirectUrl.toString(), {
      headers: {
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })
  } catch (error: unknown) {
    console.error('Download Error:', error)
    const message = error instanceof Error ? error.message : 'Download failed'

    return NextResponse.json(
      { error: `Download failed: ${message}. Please try again.` },
      { status: 500 }
    )
  }
}
