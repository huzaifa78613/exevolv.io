import { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Calendar, User, ArrowRight, Tag, Clock } from 'lucide-react'
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
      <section className="gradient-bg py-16 md:py-24">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Blog' }]} />
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-white mb-4">
              Blog
            </h1>
            <p className="text-lg text-dark-600 dark:text-dark-400">
              In-depth articles on online privacy, browser security, education technology, and 
              productivity. Practical guides and tutorials from the exevolv.io team.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white dark:bg-dark-950 border-b border-dark-100 dark:border-dark-800">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-dark-100 text-dark-700 dark:bg-dark-800 dark:text-dark-300 hover:bg-primary hover:text-white transition-colors"
              >
                {category}
              </button>
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
          
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {featuredPosts.map((post) => (
              <article key={post.id} className="card card-hover overflow-hidden group">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/50">exevolv.io</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="badge-primary">{post.category}</span>
                    <span className="text-sm text-dark-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-dark-600 dark:text-dark-400 text-sm mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
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
              <article key={post.id} className="card card-hover p-6 group">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-48 h-32 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary/50">e.io</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className="badge-primary text-xs">{post.category}</span>
                      <span className="text-sm text-dark-500 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-dark-600 dark:text-dark-400 text-sm mb-4">
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
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <button className="btn-outline">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-white/80 mb-6">
              Get the latest articles, tutorials, and product updates delivered to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button type="submit" className="px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-dark-50 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
