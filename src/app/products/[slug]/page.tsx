import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import ImageSlider from '@/components/ui/ImageSlider'
import { ChromeInstallButton, PlayStoreButton, EdgeInstallButton, FirefoxInstallButton } from '@/components/ui/StoreButtons'
import { products, getProductBySlug } from '@/lib/products'
import * as Icons from 'lucide-react'
import { Star, Users, Calendar, ArrowRight, Check, ChevronRight, Shield, Zap, BookOpen, ExternalLink } from 'lucide-react'

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
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Content */}
            <div className="lg:col-span-5 xl:col-span-4">
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
                {product.fiverrUrl && (
                  <a
                    href={product.fiverrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-green-500/30"
                    style={{ background: 'linear-gradient(135deg, #1dbf73 0%, #19a463 100%)' }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-1.44c-.019-.446-.062-.85-.129-1.21-.068-.36-.185-.665-.355-.914a1.62 1.62 0 0 0-.62-.574 1.98 1.98 0 0 0-.93-.198c-.42 0-.772.099-1.056.296a2.005 2.005 0 0 0-.683.844c-.174.37-.295.823-.362 1.36-.068.538-.101 1.15-.101 1.838 0 .693.036 1.308.107 1.843.072.535.194.984.368 1.35.174.364.403.641.688.829.284.187.634.28 1.05.28.354 0 .664-.064.928-.194.265-.13.49-.321.672-.574.183-.253.32-.564.414-.933.092-.37.14-.793.143-1.27h1.44c0 .582-.067 1.117-.2 1.605a4.03 4.03 0 0 1-.595 1.27 2.77 2.77 0 0 1-.997.838c-.4.202-.875.303-1.424.303-.599 0-1.12-.099-1.562-.296a3.005 3.005 0 0 1-1.085-.855 3.74 3.74 0 0 1-.644-1.358c-.143-.533-.215-1.135-.215-1.808v-.52c0-.662.072-1.261.215-1.795.143-.534.367-.99.672-1.368a2.98 2.98 0 0 1 1.1-.865c.44-.202.955-.303 1.543-.303.52 0 .98.09 1.377.27.397.18.733.435 1.006.764.273.33.482.73.625 1.2.144.47.219.997.224 1.58zM7.39 16.73c0 .46-.04.876-.117 1.25-.079.37-.21.69-.393.955a1.8 1.8 0 0 1-.697.614c-.286.144-.637.216-1.053.216-.366 0-.678-.07-.935-.211a1.66 1.66 0 0 1-.627-.616 2.93 2.93 0 0 1-.355-.979 6.65 6.65 0 0 1-.11-1.27v-.66h4.287v.7zm1.44-1.73v-.19c0-.674-.077-1.277-.23-1.806a3.757 3.757 0 0 0-.672-1.358 2.917 2.917 0 0 0-1.082-.855c-.43-.197-.93-.296-1.5-.296-.562 0-1.06.099-1.494.296a3.02 3.02 0 0 0-1.08.844 3.728 3.728 0 0 0-.659 1.35c-.148.53-.222 1.13-.222 1.8v.52c0 .674.074 1.278.222 1.813.148.534.377.99.688 1.368.31.378.702.667 1.175.866.473.2 1.034.3 1.682.3.787 0 1.437-.175 1.95-.525.513-.35.893-.875 1.14-1.575l-1.33-.34c-.126.38-.333.667-.622.862-.29.194-.634.29-1.032.29-.432 0-.79-.09-1.077-.27a1.9 1.9 0 0 1-.659-.736 3.09 3.09 0 0 1-.308-.997 6.892 6.892 0 0 1-.072-.942v-.158h4.182zm-5.622-8.6V4.02h1.44v2.38H6.4V7.7H5.208v4.82c0 .29.058.498.175.625.116.127.3.19.55.19.09 0 .177-.004.26-.013.083-.008.162-.02.237-.034l.15 1.22a3.82 3.82 0 0 1-.414.092 3.08 3.08 0 0 1-.453.033c-.64 0-1.116-.17-1.43-.513-.312-.34-.469-.842-.469-1.506V7.7H2.24V6.4h1.568V4.02h1.44V6.4H6.4zm-5.79 6.07c0-.674.073-1.278.22-1.81a3.782 3.782 0 0 1 .66-1.358 2.98 2.98 0 0 1 1.083-.855c.432-.197.934-.296 1.508-.296.573 0 1.075.099 1.506.296.43.197.79.487 1.077.87.287.38.503.84.648 1.38.145.54.217 1.15.217 1.832v.52c0 .672-.072 1.272-.217 1.8a3.875 3.875 0 0 1-.648 1.356 2.897 2.897 0 0 1-1.077.861c-.431.2-.933.3-1.506.3-.574 0-1.076-.1-1.508-.3a2.98 2.98 0 0 1-1.083-.861 3.782 3.782 0 0 1-.66-1.356c-.147-.528-.22-1.128-.22-1.8v-.52z"/>
                    </svg>
                    Hire me on Fiverr
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            {/* Product Visual */}
            <div className="relative lg:col-span-7 xl:col-span-8">
              {product.screenshots && product.screenshots.length > 0 ? (
                <ImageSlider images={product.screenshots} altText={product.name} />
              ) : (
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/20">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-4">
                      <span className="text-5xl font-bold text-white">{product.name.charAt(0)}</span>
                    </div>
                  </div>
                </div>
              )}
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

            {product.category === 'android-app' && (
              <Link 
                href={`/products/${product.slug}/delete-account`}
                className="card card-hover p-4 flex items-center gap-3 group border-red-100 dark:border-red-900/30"
              >
                <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center text-red-500">
                  <Icons.Trash2 className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="font-medium text-dark-900 dark:text-white text-sm group-hover:text-red-500 transition-colors">
                    Delete Account
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-dark-400" />
              </Link>
            )}
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
