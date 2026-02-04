import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import FAQItem from '@/components/ui/FAQItem'
import { products, getProductBySlug } from '@/lib/products'
import { HelpCircle, ArrowLeft, MessageSquare } from 'lucide-react'

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  
  if (!product) {
    return { title: 'FAQs Not Found' }
  }

  return {
    title: `FAQs - ${product.name}`,
    description: `Frequently asked questions about ${product.name}. Find answers to common questions.`,
  }
}

export default function ProductFAQsPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  
  if (!product) {
    notFound()
  }

  const faqs = [
    {
      question: `What is ${product.name}?`,
      answer: product.description,
    },
    {
      question: `Is ${product.name} free to use?`,
      answer: `Yes! ${product.name} is completely free to download and use. There are no hidden fees or premium paywalls.`,
    },
    {
      question: `How do I install ${product.name}?`,
      answer: product.category === 'android-app'
        ? 'Visit the Google Play Store, search for the app, and tap "Install". The app will download and install automatically.'
        : 'Click the "Add to Chrome" button on the Chrome Web Store page. The extension will be added to your browser automatically.',
    },
    {
      question: `Does ${product.name} collect my data?`,
      answer: 'We take privacy seriously. We do not collect, store, or share any personal data. All operations happen locally on your device.',
    },
    {
      question: `How do I get support for ${product.name}?`,
      answer: 'You can reach our support team through the Contact page on our website. We typically respond within 24-48 hours.',
    },
    {
      question: `Is ${product.name} safe to use?`,
      answer: 'Absolutely! Our product is built with security best practices and undergoes regular security reviews. All network communications are encrypted.',
    },
    {
      question: `What browsers/devices are supported?`,
      answer: product.category === 'android-app'
        ? 'The app supports Android 6.0 and above. It works on phones and tablets.'
        : 'The extension supports Chrome, Edge, and other Chromium-based browsers. We may add Firefox support in the future.',
    },
    {
      question: `How often is ${product.name} updated?`,
      answer: 'We regularly release updates with bug fixes, performance improvements, and new features. Updates are delivered automatically.',
    },
  ]

  return (
    <>
      <section className="gradient-bg py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs 
            items={[
              { label: 'Products', href: '/products' },
              { label: product.name, href: `/products/${product.slug}` },
              { label: 'FAQs' }
            ]} 
          />
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-dark-500">{product.name}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white">
                  Frequently Asked Questions
                </h1>
              </div>
            </div>
            <p className="text-dark-600 dark:text-dark-400">
              Find answers to common questions about {product.name}.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-dark-950">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="card p-6 md:p-8">
              <div className="divide-y divide-dark-100 dark:divide-dark-800">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} {...faq} />
                ))}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="mt-8 p-6 bg-dark-50 dark:bg-dark-900 rounded-2xl text-center">
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-dark-900 dark:text-white mb-2">
                Still have questions?
              </h3>
              <p className="text-dark-600 dark:text-dark-400 mb-4 text-sm">
                Can&apos;t find what you&apos;re looking for? Our support team is here to help.
              </p>
              <Link href="/contact" className="btn-primary text-sm py-2 px-4">
                Contact Support
              </Link>
            </div>

            <div className="mt-8">
              <Link 
                href={`/products/${product.slug}`}
                className="inline-flex items-center text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {product.name}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
