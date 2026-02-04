import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { ChromeInstallButton, PlayStoreButton, EdgeInstallButton, FirefoxInstallButton } from '@/components/ui/StoreButtons'
import { products, getProductBySlug } from '@/lib/products'
import * as Icons from 'lucide-react'
import { Star, Users, Calendar, ArrowRight, Check, ChevronRight, Shield, Zap, BookOpen } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  
  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: `${product.name} - ${product.tagline}`,
    description: product.description,
    keywords: [product.name, product.category, 'exevolv.io', ...product.tagline.split(' ')],
    openGraph: {
      title: `${product.name} - exevolv.io`,
      description: product.description,
      type: 'website',
    },
  }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  
  if (!product) {
    notFound()
  }

  const getIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName]
    return IconComponent ? <IconComponent className="w-6 h-6" /> : <Icons.Star className="w-6 h-6" />
  }

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-bg py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs 
            items={[
              { label: 'Products', href: '/products' },
              { label: product.name }
            ]} 
          />
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              {/* Category Badge */}
              <span className="badge-primary mb-4">
                {product.category === 'chrome-extension' && 'Chrome Extension'}
                {product.category === 'android-app' && 'Android App'}
                {product.category === 'firefox-extension' && 'Firefox Add-on'}
                {product.category === 'edge-extension' && 'Edge Extension'}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-white mb-4">
                {product.name}
              </h1>
              
              <p className="text-xl text-primary font-medium mb-4">
                {product.tagline}
              </p>
              
              <p className="text-lg text-dark-600 dark:text-dark-400 mb-6">
                {product.description}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-dark-900 dark:text-white">{product.rating}</span>
                  <span className="text-dark-500">rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-dark-900 dark:text-white">{product.users}</span>
                  <span className="text-dark-500">users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-dark-400" />
                  <span className="text-dark-500">v{product.version}</span>
                </div>
              </div>

              {/* Install Buttons */}
              <div className="flex flex-wrap gap-4">
                {product.category === 'chrome-extension' && (
                  <>
                    <ChromeInstallButton extensionId={product.storeId} />
                    <EdgeInstallButton extensionId={product.storeId} />
                  </>
                )}
                {product.category === 'android-app' && (
                  <PlayStoreButton appId={product.storeId} />
                )}
              </div>
            </div>

            {/* Product Visual */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-5xl font-bold text-white">{product.name.charAt(0)}</span>
                  </div>
                  <p className="text-dark-600 dark:text-dark-400">
                    Screenshot placeholder
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white dark:bg-dark-950">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              Key Features
            </h2>
            <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              Discover what makes {product.name} stand out from the crowd.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feature, index) => (
              <div key={index} className="card p-6">
                <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center text-primary mb-4">
                  {getIcon(feature.icon)}
                </div>
                <h3 className="font-bold text-lg text-dark-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-dark-600 dark:text-dark-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-dark-50 dark:bg-dark-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              Getting started with {product.name} is easy. Follow these simple steps.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: 'Install the Extension/App',
                  description: product.category === 'android-app' 
                    ? 'Download from Google Play Store and install on your device.'
                    : 'Click the install button above to add to your browser from the store.'
                },
                {
                  step: 2,
                  title: 'Open and Configure',
                  description: 'Launch the app/extension and follow the initial setup wizard to configure your preferences.'
                },
                {
                  step: 3,
                  title: 'Start Using',
                  description: 'You\'re all set! Start using the features and enjoy the enhanced experience.'
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="pt-2">
                    <h3 className="font-bold text-lg text-dark-900 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-dark-600 dark:text-dark-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section-padding bg-white dark:bg-dark-950">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">
              User Reviews
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i}
                  className={`w-6 h-6 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-dark-300'}`}
                />
              ))}
              <span className="text-xl font-bold text-dark-900 dark:text-white ml-2">
                {product.rating} out of 5
              </span>
            </div>
            <p className="text-dark-600 dark:text-dark-400">
              Based on reviews from {product.users} users
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Happy User', review: 'Excellent extension! Works exactly as described. Highly recommended.', rating: 5 },
              { name: 'Power User', review: 'Great features and easy to use. The support team is very responsive.', rating: 5 },
              { name: 'Satisfied Customer', review: 'Does what it promises. Clean interface and reliable performance.', rating: 4 },
            ].map((review, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-dark-300'}`}
                    />
                  ))}
                </div>
                <p className="text-dark-600 dark:text-dark-400 mb-4">
                  "{review.review}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{review.name.charAt(0)}</span>
                  </div>
                  <span className="font-medium text-dark-900 dark:text-white text-sm">
                    {review.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-dark-50 dark:bg-dark-900">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              href={`/products/${product.slug}/documentation`}
              className="card card-hover p-4 flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-dark-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                  Documentation
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-dark-400" />
            </Link>
            
            <Link 
              href={`/products/${product.slug}/faqs`}
              className="card card-hover p-4 flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary">
                <Icons.HelpCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-dark-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                  FAQs
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-dark-400" />
            </Link>
            
            <Link 
              href={`/products/${product.slug}/privacy-policy`}
              className="card card-hover p-4 flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary">
                <Shield className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-dark-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                  Privacy Policy
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-dark-400" />
            </Link>
            
            <Link 
              href={`/products/${product.slug}/terms-of-service`}
              className="card card-hover p-4 flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary">
                <Icons.FileText className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-dark-900 dark:text-white text-sm group-hover:text-primary transition-colors">
                  Terms of Service
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-dark-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto">
            Join {product.users} users already using {product.name}. It's free!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {product.category === 'chrome-extension' && (
              <ChromeInstallButton extensionId={product.storeId} className="bg-white" />
            )}
            {product.category === 'android-app' && (
              <PlayStoreButton appId={product.storeId} />
            )}
          </div>
        </div>
      </section>

      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: product.name,
            description: product.description,
            applicationCategory: product.category === 'android-app' ? 'EducationalApplication' : 'BrowserApplication',
            operatingSystem: product.category === 'android-app' ? 'Android' : 'Chrome, Firefox, Edge',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.rating,
              ratingCount: 10,
              bestRating: 5,
              worstRating: 1
            },
            author: {
              '@type': 'Organization',
              name: 'exevolv.io'
            }
          })
        }}
      />
    </>
  )
}
