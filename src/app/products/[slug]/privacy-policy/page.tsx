import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { products, getProductBySlug } from '@/lib/products'
import { Shield, ArrowLeft } from 'lucide-react'

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
    title: `Privacy Policy - ${product.name}`,
    description: `Privacy policy for ${product.name}. Learn how we handle your data and protect your privacy.`,
  }
}

export default function PrivacyPolicyPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  
  if (!product) {
    notFound()
  }

  return (
    <>
      <section className="gradient-bg py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs 
            items={[
              { label: 'Products', href: '/products' },
              { label: product.name, href: `/products/${product.slug}` },
              { label: 'Privacy Policy' }
            ]} 
          />
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-dark-500">{product.name}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white">
                  Privacy Policy
                </h1>
              </div>
            </div>
            <p className="text-dark-600 dark:text-dark-400">
              Last updated: February 1, 2026
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-dark-950">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose dark:prose-invert prose-headings:font-bold prose-a:text-primary">
            <h2>Introduction</h2>
            <p>
              This Privacy Policy describes how {product.name} ("we", "our", or "us") collects, uses, 
              and shares information about you when you use our {product.category === 'android-app' ? 'mobile application' : 'browser extension'}.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We are committed to protecting your privacy. {product.name} is designed with privacy as a core principle.
            </p>
            <ul>
              <li><strong>No Personal Data Collection:</strong> We do not collect, store, or transmit any personally identifiable information.</li>
              <li><strong>No Browsing History:</strong> We do not track or store your browsing history.</li>
              <li><strong>No Third-Party Tracking:</strong> We do not use any third-party analytics or tracking services.</li>
            </ul>

            <h2>How We Use Information</h2>
            <p>
              Since we don't collect personal information, there's no personal data to use. The extension/app 
              operates entirely locally on your device.
            </p>

            <h2>Data Storage</h2>
            <p>
              Any preferences or settings you configure are stored locally on your device using 
              {product.category === 'android-app' ? ' the app\'s local storage' : ' browser storage APIs'}. 
              This data never leaves your device.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              {product.name} may connect to external services as part of its core functionality. These connections 
              are necessary for the product to work and are encrypted for security.
            </p>

            <h2>Data Security</h2>
            <p>
              We take security seriously. All network communications are encrypted using industry-standard protocols. 
              Your local data is protected by your device's security measures.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our products are not directed at children under 13. We do not knowingly collect information from children.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <ul>
              <li>Email: <a href="mailto:privacy@exevolv.io">privacy@exevolv.io</a></li>
              <li>Website: <a href="https://exevolv.io/contact">exevolv.io/contact</a></li>
            </ul>
          </div>

          <div className="max-w-3xl mx-auto mt-12">
            <Link 
              href={`/products/${product.slug}`}
              className="inline-flex items-center text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to {product.name}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
