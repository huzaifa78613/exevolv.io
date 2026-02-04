import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { products, getProductBySlug } from '@/lib/products'
import { FileText, ArrowLeft } from 'lucide-react'

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
    title: `Terms of Service - ${product.name}`,
    description: `Terms of service for ${product.name}. Read our terms and conditions.`,
  }
}

export default function TermsPage({ params }: Props) {
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
              { label: 'Terms of Service' }
            ]} 
          />
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-dark-500">{product.name}</p>
                <h1 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white">
                  Terms of Service
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
            <h2>Acceptance of Terms</h2>
            <p>
              By downloading, installing, or using {product.name}, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our product.
            </p>

            <h2>Description of Service</h2>
            <p>
              {product.name} is a {product.category === 'android-app' ? 'mobile application' : 'browser extension'} 
              provided by exevolv.io. {product.description}
            </p>

            <h2>License</h2>
            <p>
              We grant you a limited, non-exclusive, non-transferable, revocable license to use {product.name} 
              for your personal, non-commercial use, subject to these Terms.
            </p>

            <h2>Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the product for any illegal or unauthorized purpose</li>
              <li>Attempt to reverse engineer, decompile, or disassemble the software</li>
              <li>Remove or alter any proprietary notices or labels</li>
              <li>Use the product in any way that could damage, disable, or impair our services</li>
              <li>Use the product for academic dishonesty or to violate academic integrity policies</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              {product.name} and all related materials are owned by exevolv.io and protected by intellectual 
              property laws. You may not copy, modify, distribute, or create derivative works without our permission.
            </p>

            <h2>Disclaimer of Warranties</h2>
            <p>
              {product.name} is provided "as is" and "as available" without warranties of any kind, either 
              express or implied. We do not guarantee that the product will be error-free, secure, or 
              available at all times.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, exevolv.io shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages arising from your use of {product.name}.
            </p>

            <h2>Modifications to Service</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue {product.name} at any time without 
              notice. We are not liable to you or any third party for any modification, suspension, or 
              discontinuation of the service.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We may update these Terms of Service from time to time. Continued use of {product.name} after 
              changes constitutes acceptance of the new terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws, without 
              regard to conflict of law principles.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about these Terms, please contact us at:
            </p>
            <ul>
              <li>Email: <a href="mailto:legal@exevolv.io">legal@exevolv.io</a></li>
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
