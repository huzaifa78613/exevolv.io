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
      <img src="/Assets/ChromeWebStore-icon.png" alt="Chrome Web Store" className="w-8 h-8 object-contain" />
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
      <img src="/Assets/PlayStoreicon.png" alt="Google Play" className="w-8 h-8 object-contain" />
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
      <img src="/Assets/MicrosoftWebStore-icon.png" alt="Microsoft Edge Add-ons" className="w-8 h-8 object-contain" />
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
