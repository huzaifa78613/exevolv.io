import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for exevolv.io. Learn how we handle your data and protect your privacy across all our products and services.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="gradient-bg py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white">
                Privacy Policy
              </h1>
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
              Welcome to exevolv.io ("we", "our", or "us"). We are committed to protecting your privacy 
              and ensuring you have a positive experience when using our products and services.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website exevolv.io and use our products including browser extensions and 
              mobile applications.
            </p>

            <h2>Information We Collect</h2>
            <h3>Information You Provide</h3>
            <p>We may collect information that you voluntarily provide, including:</p>
            <ul>
              <li>Contact information (email address) when you contact us</li>
              <li>Feedback and correspondence when you report issues or request support</li>
              <li>Newsletter subscription email if you opt in</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect:</p>
            <ul>
              <li>Log data (IP address, browser type, pages visited)</li>
              <li>Device information (operating system, device type)</li>
              <li>Usage data (how you interact with our website)</li>
            </ul>

            <h3>Product-Specific Data</h3>
            <p>
              Our browser extensions and mobile applications are designed with privacy as a core principle. 
              We do not collect personal data through our products. Specific privacy practices for each 
              product are detailed in their individual privacy policies.
            </p>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send newsletters and updates (if you've subscribed)</li>
              <li>Improve our website and products</li>
              <li>Analyze website usage and trends</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share 
              information only in the following circumstances:
            </p>
            <ul>
              <li>With your consent</li>
              <li>To comply with legal requirements</li>
              <li>To protect our rights and safety</li>
              <li>With service providers who assist our operations (under strict confidentiality agreements)</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>
              Our website uses cookies to enhance your browsing experience. You can control cookie 
              preferences through your browser settings. We use:
            </p>
            <ul>
              <li><strong>Essential cookies:</strong> Required for website functionality</li>
              <li><strong>Analytics cookies:</strong> Help us understand website usage</li>
              <li><strong>Preference cookies:</strong> Remember your settings</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your information. 
              However, no method of transmission over the Internet is 100% secure, and we cannot 
              guarantee absolute security.
            </p>

            <h2>Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your personal information</li>
              <li>Object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>

            <h2>Children's Privacy</h2>
            <p>
              Our services are not directed to children under 13. We do not knowingly collect personal 
              information from children under 13. If we become aware of such collection, we will delete 
              the information promptly.
            </p>

            <h2>International Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place for such transfers.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. We will notify you of significant changes 
              by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <ul>
              <li>Email: <a href="mailto:privacy@exevolv.io">privacy@exevolv.io</a></li>
              <li>Website: <Link href="/contact">exevolv.io/contact</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
