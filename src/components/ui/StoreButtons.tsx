import { cn } from '@/lib/utils'

interface ChromeInstallButtonProps {
  extensionId: string
  className?: string
}

export function ChromeInstallButton({ extensionId, className }: ChromeInstallButtonProps) {
  return (
    <a
      href={`https://chromewebstore.google.com/detail/${extensionId}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-dark-200 rounded-xl hover:border-primary hover:shadow-lg transition-all duration-200',
        className
      )}
    >
      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" fill="#FFFFFF" stroke="#E8E8E8" strokeWidth="2"/>
        <path d="M24 8C15.163 8 8 15.163 8 24s7.163 16 16 16 16-7.163 16-16S32.837 8 24 8z" fill="url(#chrome-gradient)"/>
        <circle cx="24" cy="24" r="6" fill="#FFFFFF"/>
        <circle cx="24" cy="24" r="4" fill="#4285F4"/>
        <defs>
          <linearGradient id="chrome-gradient" x1="8" y1="24" x2="40" y2="24">
            <stop stopColor="#EA4335"/>
            <stop offset="0.33" stopColor="#FBBC05"/>
            <stop offset="0.66" stopColor="#34A853"/>
            <stop offset="1" stopColor="#4285F4"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="text-left">
        <div className="text-xs text-dark-500 uppercase tracking-wide">Available on</div>
        <div className="font-semibold text-dark-900">Chrome Web Store</div>
      </div>
    </a>
  )
}

interface PlayStoreButtonProps {
  appId: string
  className?: string
}

export function PlayStoreButton({ appId, className }: PlayStoreButtonProps) {
  return (
    <a
      href={`https://play.google.com/store/apps/details?id=${appId}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-3 px-6 py-3 bg-dark-900 rounded-xl hover:bg-dark-800 transition-all duration-200',
        className
      )}
    >
      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
        <path d="M12 8L28 24L12 40V8Z" fill="url(#play-gradient-1)"/>
        <path d="M12 8L28 24L36 16L16 4L12 8Z" fill="url(#play-gradient-2)"/>
        <path d="M12 40L28 24L36 32L16 44L12 40Z" fill="url(#play-gradient-3)"/>
        <path d="M36 16L28 24L36 32L40 28V20L36 16Z" fill="url(#play-gradient-4)"/>
        <defs>
          <linearGradient id="play-gradient-1" x1="12" y1="8" x2="28" y2="24">
            <stop stopColor="#00C4FF"/>
            <stop offset="1" stopColor="#00F076"/>
          </linearGradient>
          <linearGradient id="play-gradient-2" x1="12" y1="8" x2="36" y2="16">
            <stop stopColor="#00C4FF"/>
            <stop offset="1" stopColor="#FF3A44"/>
          </linearGradient>
          <linearGradient id="play-gradient-3" x1="12" y1="40" x2="36" y2="32">
            <stop stopColor="#00F076"/>
            <stop offset="1" stopColor="#FFC830"/>
          </linearGradient>
          <linearGradient id="play-gradient-4" x1="28" y1="24" x2="40" y2="24">
            <stop stopColor="#FF3A44"/>
            <stop offset="1" stopColor="#FFC830"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="text-left">
        <div className="text-xs text-dark-400 uppercase tracking-wide">Get it on</div>
        <div className="font-semibold text-white">Google Play</div>
      </div>
    </a>
  )
}

interface EdgeInstallButtonProps {
  extensionId: string
  className?: string
}

export function EdgeInstallButton({ extensionId, className }: EdgeInstallButtonProps) {
  return (
    <a
      href={`https://microsoftedge.microsoft.com/addons/detail/${extensionId}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-dark-200 rounded-xl hover:border-[#0078D4] hover:shadow-lg transition-all duration-200',
        className
      )}
    >
      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
        <path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z" fill="url(#edge-gradient)"/>
        <defs>
          <linearGradient id="edge-gradient" x1="4" y1="24" x2="44" y2="24">
            <stop stopColor="#0078D4"/>
            <stop offset="1" stopColor="#00BCF2"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="text-left">
        <div className="text-xs text-dark-500 uppercase tracking-wide">Available on</div>
        <div className="font-semibold text-dark-900">Edge Add-ons</div>
      </div>
    </a>
  )
}

interface FirefoxInstallButtonProps {
  extensionId: string
  className?: string
}

export function FirefoxInstallButton({ extensionId, className }: FirefoxInstallButtonProps) {
  return (
    <a
      href={`https://addons.mozilla.org/firefox/addon/${extensionId}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-dark-200 rounded-xl hover:border-[#FF7139] hover:shadow-lg transition-all duration-200',
        className
      )}
    >
      <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="20" fill="url(#firefox-gradient)"/>
        <defs>
          <linearGradient id="firefox-gradient" x1="4" y1="24" x2="44" y2="24">
            <stop stopColor="#FF7139"/>
            <stop offset="1" stopColor="#FFBD4F"/>
          </linearGradient>
        </defs>
      </svg>
      <div className="text-left">
        <div className="text-xs text-dark-500 uppercase tracking-wide">Available on</div>
        <div className="font-semibold text-dark-900">Firefox Add-ons</div>
      </div>
    </a>
  )
}
