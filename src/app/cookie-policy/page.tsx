import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Cookie } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie policy for exevolv.io. Learn about how we use cookies and similar technologies on our website.',
}

export default function CookiePolicyPage() {
  return (
    <>
      <section className="gradient-bg py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Cookie Policy' }]} />
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                <Cookie className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white">
                Cookie Policy
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
            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit a website. 
              They are widely used to make websites work more efficiently and provide information 
              to website owners.
            </p>

            <h2>How We Use Cookies</h2>
            <p>We use cookies on exevolv.io for the following purposes:</p>
            
            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable basic 
              features like page navigation and access to secure areas. The website cannot function 
              properly without these cookies.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>cookie-consent</td>
                  <td>Stores your cookie preferences</td>
                  <td>1 year</td>
                </tr>
                <tr>
                  <td>theme</td>
                  <td>Remembers your theme preference</td>
                  <td>1 year</td>
                </tr>
              </tbody>
            </table>

            <h3>Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our website by collecting 
              and reporting information anonymously.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Cookie</th>
                  <th>Purpose</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_ga</td>
                  <td>Google Analytics - distinguishes users</td>
                  <td>2 years</td>
                </tr>
                <tr>
                  <td>_gid</td>
                  <td>Google Analytics - distinguishes users</td>
                  <td>24 hours</td>
                </tr>
              </tbody>
            </table>

            <h3>Preference Cookies</h3>
            <p>
              These cookies remember your preferences and settings to provide enhanced, personalized 
              features.
            </p>

            <h2>Third-Party Cookies</h2>
            <p>
              Some cookies are placed by third-party services that appear on our pages. We do not 
              control these cookies. Third parties we may work with include:
            </p>
            <ul>
              <li>Google Analytics (analytics)</li>
              <li>Social media platforms (if you share our content)</li>
            </ul>

            <h2>Managing Cookies</h2>
            <p>
              You can control and manage cookies in various ways:
            </p>
            
            <h3>Browser Settings</h3>
            <p>
              Most browsers allow you to refuse or accept cookies, delete existing cookies, or 
              receive notification before a cookie is set. Here's how to manage cookies in popular browsers:
            </p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener">Mozilla Firefox</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Microsoft Edge</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
            </ul>

            <h3>Our Cookie Consent Tool</h3>
            <p>
              When you first visit our website, you'll see a cookie consent banner. You can choose 
              to accept all cookies or only necessary cookies. You can change your preferences at 
              any time by clearing your cookies and revisiting the site.
            </p>

            <h2>Impact of Disabling Cookies</h2>
            <p>
              If you choose to disable cookies, some features of our website may not function properly. 
              Essential cookies cannot be disabled as they are required for the website to work.
            </p>

            <h2>Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We will post the updated policy 
              on this page and update the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us:
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
