export interface Product {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  category: 'chrome-extension' | 'firefox-extension' | 'edge-extension' | 'android-app' | 'web-app'
  icon: string
  screenshots: string[]
  features: {
    title: string
    description: string
    icon: string
  }[]
  storeUrl: string
  storeId: string
  rating: number
  users: string
  version: string
  lastUpdated: string
  developer: string
  privacyPolicyUrl: string
  supportUrl: string
}

export const products: Product[] = [
  {
    id: 'ip-filter-exchange',
    name: 'IP Filter Exchange',
    slug: 'ip-filter-exchange',
    tagline: 'Safe, Secure, Private Proxy Connector',
    description: 'IP Filter Exchange is a powerful and secure proxy management extension designed to protect your online privacy. It allows you to easily connect, switch, and manage proxies while preventing IP leaks with built-in WebRTC protection. With automatic timezone matching and a smooth user experience, it ensures safe and reliable browsing every time.',
    category: 'chrome-extension',
    icon: '/images/products/ip-filter-exchange-icon.svg',
    screenshots: ['/images/products/ip-filter-exchange-1.png', '/images/products/ip-filter-exchange-2.png'],
    features: [
      {
        title: 'Proxy Management',
        description: 'Easily connect, switch, and manage multiple proxies with one click.',
        icon: 'Shield'
      },
      {
        title: 'WebRTC Protection',
        description: 'Built-in WebRTC leak protection to prevent IP address exposure.',
        icon: 'Lock'
      },
      {
        title: 'Auto Timezone',
        description: 'Automatic timezone matching based on your proxy location.',
        icon: 'Globe'
      },
      {
        title: 'Privacy Focused',
        description: 'No data collection or storage. Your privacy is our priority.',
        icon: 'Eye'
      },
      {
        title: 'Easy Interface',
        description: 'Clean and intuitive user interface for seamless browsing.',
        icon: 'Zap'
      },
      {
        title: 'Secure Connection',
        description: 'All connections are encrypted for maximum security.',
        icon: 'ShieldCheck'
      }
    ],
    storeUrl: 'https://chromewebstore.google.com/detail/ip-filter-exchange/abnppbcbieejncolbmahjmbfallhinie',
    storeId: 'abnppbcbieejncolbmahjmbfallhinie',
    rating: 5.0,
    users: '100+',
    version: '2.3.2',
    lastUpdated: 'January 18, 2026',
    developer: 'exevolv.io',
    privacyPolicyUrl: '/products/ip-filter-exchange/privacy-policy',
    supportUrl: '/products/ip-filter-exchange/documentation'
  },
  {
    id: 'quizmaster-ai',
    name: 'QuizMaster AI',
    slug: 'quizmaster-ai',
    tagline: 'Instant Quiz Solver – Your Intelligent Study Companion',
    description: 'Transform the way you approach online quizzes and multiple-choice questions with QuizMaster AI. Our advanced artificial intelligence technology scans your screen, extracts questions, and provides accurate answers with comprehensive explanations in seconds.',
    category: 'chrome-extension',
    icon: '/images/products/quizmaster-ai-icon.svg',
    screenshots: ['/images/products/quizmaster-ai-1.png', '/images/products/quizmaster-ai-2.png'],
    features: [
      {
        title: 'Scan and Solve',
        description: 'Capture any quiz or test on your screen with a single click. AI-powered OCR extracts all visible questions instantly.',
        icon: 'Scan'
      },
      {
        title: 'Instant Answers',
        description: 'Receive correct answers within seconds powered by state-of-the-art language models.',
        icon: 'Zap'
      },
      {
        title: 'Detailed Explanations',
        description: 'Understand not just what the answer is, but why it\'s correct with clear explanations.',
        icon: 'BookOpen'
      },
      {
        title: 'AI Assistant',
        description: 'Access an intelligent chat interface 24/7 for questions, clarification, or study guidance.',
        icon: 'MessageSquare'
      },
      {
        title: 'Smart Persistence',
        description: 'Your scan results remain visible until you perform a new scan.',
        icon: 'Save'
      },
      {
        title: 'Privacy First',
        description: 'All processing happens through secure encrypted connections. No personal data stored.',
        icon: 'Shield'
      }
    ],
    storeUrl: 'https://chromewebstore.google.com/detail/quizmaster-ai-%E2%80%93-instant-q/baeiclpjplbiebkghalehgofhmcinnmn',
    storeId: 'baeiclpjplbiebkghalehgofhmcinnmn',
    rating: 5.0,
    users: '50+',
    version: '1.1.1',
    lastUpdated: 'February 3, 2026',
    developer: 'exevolv.io',
    privacyPolicyUrl: '/products/quizmaster-ai/privacy-policy',
    supportUrl: '/products/quizmaster-ai/documentation'
  },
  {
    id: 'taleemspot-notes',
    name: 'TaleemSpot Notes',
    slug: 'taleemspot-notes',
    tagline: 'Complete Matric & Inter Study App',
    description: 'Prepare smarter for Matric & Inter (Class 9, 10, 11, 12) with Taleem Spot – Pakistan\'s #1 BISE study app. Access free Notes, Past Papers, Guess Papers, Textbooks & Practice Tests – all in one place. Our goal is to make exam preparation smarter and stress-free with a simple, user-friendly, and engaging study experience.',
    category: 'android-app',
    icon: '/images/products/taleemspot-icon.svg',
    screenshots: ['/images/products/taleemspot-1.png', '/images/products/taleemspot-2.png'],
    features: [
      {
        title: 'Past Papers',
        description: 'Complete collection of past papers from 2015-2025 for all subjects.',
        icon: 'FileText'
      },
      {
        title: 'MCQ Practice Tests',
        description: 'Interactive quiz system with MCQ practice tests for exam preparation.',
        icon: 'CheckSquare'
      },
      {
        title: 'Complete Textbooks',
        description: 'Access complete textbooks and study notes for all subjects.',
        icon: 'Book'
      },
      {
        title: 'AI Study Assistant',
        description: 'AI-powered study assistant and math solver for instant help.',
        icon: 'Bot'
      },
      {
        title: 'Offline Mode',
        description: 'Study offline without internet connection.',
        icon: 'WifiOff'
      },
      {
        title: 'Progress Tracking',
        description: 'Track your study progress with performance analytics.',
        icon: 'TrendingUp'
      }
    ],
    storeUrl: 'https://play.google.com/store/apps/details?id=com.taleemspot.notes&hl=en',
    storeId: 'com.taleemspot.notes',
    rating: 4.8,
    users: '100+',
    version: '1.0.0',
    lastUpdated: 'December 7, 2025',
    developer: 'Creative Taleem Technologies',
    privacyPolicyUrl: '/products/taleemspot-notes/privacy-policy',
    supportUrl: '/products/taleemspot-notes/user-guide'
  }
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category)
}
