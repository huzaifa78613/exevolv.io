'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="container-custom">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-dark-900 dark:text-white mb-4">
            Something went wrong!
          </h1>
          
          <p className="text-dark-600 dark:text-dark-400 mb-8">
            We're sorry, but something went wrong. Please try again or contact support if the problem persists.
          </p>
          
          <button
            onClick={() => reset()}
            className="btn-primary"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}
