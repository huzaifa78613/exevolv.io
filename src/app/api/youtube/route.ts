import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

// YouTube Innertube API - the internal API YouTube uses
const INNERTUBE_API_KEY = 'AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8'
const INNERTUBE_BASE = 'https://www.youtube.com/youtubei/v1'

const INNERTUBE_CONTEXT = {
  client: {
    hl: 'en',
    gl: 'US',
    clientName: 'WEB',
    clientVersion: '2.20240101.00.00',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  }
}

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

function formatViews(count: string): string {
  const num = parseInt(count)
  if (isNaN(num)) return count
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K views`
  return `${num} views`
}

interface StreamFormat {
  itag: number
  url?: string
  signatureCipher?: string
  mimeType: string
  bitrate: number
  width?: number
  height?: number
  contentLength?: string
  quality: string
  qualityLabel?: string
  audioQuality?: string
  audioSampleRate?: string
  audioBitrate?: number
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
    // Use ANDROID client - better for getting direct stream URLs (no cipher)
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

    // Check playability status
    const playability = playerData.playabilityStatus
    if (playability?.status !== 'OK') {
      const reason = playability?.reason || playability?.messages?.[0] || 'Video is unavailable'
      return NextResponse.json({ error: reason }, { status: 404 })
    }

    const videoDetails = playerData.videoDetails
    const streamingData = playerData.streamingData

    if (!videoDetails || !streamingData) {
      return NextResponse.json({ error: 'Could not retrieve video details' }, { status: 500 })
    }

    // Combine formats and adaptive formats
    const allFormats: StreamFormat[] = [
      ...(streamingData.formats || []),
      ...(streamingData.adaptiveFormats || []),
    ]

    // Process video formats (has video, prefer with audio)
    const videoFormats = allFormats
      .filter(f => f.mimeType?.includes('video/') && f.url && f.height)
      .sort((a, b) => (b.height || 0) - (a.height || 0))
      .filter((f, i, arr) => {
        // Deduplicate by quality label, prefer mp4
        const existingIdx = arr.findIndex(x => x.qualityLabel === f.qualityLabel)
        if (existingIdx === i) return true
        // Keep if mp4 and existing is not
        if (f.mimeType?.includes('mp4') && !arr[existingIdx].mimeType?.includes('mp4')) return true
        return false
      })
      .slice(0, 8)
      .map(f => ({
        itag: f.itag,
        quality: f.quality || '',
        mimeType: f.mimeType || '',
        qualityLabel: f.qualityLabel || `${f.height}p`,
        bitrate: f.bitrate || 0,
        hasAudio: f.mimeType?.includes('video/') && !f.audioQuality ? false : true,
        hasVideo: true,
        container: f.mimeType?.includes('mp4') ? 'mp4' : f.mimeType?.includes('webm') ? 'webm' : 'mp4',
        size: f.contentLength ? formatBytes(parseInt(f.contentLength)) : '',
        url: f.url || '',
      }))

    // Process audio-only formats
    const audioFormats = allFormats
      .filter(f => f.mimeType?.includes('audio/') && f.url)
      .sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0))
      .filter((f, i, arr) => {
        const label = getAudioLabel(f)
        return arr.findIndex(x => getAudioLabel(x) === label) === i
      })
      .slice(0, 4)
      .map(f => ({
        itag: f.itag,
        quality: f.audioQuality || '',
        mimeType: f.mimeType || '',
        qualityLabel: getAudioLabel(f),
        bitrate: f.bitrate || 0,
        audioQuality: f.audioQuality || '',
        hasAudio: true,
        hasVideo: false,
        container: f.mimeType?.includes('mp4') ? 'm4a' : f.mimeType?.includes('webm') ? 'webm' : 'mp3',
        size: f.contentLength ? formatBytes(parseInt(f.contentLength)) : '',
        url: f.url || '',
      }))

    const durationSec = parseInt(videoDetails.lengthSeconds) || 0
    const thumbnails = videoDetails.thumbnail?.thumbnails || []

    const videoInfo = {
      title: videoDetails.title || 'Unknown Title',
      thumbnail: thumbnails[thumbnails.length - 1]?.url
        || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      duration: formatDuration(durationSec),
      channel: videoDetails.author || 'Unknown',
      viewCount: formatViews(videoDetails.viewCount || '0'),
      formats: [...videoFormats, ...audioFormats],
    }

    return NextResponse.json(videoInfo)
  } catch (error: unknown) {
    console.error('YouTube API Error:', error)
    const message = error instanceof Error ? error.message : 'Unknown error'

    return NextResponse.json(
      { error: `Failed to fetch video info: ${message}` },
      { status: 500 }
    )
  }
}

function getAudioLabel(f: StreamFormat): string {
  const kbps = Math.round((f.bitrate || 0) / 1000)
  const type = f.mimeType?.includes('mp4') ? 'AAC' : f.mimeType?.includes('webm') ? 'Opus' : 'Audio'
  return `${kbps}kbps ${type}`
}
