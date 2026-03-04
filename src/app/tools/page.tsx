import type { Metadata } from 'next'
import Link from 'next/link'
import { Youtube, ArrowRight, Wrench, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Free Online Tools',
  description: 'Explore our collection of free online tools including YouTube Video Downloader, and more. Fast, free, and easy to use.',
  keywords: ['free online tools', 'youtube downloader', 'video downloader', 'online converter'],
}

const tools = [
  {
    name: 'YouTube Video Downloader',
    description: 'Download YouTube videos in HD quality (1080p, 720p) or convert to MP3 audio. Free, fast, and works on all devices.',
    href: '/tools/youtube-downloader',
    icon: <Youtube className="w-8 h-8" />,
    color: 'text-red-500 bg-red-50 dark:bg-red-900/20',
    badge: 'Popular',
    badgeColor: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  },
]

export default function ToolsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="container-custom relative text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm rounded-full shadow-lg shadow-dark-900/5 mb-6 animate-fade-up border border-dark-100 dark:border-dark-800">
            <Wrench className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-dark-600 dark:text-dark-400">
              Free Online Tools
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900 dark:text-white mb-4 md:mb-6 animate-fade-up animate-delay-100 leading-[1.1]">
            Powerful Tools,
            <span className="gradient-text block mt-2">Completely Free</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-dark-600 dark:text-dark-400 mb-8 max-w-2xl mx-auto animate-fade-up animate-delay-100">
            A growing collection of free online tools to make your digital life easier.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section-padding bg-white dark:bg-dark-950">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="card p-6 dark:bg-dark-900 dark:border-dark-800 card-hover group block"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${tool.color} group-hover:scale-110 transition-transform`}>
                    {tool.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-dark-900 dark:text-white truncate">
                        {tool.name}
                      </h3>
                      {tool.badge && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${tool.badgeColor}`}>
                          {tool.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-dark-500 dark:text-dark-400 mb-3 line-clamp-2">
                      {tool.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Try Now <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Coming Soon Card */}
            <div className="card p-6 dark:bg-dark-900 dark:border-dark-800 opacity-60 cursor-default">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-dark-100 dark:bg-dark-800 text-dark-400">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-dark-900 dark:text-white">
                      More Coming Soon
                    </h3>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-dark-100 text-dark-500 dark:bg-dark-800 dark:text-dark-400">
                      Soon
                    </span>
                  </div>
                  <p className="text-sm text-dark-500 dark:text-dark-400">
                    We&apos;re working on more awesome tools. Stay tuned for updates!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
