import type { Metadata } from 'next'
import YouTubeDownloaderClient from './YouTubeDownloaderClient'

export const metadata: Metadata = {
  title: 'YouTube Video Downloader - Free HD Video & MP3 Download',
  description: 'Download YouTube videos in HD quality (1080p, 720p, 480p) or convert to MP3 audio. Free, fast, and no registration required. Works on all devices.',
  keywords: ['youtube downloader', 'youtube video downloader', 'youtube to mp3', 'download youtube video', 'youtube converter', 'free youtube downloader', 'hd video download'],
  openGraph: {
    title: 'YouTube Video Downloader - Free HD Video & MP3 Download',
    description: 'Download YouTube videos in HD quality or convert to MP3 audio. Free, fast, and no registration required.',
    type: 'website',
  },
}

export default function YouTubeDownloaderPage() {
  return <YouTubeDownloaderClient />
}
