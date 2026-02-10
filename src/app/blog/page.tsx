import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Calendar, ArrowRight, Clock } from 'lucide-react'
import { blogPosts, getCategories } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog - Tech Articles, Privacy Guides & Tutorials',
  description: 'Read in-depth articles about online privacy, browser security, Chrome extensions, education technology, and productivity tips from the exevolv.io team.',
  openGraph: {
    title: 'Blog - exevolv.io',
    description: 'In-depth articles on privacy, security, browser extensions, education technology, and productivity from exevolv.io.',
  },
}

const categories = getCategories()

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <>
      {/* Hero Section */}
      <section className="relative gradient-bg py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative">
          <Breadcrumbs items={[{ label: 'Blog' }]} />
          
          <div className="max-w-3xl">
            <span className="badge-primary mb-4 inline-block">Articles & Guides</span>
            <h1 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-white mb-4 leading-[1.1]">
              Blog
            </h1>
            <p className="text-lg text-dark-600 dark:text-dark-400 leading-relaxed">
              In-depth articles on online privacy, browser security, education technology, and 
              productivity. Practical guides and tutorials from the exevolv.io team.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white dark:bg-dark-950 border-b border-dark-100 dark:border-dark-800 sticky top-16 md:top-20 z-40 backdrop-blur-md bg-white/95 dark:bg-dark-950/95">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2">
            <span className="px-4 py-2 rounded-xl text-sm font-medium bg-primary text-white">
              All
            </span>
            {categories.map((category) => (
              <span
                key={category}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-dark-100 text-dark-700 dark:bg-dark-800 dark:text-dark-300 hover:bg-primary-50 hover:text-primary dark:hover:bg-primary-900/20 transition-colors cursor-default"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="section-padding bg-white dark:bg-dark-950">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-8">
            Featured Articles
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredPosts.map((post) => (
              <article key={post.id} className="card card-hover overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-primary-100 via-primary-50 to-primary-200 dark:from-primary-900/30 dark:via-primary-900/20 dark:to-primary-800/30 flex items-center justify-center relative overflow-hidden">
                  <div className="text-center relative z-10">
                    <span className="text-4xl font-bold text-primary/40 group-hover:text-primary/60 transition-colors">exevolv</span>
                    <span className="text-sm text-primary/30 block">.io</span>
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="badge-primary">{post.category}</span>
                    <span className="text-sm text-dark-500 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3 group-hover:text-primary transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-dark-600 dark:text-dark-400 text-sm mb-5 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-dark-100 dark:border-dark-800">
                    <div className="flex items-center gap-2 text-sm text-dark-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Regular Posts */}
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-8">
            Latest Articles
          </h2>
          
          <div className="grid gap-6">
            {regularPosts.map((post) => (
              <article key={post.id} className="card card-hover p-0 overflow-hidden group">
                <Link href={`/blog/${post.slug}`} className="flex flex-col md:flex-row">
                  <div className="md:w-56 h-40 md:h-auto bg-gradient-to-br from-primary-100 via-primary-50 to-primary-200 dark:from-primary-900/30 dark:via-primary-900/20 dark:to-primary-800/30 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                    <div className="text-center relative z-10">
                      <span className="text-2xl font-bold text-primary/40">e.io</span>
                    </div>
                    <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="badge-primary text-xs">{post.category}</span>
                      <span className="text-sm text-dark-500 flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-2 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-dark-600 dark:text-dark-400 text-sm mb-4 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-dark-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-br from-primary via-primary-600 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-white/80 mb-8 leading-relaxed">
              Get the latest articles, tutorials, and product updates delivered to your inbox.
            </p>
            <a
              href="mailto:hello@exevolv.io?subject=Newsletter Subscription"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-dark-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Subscribe via Email
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Schema.org Blog structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'exevolv.io Blog',
            description: 'In-depth articles on online privacy, browser security, education technology, and productivity.',
            url: 'https://exevolv.io/blog',
            publisher: {
              '@type': 'Organization',
              name: 'exevolv.io',
              url: 'https://exevolv.io'
            },
            blogPost: blogPosts.map(post => ({
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.excerpt,
              datePublished: post.date,
              author: {
                '@type': 'Organization',
                name: post.author
              },
              url: `https://exevolv.io/blog/${post.slug}`
            }))
          })
        }}
      />
    </>
  )
}
