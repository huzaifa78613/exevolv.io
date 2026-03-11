import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { ShieldAlert } from 'lucide-react'

export const metadata: Metadata = {
  title: 'DMCA Policy',
  description: 'DMCA policy for exevolv.io. Learn how to report copyright infringement and how we handle DMCA takedown requests.',
}

export default function DMCAPage() {
  return (
    <>
      <section className="gradient-bg py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'DMCA Policy' }]} />
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                <ShieldAlert className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white">
                DMCA Policy
              </h1>
            </div>
            <p className="text-dark-600 dark:text-dark-400">
              Last updated: March 11, 2026
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-dark-950">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto prose dark:prose-invert prose-headings:font-bold prose-a:text-primary">
            <h2>Introduction</h2>
            <p>
              exevolv.io ("we", "our", or "us") respects the intellectual property rights of others and 
              expects our users to do the same. In accordance with the Digital Millennium Copyright Act 
              of 1998 ("DMCA"), we will respond promptly to claims of copyright infringement committed 
              using our website or services.
            </p>

            <h2>Reporting Copyright Infringement</h2>
            <p>
              If you believe that content available on or through our website or services infringes your 
              copyright, please submit a DMCA takedown notice containing the following information:
            </p>
            <ol>
              <li>
                <strong>Identification of the copyrighted work:</strong> A description of the copyrighted 
                work that you claim has been infringed, including the URL (web address) of the copyrighted 
                work or a copy of it.
              </li>
              <li>
                <strong>Identification of the infringing material:</strong> A description of where the 
                material you claim is infringing is located on our website or services, with enough detail 
                so that we can find it (e.g., a URL or specific page reference).
              </li>
              <li>
                <strong>Your contact information:</strong> Your name, address, telephone number, and email 
                address so we can contact you regarding your complaint.
              </li>
              <li>
                <strong>A statement of good faith:</strong> A statement that you have a good faith belief 
                that use of the material in the manner complained of is not authorized by the copyright 
                owner, its agent, or the law.
              </li>
              <li>
                <strong>A statement of accuracy:</strong> A statement, made under penalty of perjury, that 
                the information in the notification is accurate and that you are the copyright owner or 
                authorized to act on behalf of the owner.
              </li>
              <li>
                <strong>Your signature:</strong> A physical or electronic signature of the copyright owner 
                or a person authorized to act on their behalf.
              </li>
            </ol>

            <h2>Where to Send DMCA Notices</h2>
            <p>
              Please send your DMCA takedown notice to our designated copyright agent at:
            </p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:hello@exevolv.io">hello@exevolv.io</a></li>
              <li><strong>Subject Line:</strong> DMCA Takedown Notice</li>
            </ul>

            <h2>Counter-Notification</h2>
            <p>
              If you believe that the material you posted was removed or disabled by mistake or 
              misidentification, you may file a counter-notification with us. Your counter-notification 
              must include:
            </p>
            <ol>
              <li>Your name, address, and telephone number.</li>
              <li>
                Identification of the material that was removed or disabled and the location where the 
                material appeared before it was removed or disabled.
              </li>
              <li>
                A statement under penalty of perjury that you have a good faith belief that the material 
                was removed or disabled as a result of mistake or misidentification.
              </li>
              <li>
                A statement that you consent to the jurisdiction of the federal court in your district 
                (or if you are outside the United States, that you consent to the jurisdiction of any 
                judicial district in which exevolv.io may be found) and that you will accept service of 
                process from the person who submitted the original DMCA notice or their agent.
              </li>
              <li>Your physical or electronic signature.</li>
            </ol>

            <h2>How We Handle Notices</h2>
            <p>Upon receiving a valid DMCA takedown notice, we will:</p>
            <ul>
              <li>Remove or disable access to the allegedly infringing material promptly.</li>
              <li>Notify the user who posted the material about the removal.</li>
              <li>Provide the user with a copy of the takedown notice and information about filing a counter-notification.</li>
            </ul>
            <p>
              Upon receiving a valid counter-notification, we may restore the removed material after 
              10–14 business days unless the copyright owner files a court action against the content 
              provider.
            </p>

            <h2>Repeat Infringers</h2>
            <p>
              In accordance with the DMCA, we will terminate, in appropriate circumstances, the accounts 
              or access of users who are repeat infringers of copyrighted material.
            </p>

            <h2>Disclaimer</h2>
            <p>
              The information provided on this page is for general informational purposes only. It does 
              not constitute legal advice. If you require legal advice, please consult a qualified 
              attorney.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this DMCA Policy, please contact us at{' '}
              <a href="mailto:hello@exevolv.io">hello@exevolv.io</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
