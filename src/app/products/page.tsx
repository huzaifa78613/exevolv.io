import { Metadata } from 'next'
import ProductCard from '@/components/ui/ProductCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { products } from '@/lib/products'
import { Chrome, Smartphone, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Products - Browser Extensions & Apps',
  description: 'Explore our collection of browser extensions and applications. IP Filter Exchange, QuizMaster AI, TaleemSpot Notes and more.',
  openGraph: {
    title: 'Products - exevolv.io',
    description: 'Explore our collection of browser extensions and applications.',
  },
}

const categories = [
  { id: 'all', name: 'All Products', icon: Globe },
  { id: 'chrome-extension', name: 'Chrome Extensions', icon: Chrome },
  { id: 'android-app', name: 'Android Apps', icon: Smartphone },
]

export default function ProductsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-bg py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Products' }]} />
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-white mb-4">
              Our Products
            </h1>
            <p className="text-lg text-dark-600 dark:text-dark-400">
              Discover our collection of browser extensions and applications designed 
              to enhance your productivity, protect your privacy, and simplify your digital life.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-white dark:bg-dark-950">
        <div className="container-custom">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary-50 text-primary dark:bg-primary-900/20 hover:bg-primary hover:text-white transition-colors"
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Coming Soon */}
          <div className="mt-12 p-8 bg-dark-50 dark:bg-dark-900 rounded-2xl text-center">
            <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">
              More Products Coming Soon
            </h3>
            <p className="text-dark-600 dark:text-dark-400">
              We're constantly working on new tools to help you. Stay tuned for updates!
            </p>
          </div>
        </div>
      </section>

      {/* Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: products.map((product, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
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
                  ratingCount: 10
                }
              }
            }))
          })
        }}
      />
    </>
  )
}
