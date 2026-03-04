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

export const maxDuration = 60 // Allow up to 60s for Vercel serverless

export async function POST(request: NextRequest) {
  try {
    const { url, itag } = await request.json()

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    const videoId = extractVideoId(url)
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }

    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`

    // Get video info to find the format
    const info = await ytdl.getInfo(videoUrl)
    
    let selectedFormat
    if (itag) {
      selectedFormat = info.formats.find((f) => f.itag === parseInt(itag))
    }

    if (!selectedFormat) {
      // Fallback: pick best format with both audio and video
      selectedFormat = ytdl.chooseFormat(info.formats, {
        quality: 'highest',
        filter: 'audioandvideo',
      })
    }

    if (!selectedFormat || !selectedFormat.url) {
      return NextResponse.json(
        { error: 'Could not find a downloadable format for this video.' },
        { status: 404 }
      )
    }

    // Determine filename
    const title = info.videoDetails.title.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_')
    const ext = selectedFormat.container || 'mp4'
    const filename = `${title}_${selectedFormat.qualityLabel || selectedFormat.audioBitrate || ''}.${ext}`
    const contentType = selectedFormat.mimeType?.split(';')[0] || `video/${ext}`

    // Return the direct URL for client-side download
    return NextResponse.json({
      downloadUrl: selectedFormat.url,
      filename,
      contentType,
      size: selectedFormat.contentLength || null,
    })
  } catch (error: any) {
    console.error('YouTube download error:', error)

    if (error.message?.includes('private') || error.message?.includes('login')) {
      return NextResponse.json(
        { error: 'This video is private or requires login.' },
        { status: 403 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to process download. Please try again.' },
      { status: 500 }
    )
  }
}
