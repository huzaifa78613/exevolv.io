import { Metadata } from 'next'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Read the disclaimer for exevolv.io. This page covers general content disclaimer, advertising disclosure, affiliate disclosure, and limitation of liability.',
  openGraph: {
    title: 'Disclaimer - exevolv.io',
    description: 'Disclaimer and advertising disclosure for exevolv.io.',
  },
}

export default function DisclaimerPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative gradient-bg py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative">
          <Breadcrumbs items={[{ label: 'Disclaimer' }]} />
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-white mb-4 leading-[1.1]">
              Disclaimer
            </h1>
            <p className="text-lg text-dark-600 dark:text-dark-400 leading-relaxed">
              Last updated: February 10, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white dark:bg-dark-950">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert
            prose-headings:text-dark-900 dark:prose-headings:text-white
            prose-p:text-dark-600 dark:prose-p:text-dark-400 prose-p:leading-relaxed
            prose-li:text-dark-600 dark:prose-li:text-dark-400
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-dark-800 dark:prose-strong:text-dark-200
          ">
            <h2>1. General Information Disclaimer</h2>
            <p>
              The information provided on exevolv.io (&quot;the Website&quot;) is for general informational 
              purposes only. All information on the Website is provided in good faith. However, we make 
              no representation or warranty of any kind, express or implied, regarding the accuracy, 
              adequacy, validity, reliability, availability, or completeness of any information on the Website.
            </p>
            <p>
              Under no circumstance shall we have any liability to you for any loss or damage of any kind 
              incurred as a result of the use of the Website or reliance on any information provided on 
              the Website. Your use of the Website and your reliance on any information on the Website 
              is solely at your own risk.
            </p>

            <h2>2. Advertising Disclosure</h2>
            <p>
              This Website may contain advertisements provided by third-party advertising networks, 
              including Google AdSense. These advertisements are served based on your browsing activity 
              and interests. The presence of advertisements on our Website does not constitute an 
              endorsement of the products or services advertised.
            </p>
            <p>
              We may earn revenue from advertisements displayed on this Website. This advertising 
              revenue helps us maintain and improve our Website and continue providing free content, 
              tools, and resources to our users. The advertising does not influence our editorial 
              content or product reviews.
            </p>
            <p>
              Third-party advertisers may use cookies, web beacons, and similar technologies to collect 
              information about your browsing activity. For more details, please review our{' '}
              <Link href="/cookie-policy">Cookie Policy</Link> and{' '}
              <Link href="/privacy-policy">Privacy Policy</Link>.
            </p>

            <h2>3. Affiliate Disclosure</h2>
            <p>
              Some links on this Website may be affiliate links, which means we may receive a small 
              commission at no additional cost to you if you click through and make a purchase. We only 
              recommend products and services that we genuinely believe will benefit our users. The 
              affiliate relationship does not influence our editorial content, reviews, or recommendations.
            </p>

            <h2>4. External Links Disclaimer</h2>
            <p>
              The Website may contain links to external websites that are not provided or maintained by 
              or in any way affiliated with exevolv.io. Please note that we do not guarantee the accuracy, 
              relevance, timeliness, or completeness of any information on these external websites.
            </p>
            <p>
              We do not control the content, privacy policies, or practices of any third-party websites. 
              We strongly advise you to review the privacy policy and terms of service of every website 
              you visit through links on our Website.
            </p>

            <h2>5. Product Disclaimer</h2>
            <p>
              Our browser extensions and applications are provided &quot;as is&quot; and &quot;as available&quot; without 
              any warranties of any kind. While we strive to ensure our products function correctly and 
              as described, we cannot guarantee uninterrupted or error-free operation.
            </p>
            <p>
              We are not responsible for any issues arising from the use of our products, including but 
              not limited to:
            </p>
            <ul>
              <li>Data loss or corruption</li>
              <li>System incompatibilities</li>
              <li>Browser performance issues</li>
              <li>Third-party service outages</li>
              <li>Changes to browser APIs or platform policies</li>
            </ul>
            <p>
              Users should always keep backups of their important data and use our products in accordance 
              with the applicable <Link href="/terms-of-service">Terms of Service</Link>.
            </p>

            <h2>6. Educational Content Disclaimer</h2>
            <p>
              The educational content on this Website, including blog articles, tutorials, and guides, 
              is intended for informational and educational purposes only. While we make every effort 
              to ensure accuracy, we do not guarantee that the information is up to date or applicable 
              to your specific situation.
            </p>
            <p>
              The content should not be considered professional advice. For specific concerns related 
              to technology, security, privacy, or education, we recommend consulting with qualified 
              professionals.
            </p>

            <h2>7. Testimonials and Reviews Disclaimer</h2>
            <p>
              Any testimonials or reviews displayed on this Website represent the experiences and opinions 
              of individual users. These results are not guaranteed, and individual experiences may vary. 
              Testimonials are not intended to represent or guarantee that anyone will achieve the same 
              or similar results.
            </p>

            <h2>8. Fair Use Disclaimer</h2>
            <p>
              This Website may contain copyrighted material that has not been specifically authorized 
              by the copyright owner. We believe this constitutes &quot;fair use&quot; of the copyrighted material 
              as provided for in applicable copyright law. If you wish to use copyrighted material from 
              this Website for purposes that go beyond fair use, you must obtain permission from the 
              copyright owner.
            </p>

            <h2>9. No Professional Advice</h2>
            <p>
              The content on this Website does not constitute legal, financial, professional, or 
              technical advice. Any action you take based on the information found on this Website 
              is strictly at your own risk. We will not be liable for any losses and/or damages 
              in connection with the use of our Website or its content.
            </p>

            <h2>10. Changes to This Disclaimer</h2>
            <p>
              We reserve the right to modify this disclaimer at any time without prior notice. Changes 
              will be effective immediately upon posting on this page. We encourage users to review 
              this page periodically for any updates.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this Disclaimer, please contact us:
            </p>
            <ul>
              <li>Email: <a href="mailto:hello@exevolv.io">hello@exevolv.io</a></li>
              <li>Website: <Link href="/contact">Contact Page</Link></li>
              <li>Location: Faisalabad, Pakistan</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
