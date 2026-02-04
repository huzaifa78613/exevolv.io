import Link from 'next/link'
import { Product } from '@/lib/products'
import { cn } from '@/lib/utils'
import { Star, Users, Chrome, Smartphone, ExternalLink } from 'lucide-react'

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const categoryIcons = {
    'chrome-extension': Chrome,
    'firefox-extension': Chrome,
    'edge-extension': Chrome,
    'android-app': Smartphone,
    'web-app': ExternalLink,
  }

  const categoryLabels = {
    'chrome-extension': 'Chrome Extension',
    'firefox-extension': 'Firefox Add-on',
    'edge-extension': 'Edge Extension',
    'android-app': 'Android App',
    'web-app': 'Web App',
  }

  const CategoryIcon = categoryIcons[product.category]

  return (
    <div className={cn(
      'card card-hover overflow-hidden group',
      featured && 'md:col-span-2 md:row-span-2'
    )}>
      {/* Category Badge */}
      <div className="p-6 pb-0">
        <div className={cn(
          'badge mb-4',
          product.category.includes('chrome') ? 'badge-chrome' :
          product.category.includes('android') ? 'badge-android' : 'badge-primary'
        )}>
          <CategoryIcon className="w-3 h-3 mr-1" />
          {categoryLabels[product.category]}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Icon and Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <span className="text-2xl font-bold text-primary">{product.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-xl text-dark-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-primary font-medium">
              {product.tagline}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-dark-600 dark:text-dark-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-6 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium text-dark-900 dark:text-white">{product.rating}</span>
          </div>
          <div className="flex items-center gap-1 text-dark-500">
            <Users className="w-4 h-4" />
            <span>{product.users} users</span>
          </div>
          <span className="text-dark-400">v{product.version}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link 
            href={`/products/${product.slug}`}
            className="btn-primary text-sm py-2 px-4 flex-1 text-center"
          >
            Learn More
          </Link>
          <a 
            href={product.storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm py-2 px-4"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}
