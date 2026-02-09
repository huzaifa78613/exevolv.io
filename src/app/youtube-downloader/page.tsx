'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import {
  Download,
  Play,
  Music,
  Video,
  CheckCircle,
  AlertCircle,
  Loader2,
  Youtube,
  Shield,
  Zap,
  Globe,
  Clipboard,
  ArrowRight,
  Clock,
  Star,
  MonitorSmartphone,
  FileVideo,
  FileAudio,
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Heart,
  Users,
  Calendar,
  User,
  Tag,
} from 'lucide-react'

// Types
interface VideoFormat {
  itag: number
  quality: string
  mimeType: string
  qualityLabel: string
  bitrate: number
  audioQuality?: string
  hasAudio: boolean
  hasVideo: boolean
  container: string
  size?: string
  url?: string
}

interface VideoInfo {
  title: string
  thumbnail: string
  duration: string
  channel: string
  viewCount: string
  formats: VideoFormat[]
}

// Blog posts related to YouTube downloading
const blogPosts = [
  {
    title: 'How to Download YouTube Videos Legally in 2026',
    excerpt: 'Understanding the legal aspects of downloading YouTube videos for personal use, offline viewing, and educational purposes.',
    date: 'February 8, 2026',
    readTime: '5 min read',
    category: 'Guide',
  },
  {
    title: 'Best Video Formats Explained: MP4 vs WebM vs MKV',
    excerpt: 'A comprehensive comparison of popular video formats. Learn which format is best for quality, compatibility, and file size.',
    date: 'February 5, 2026',
    readTime: '7 min read',
    category: 'Tutorial',
  },
  {
    title: 'Convert YouTube to MP3: Complete Guide',
    excerpt: 'Step-by-step guide to extracting audio from YouTube videos. Perfect for podcasts, music, and lectures.',
    date: 'February 1, 2026',
    readTime: '4 min read',
    category: 'Guide',
  },
  {
    title: 'Top 10 Tips for Faster Video Downloads',
    excerpt: 'Optimize your download speed with these proven tips. From choosing the right quality to network optimization.',
    date: 'January 28, 2026',
    readTime: '6 min read',
    category: 'Tips',
  },
]

// FAQ data
const faqs = [
  {
    question: 'Is it legal to download YouTube videos?',
    answer: 'Downloading YouTube videos for personal/offline use may be permitted in some jurisdictions, but redistributing copyrighted content is illegal. Always respect copyright laws and the content creator\'s rights. Our tool is intended for downloading non-copyrighted or Creative Commons content.',
  },
  {
    question: 'What video qualities are available?',
    answer: 'We support all available qualities from 360p up to 4K (2160p) and even 8K when available. The quality options depend on what the original uploader provided. Higher quality means larger file sizes.',
  },
  {
    question: 'Can I download only the audio as MP3?',
    answer: 'Yes! We provide a dedicated MP3/Audio download option. You can extract high-quality audio (up to 320kbps) from any YouTube video — perfect for music, podcasts, and lectures.',
  },
  {
    question: 'Is there a download limit?',
    answer: 'There are no download limits. You can download as many videos as you want, completely free. No registration required.',
  },
  {
    question: 'Why is my download not starting?',
    answer: 'Make sure you\'ve pasted a valid YouTube URL. Some videos may be restricted or private and cannot be downloaded. Try refreshing the page and pasting the URL again.',
  },
  {
    question: 'Do you store my data?',
    answer: 'No. We do not store any personal data, download history, or video information. Everything is processed in real-time and nothing is saved on our servers.',
  },
]

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function formatViews(count: string): string {
  const num = parseInt(count)
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K views`
  return `${num} views`
}

function FAQAccordion({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-dark-200 dark:border-dark-700 rounded-xl overflow-hidden transition-all duration-200 hover:border-primary/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-dark-900 hover:bg-primary-50/50 dark:hover:bg-dark-800 transition-colors"
      >
        <span className="font-semibold text-dark-900 dark:text-white pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-dark-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-5 pb-5 bg-white dark:bg-dark-900">
          <p className="text-dark-600 dark:text-dark-400 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function YouTubeDownloaderPage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [selectedFormat, setSelectedFormat] = useState<'video' | 'audio'>('video')
  const [selectedQuality, setSelectedQuality] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  // Validate YouTube URL
  const isValidYouTubeUrl = (url: string): boolean => {
    const patterns = [
      /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}/,
      /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/[\w-]{11}/,
      /^(https?:\/\/)?youtu\.be\/[\w-]{11}/,
      /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[\w-]{11}/,
      /^(https?:\/\/)?(m\.)?youtube\.com\/watch\?v=[\w-]{11}/,
    ]
    return patterns.some(pattern => pattern.test(url.trim()))
  }

  // Extract video ID from URL
  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/,
    ]
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  // Paste from clipboard
  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
      setError('')
    } catch {
      setError('Could not access clipboard. Please paste the URL manually.')
    }
  }, [])

  // Fetch video info
  const handleFetchVideo = useCallback(async () => {
    if (!url.trim()) {
      setError('Please enter a YouTube URL')
      return
    }

    if (!isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL')
      return
    }

    const videoId = extractVideoId(url)
    if (!videoId) {
      setError('Could not extract video ID from URL')
      return
    }

    setLoading(true)
    setError('')
    setVideoInfo(null)

    try {
      const response = await fetch(`/api/youtube?videoId=${videoId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch video info')
      }

      setVideoInfo(data)
      if (data.formats && data.formats.length > 0) {
        const videoFormats = data.formats.filter((f: VideoFormat) => f.hasVideo)
        if (videoFormats.length > 0) {
          setSelectedQuality(videoFormats[0].itag.toString())
        }
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch video information. Please try again.'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }, [url])

  // Download video
  const handleDownload = useCallback(async () => {
    if (!videoInfo || !selectedQuality) return

    setDownloading(true)
    setDownloadSuccess(false)

    try {
      // Find the selected format and use its direct URL
      const allFormats = [...(videoInfo.formats || [])]
      const format = allFormats.find(f => f.itag.toString() === selectedQuality)
      
      if (format?.url) {
        // Direct download from YouTube CDN
        window.open(format.url, '_blank')
      } else {
        // Fallback to API route
        const videoId = extractVideoId(url)
        if (!videoId) throw new Error('Invalid URL')
        const downloadUrl = `/api/youtube/download?videoId=${videoId}&itag=${selectedQuality}&format=${selectedFormat}`
        window.open(downloadUrl, '_blank')
      }
      
      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 3000)
    } catch {
      setError('Download failed. Please try again.')
    } finally {
      setDownloading(false)
    }
  }, [videoInfo, selectedQuality, selectedFormat, url])

  const videoFormats = videoInfo?.formats?.filter(f => f.hasVideo) || []
  const audioFormats = videoInfo?.formats?.filter(f => !f.hasVideo && f.hasAudio) || []

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <Breadcrumbs items={[{ label: 'YouTube Downloader' }]} />

          <div className="max-w-4xl mx-auto text-center mt-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 rounded-full mb-6">
              <Youtube className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-700 dark:text-red-400">Free YouTube Video Downloader</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 dark:text-white mb-6">
              Download YouTube Videos
              <span className="block gradient-text mt-2">in Any Quality</span>
            </h1>

            <p className="text-lg md:text-xl text-dark-600 dark:text-dark-400 mb-10 max-w-2xl mx-auto">
              Free, fast, and easy YouTube video downloader. Download videos in MP4, WebM, or extract audio as MP3. No registration required.
            </p>

            {/* URL Input Section */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-2xl shadow-dark-900/10 dark:shadow-dark-950/30 border border-dark-100 dark:border-dark-800 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Youtube className="w-5 h-5 text-red-500" />
                    </div>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => { setUrl(e.target.value); setError(''); }}
                      onKeyDown={(e) => e.key === 'Enter' && handleFetchVideo()}
                      placeholder="Paste YouTube URL here..."
                      className="w-full pl-12 pr-12 py-4 text-base text-dark-900 dark:text-white bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all placeholder:text-dark-400"
                    />
                    <button
                      onClick={handlePaste}
                      title="Paste from clipboard"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-dark-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Clipboard className="w-5 h-5" />
                    </button>
                  </div>
                  <button
                    onClick={handleFetchVideo}
                    disabled={loading || !url.trim()}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg whitespace-nowrap"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Fetching...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        <span>Get Video</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="flex items-center gap-2 mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
                  </div>
                )}

                {/* Success Message */}
                {downloadSuccess && (
                  <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm text-green-700 dark:text-green-400">Download started successfully!</p>
                  </div>
                )}

                {/* Supported Formats */}
                <div className="flex flex-wrap justify-center gap-3 mt-4 text-xs text-dark-500 dark:text-dark-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                    youtube.com/watch?v=
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                    youtu.be/
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-primary" />
                    YouTube Shorts
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Info & Download Section */}
      {videoInfo && (
        <section className="py-12 md:py-16 bg-white dark:bg-dark-950">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="card p-6 md:p-8">
                {/* Video Preview */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="relative w-full md:w-80 flex-shrink-0">
                    <img
                      src={videoInfo.thumbnail}
                      alt={videoInfo.title}
                      className="w-full rounded-xl object-cover aspect-video"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded-md">
                      {videoInfo.duration}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-dark-900 dark:text-white mb-2 line-clamp-2">
                      {videoInfo.title}
                    </h2>
                    <p className="text-dark-600 dark:text-dark-400 mb-1 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {videoInfo.channel}
                    </p>
                    <p className="text-dark-500 dark:text-dark-500 text-sm flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {videoInfo.viewCount}
                    </p>
                  </div>
                </div>

                {/* Format Toggle */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => {
                      setSelectedFormat('video')
                      if (videoFormats.length > 0) setSelectedQuality(videoFormats[0].itag.toString())
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                      selectedFormat === 'video'
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/25'
                        : 'bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-400 hover:bg-dark-200 dark:hover:bg-dark-700'
                    }`}
                  >
                    <Video className="w-5 h-5" />
                    Video (MP4)
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFormat('audio')
                      if (audioFormats.length > 0) setSelectedQuality(audioFormats[0].itag.toString())
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                      selectedFormat === 'audio'
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                        : 'bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-400 hover:bg-dark-200 dark:hover:bg-dark-700'
                    }`}
                  >
                    <Music className="w-5 h-5" />
                    Audio (MP3)
                  </button>
                </div>

                {/* Quality Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-dark-700 dark:text-dark-300 mb-3 flex items-center gap-2">
                    {selectedFormat === 'video' ? (
                      <><FileVideo className="w-4 h-4" /> Select Video Quality</>
                    ) : (
                      <><FileAudio className="w-4 h-4" /> Select Audio Quality</>
                    )}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(selectedFormat === 'video' ? videoFormats : audioFormats).map((format) => (
                      <label
                        key={format.itag}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedQuality === format.itag.toString()
                            ? selectedFormat === 'video'
                              ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                              : 'border-purple-500 bg-purple-50 dark:bg-purple-900/10'
                            : 'border-dark-200 dark:border-dark-700 hover:border-dark-300 dark:hover:border-dark-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="quality"
                          value={format.itag.toString()}
                          checked={selectedQuality === format.itag.toString()}
                          onChange={(e) => setSelectedQuality(e.target.value)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedQuality === format.itag.toString()
                            ? selectedFormat === 'video'
                              ? 'border-red-500'
                              : 'border-purple-500'
                            : 'border-dark-300 dark:border-dark-600'
                        }`}>
                          {selectedQuality === format.itag.toString() && (
                            <div className={`w-2.5 h-2.5 rounded-full ${
                              selectedFormat === 'video' ? 'bg-red-500' : 'bg-purple-500'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-dark-900 dark:text-white text-sm">
                              {format.qualityLabel || format.quality}
                            </span>
                            <span className="text-xs px-2 py-0.5 bg-dark-100 dark:bg-dark-800 text-dark-500 rounded-full uppercase">
                              {format.container}
                            </span>
                          </div>
                          {format.size && (
                            <span className="text-xs text-dark-500">{format.size}</span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={handleDownload}
                  disabled={downloading || !selectedQuality}
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedFormat === 'video'
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/25'
                      : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/25'
                  }`}
                >
                  {downloading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Download className="w-6 h-6" />
                      Download {selectedFormat === 'video' ? 'Video' : 'Audio'}
                    </>
                  )}
                </button>

                {/* Info Note */}
                <div className="flex items-start gap-2 mt-4 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                  <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700 dark:text-blue-400">
                    By downloading, you agree that you have the right to download this content and will use it for personal purposes only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-dark-50 dark:bg-dark-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Why Use Our <span className="gradient-text">YouTube Downloader</span>?
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              The fastest and most reliable way to download YouTube videos online.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Zap className="w-7 h-7" />,
                title: 'Lightning Fast',
                description: 'Download videos in seconds with our optimized servers. No waiting, no delays.',
                color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20',
              },
              {
                icon: <Shield className="w-7 h-7" />,
                title: '100% Safe & Secure',
                description: 'No malware, no ads, no popups. Your privacy and security are our top priority.',
                color: 'text-green-500 bg-green-50 dark:bg-green-900/20',
              },
              {
                icon: <MonitorSmartphone className="w-7 h-7" />,
                title: 'Works Everywhere',
                description: 'Works on all devices — phones, tablets, and desktops. No app installation needed.',
                color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
              },
              {
                icon: <Music className="w-7 h-7" />,
                title: 'MP3 Audio Extract',
                description: 'Extract high-quality audio from any YouTube video in MP3 format instantly.',
                color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="card card-hover p-6 text-center"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.color} mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-dark-600 dark:text-dark-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark-950">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              How to <span className="gradient-text">Download</span>?
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              Download any YouTube video in just 3 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Copy Video URL',
                description: 'Go to YouTube, find the video you want to download, and copy its URL from the address bar.',
                icon: <Clipboard className="w-8 h-8" />,
                color: 'from-red-500 to-red-600',
              },
              {
                step: '02',
                title: 'Paste & Select Quality',
                description: 'Paste the URL in the input field above, click "Get Video", then choose your preferred quality and format.',
                icon: <Play className="w-8 h-8" />,
                color: 'from-primary to-primary-600',
              },
              {
                step: '03',
                title: 'Download & Enjoy',
                description: 'Click the download button and your video/audio file will start downloading immediately.',
                icon: <Download className="w-8 h-8" />,
                color: 'from-blue-500 to-blue-600',
              },
            ].map((step, i) => (
              <div key={i} className="relative text-center group">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${step.color} text-white mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <div className="absolute -top-2 -right-2 md:right-auto md:left-1/2 md:translate-x-8 w-8 h-8 bg-dark-900 dark:bg-white text-white dark:text-dark-900 rounded-full flex items-center justify-center text-xs font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-dark-600 dark:text-dark-400 leading-relaxed">{step.description}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 -right-4 text-dark-300 dark:text-dark-600">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Formats Section */}
      <section className="py-16 md:py-24 bg-dark-50 dark:bg-dark-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Supported <span className="gradient-text">Formats & Quality</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Video Formats */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                  <Video className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-dark-900 dark:text-white">Video Formats</h3>
                  <p className="text-sm text-dark-500">Download with video & audio</p>
                </div>
              </div>
              <div className="space-y-2">
                {['2160p (4K) - Ultra HD', '1440p (2K) - Quad HD', '1080p - Full HD', '720p - HD', '480p - SD', '360p - Low'].map((quality) => (
                  <div key={quality} className="flex items-center gap-2 p-2 rounded-lg hover:bg-dark-50 dark:hover:bg-dark-800 transition-colors">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-dark-700 dark:text-dark-300">{quality}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Formats */}
            <div className="card p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                  <Music className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-dark-900 dark:text-white">Audio Formats</h3>
                  <p className="text-sm text-dark-500">Extract audio only</p>
                </div>
              </div>
              <div className="space-y-2">
                {['MP3 - 320kbps (Best)', 'MP3 - 256kbps (High)', 'MP3 - 192kbps (Good)', 'MP3 - 128kbps (Standard)', 'WebM Audio - Opus', 'M4A - AAC'].map((quality) => (
                  <div key={quality} className="flex items-center gap-2 p-2 rounded-lg hover:bg-dark-50 dark:hover:bg-dark-800 transition-colors">
                    <CheckCircle className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <span className="text-sm text-dark-700 dark:text-dark-300">{quality}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark-950">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 dark:bg-primary-900/20 rounded-full mb-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-400">Latest Articles</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              YouTube Download <span className="gradient-text">Blog & Tips</span>
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              Learn everything about downloading YouTube videos, best formats, and tips for the best experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {blogPosts.map((post, i) => (
              <article key={i} className="card card-hover p-6 group">
                <div className="flex items-center gap-3 mb-3">
                  <span className="badge-primary">
                    <Tag className="w-3 h-3 mr-1" />
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-dark-500">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-dark-600 dark:text-dark-400 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-dark-500">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-dark-50 dark:bg-dark-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              Got questions? We&apos;ve got answers. Find everything you need to know below.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <FAQAccordion key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-dark-950">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-dark-900 dark:text-white mb-6">
                The Best Free YouTube Video Downloader Online
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-dark-600 dark:text-dark-400 leading-relaxed mb-4">
                    Our YouTube Video Downloader is the most powerful and user-friendly tool for saving YouTube videos to your device. Whether you want to watch videos offline, save tutorials for later, or extract audio for your music playlist, our tool makes it incredibly easy.
                  </p>
                  <p className="text-dark-600 dark:text-dark-400 leading-relaxed mb-4">
                    Unlike other downloaders that bombard you with ads and popups, our tool is clean, fast, and completely free. Simply paste the YouTube video URL, choose your preferred quality (from 360p to 4K), and click download. It&apos;s that simple.
                  </p>
                  <p className="text-dark-600 dark:text-dark-400 leading-relaxed">
                    We support all YouTube video types including regular videos, Shorts, live streams, and playlists. Our advanced processing engine ensures the highest quality downloads with the fastest speeds possible.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-4">Key Features:</h3>
                  <ul className="space-y-3">
                    {[
                      'Download in MP4, WebM, and more formats',
                      'Extract audio as MP3 (up to 320kbps)',
                      'Support for 4K and 8K quality',
                      'No registration or login required',
                      'Unlimited downloads, completely free',
                      'Works on mobile, tablet, and desktop',
                      'Fast processing and download speeds',
                      'No ads, no malware, 100% safe',
                    ].map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-dark-600 dark:text-dark-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-red-600 to-red-700">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Download Your Video?
          </h2>
          <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
            Start downloading YouTube videos in the highest quality. Free, fast, and secure.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
          >
            <Youtube className="w-5 h-5" />
            Start Downloading Now
          </button>
        </div>
      </section>
    </>
  )
}
