import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieConsent from '@/components/layout/CookieConsent'

export const metadata: Metadata = {
  metadataBase: new URL('https://exevolv.io'),
  title: {
    default: 'exevolv.io - Innovative Browser Extensions & Apps',
    template: '%s | exevolv.io'
  },
  description: 'Building innovative browser extensions and applications that enhance your digital experience. Discover our Chrome extensions, Firefox add-ons, and Android apps.',
  keywords: ['browser extensions', 'chrome extensions', 'firefox addons', 'android apps', 'productivity tools', 'privacy tools', 'quiz solver', 'proxy extension', 'study app'],
  authors: [{ name: 'exevolv.io' }],
  creator: 'exevolv.io',
  publisher: 'exevolv.io',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://exevolv.io',
    siteName: 'exevolv.io',
    title: 'exevolv.io - Innovative Browser Extensions & Apps',
    description: 'Building innovative browser extensions and applications that enhance your digital experience.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'exevolv.io - Innovative Browser Extensions & Apps',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'exevolv.io - Innovative Browser Extensions & Apps',
    description: 'Building innovative browser extensions and applications that enhance your digital experience.',
    images: ['/og-image.png'],
    creator: '@exevolv_io',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'q5fHhQyhTBB21tgAnEurKxloggJinzmdORzM6R8NmPI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00C853" />
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Schema.org Organization markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'exevolv.io',
              url: 'https://exevolv.io',
              logo: 'https://exevolv.io/logo.png',
              sameAs: [
                'https://twitter.com/exevolv_io',
                'https://github.com/exevolv-io',
                'https://linkedin.com/company/exevolv-io'
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'hello@exevolv.io',
                contactType: 'customer support'
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-dark-950">
        <Navbar />
        <main className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <CookieConsent />
        {/* Google Analytics Placeholder */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                // Google Analytics placeholder
                // Replace with your GA4 measurement ID
                // window.dataLayer = window.dataLayer || [];
                // function gtag(){dataLayer.push(arguments);}
                // gtag('js', new Date());
                // gtag('config', 'G-XXXXXXXXXX');
              `
            }}
          />
        )}
      </body>
    </html>
  )
}
