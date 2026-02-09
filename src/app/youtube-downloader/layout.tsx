import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'YouTube Video Downloader - Download Videos & MP3 Free',
  description: 'Free YouTube video downloader. Download YouTube videos in MP4 (360p to 4K) or extract audio as MP3. No registration required. Fast, safe, and unlimited downloads.',
  keywords: [
    'youtube downloader',
    'youtube video downloader',
    'download youtube video',
    'youtube to mp3',
    'youtube to mp4',
    'youtube mp3 converter',
    'free youtube downloader',
    'youtube video download online',
    'save youtube video',
    'youtube audio download',
  ],
  openGraph: {
    title: 'YouTube Video Downloader - Download Videos & MP3 Free',
    description: 'Free YouTube video downloader. Download videos in MP4 or extract audio as MP3. No registration required.',
    url: 'https://exevolv.io/youtube-downloader',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Video Downloader - Download Videos & MP3 Free',
    description: 'Download YouTube videos in any quality. MP4, WebM, MP3 supported. Free and unlimited.',
  },
  alternates: {
    canonical: 'https://exevolv.io/youtube-downloader',
  },
}

export default function YouTubeDownloaderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
