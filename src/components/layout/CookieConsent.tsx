'use client'

import { useState, useEffect } from 'react'
import { X, Cookie } from 'lucide-react'
import Link from 'next/link'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    setShowBanner(false)
  }

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-up">
      <div className="container-custom">
        <div className="bg-white dark:bg-dark-900 rounded-2xl shadow-2xl shadow-dark-900/20 border border-dark-100 dark:border-dark-800 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-dark-900 dark:text-white mb-1">
                We use cookies
              </h3>
              <p className="text-sm text-dark-600 dark:text-dark-400">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies. 
                <Link href="/cookie-policy" className="text-primary hover:underline ml-1">
                  Learn more
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                onClick={acceptNecessary}
                className="btn-outline text-sm py-2 px-4 flex-1 md:flex-none"
              >
                Necessary Only
              </button>
              <button 
                onClick={acceptAll}
                className="btn-primary text-sm py-2 px-4 flex-1 md:flex-none"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
