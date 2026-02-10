import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Calendar, User, Clock, ArrowLeft, Tag, Share2 } from 'lucide-react'
import { blogPosts, getBlogPostBySlug } from '@/lib/blog'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  // Get related posts (same category, exclude current)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3)

  // If not enough related posts from same category, fill with recent posts
  if (relatedPosts.length < 3) {
    const additionalPosts = blogPosts
      .filter(p => p.id !== post.id && !relatedPosts.find(rp => rp.id === p.id))
      .slice(0, 3 - relatedPosts.length)
    relatedPosts.push(...additionalPosts)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-bg py-12 md:py-20">
        <div className="container-custom">
          <Breadcrumbs items={[
            { label: 'Blog', href: '/blog' },
            { label: post.title }
          ]} />

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="badge-primary">{post.category}</span>
              <span className="text-sm text-dark-500 dark:text-dark-400 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-lg text-dark-600 dark:text-dark-400 mb-6">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-6 text-sm text-dark-500 dark:text-dark-400">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </time>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16 bg-white dark:bg-dark-950">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-3">
              <div 
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:text-dark-900 dark:prose-headings:text-white
                  prose-headings:font-bold
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-dark-600 dark:prose-p:text-dark-400 prose-p:leading-relaxed prose-p:mb-4
                  prose-li:text-dark-600 dark:prose-li:text-dark-400
                  prose-strong:text-dark-800 dark:prose-strong:text-dark-200
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-primary prose-blockquote:bg-primary-50 dark:prose-blockquote:bg-primary-900/10 prose-blockquote:rounded-r-lg prose-blockquote:py-1 prose-blockquote:px-4
                  prose-code:bg-dark-100 dark:prose-code:bg-dark-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-table:border-collapse prose-th:bg-dark-100 dark:prose-th:bg-dark-800 prose-th:p-3 prose-td:p-3 prose-td:border prose-td:border-dark-200 dark:prose-td:border-dark-700
                "
                dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-dark-100 dark:border-dark-800">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-4 h-4 text-dark-500" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Box */}
              <div className="mt-8 p-6 bg-dark-50 dark:bg-dark-900 rounded-2xl">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">e</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-dark-900 dark:text-white mb-1">{post.author}</h3>
                    <p className="text-sm text-dark-600 dark:text-dark-400">
                      We build privacy-focused browser extensions and educational apps that empower users 
                      with better tools for a safer, smarter, and more productive digital experience.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                <div className="card p-6">
                  <h3 className="font-bold text-dark-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                    In This Article
                  </h3>
                  <nav className="space-y-2">
                    {extractHeadings(post.content).map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.id}`}
                        className={`block text-sm hover:text-primary transition-colors ${
                          heading.level === 2 
                            ? 'text-dark-700 dark:text-dark-300 font-medium' 
                            : 'text-dark-500 dark:text-dark-400 pl-4'
                        }`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="card p-6">
                    <h3 className="font-bold text-dark-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                      Related Articles
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          href={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <h4 className="text-sm font-medium text-dark-700 dark:text-dark-300 group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-dark-500 mt-1">{relatedPost.readTime}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Back to Blog */}
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to All Articles
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* More Articles */}
      <section className="py-16 bg-dark-50 dark:bg-dark-900">
        <div className="container-custom">
          <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-8">
            Continue Reading
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="card card-hover p-6 group"
              >
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary/50">exevolv.io</span>
                </div>
                <span className="badge-primary text-xs mb-2 inline-block">{relatedPost.category}</span>
                <h3 className="font-bold text-dark-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2 mb-2">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-dark-600 dark:text-dark-400 line-clamp-2">
                  {relatedPost.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  let html = markdown.trim()

  // Convert markdown tables to HTML tables
  html = html.replace(/(?:^|\n)(\|.+\|)\n(\|[-| :]+\|)\n((?:\|.+\|\n?)+)/gm, (match, header, separator, body) => {
    const headerCells = header.split('|').filter((c: string) => c.trim()).map((c: string) => `<th>${c.trim()}</th>`).join('')
    const rows = body.trim().split('\n').map((row: string) => {
      const cells = row.split('|').filter((c: string) => c.trim()).map((c: string) => `<td>${c.trim()}</td>`).join('')
      return `<tr>${cells}</tr>`
    }).join('')
    return `<table><thead><tr>${headerCells}</tr></thead><tbody>${rows}</tbody></table>`
  })

  // Convert headers with IDs for anchor links
  html = html.replace(/^### (.+)$/gm, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return `<h3 id="${id}">${text}</h3>`
  })
  html = html.replace(/^## (.+)$/gm, (_, text) => {
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return `<h2 id="${id}">${text}</h2>`
  })

  // Convert bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Convert unordered lists
  html = html.replace(/(?:^|\n)((?:- .+\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(item => {
      const text = item.replace(/^- /, '')
      return `<li>${text}</li>`
    }).join('')
    return `<ul>${items}</ul>`
  })

  // Convert ordered lists
  html = html.replace(/(?:^|\n)((?:\d+\. .+\n?)+)/gm, (match) => {
    const items = match.trim().split('\n').map(item => {
      const text = item.replace(/^\d+\. /, '')
      return `<li>${text}</li>`
    }).join('')
    return `<ol>${items}</ol>`
  })

  // Convert paragraphs (lines that aren't already wrapped in tags)
  html = html.split('\n\n').map(block => {
    block = block.trim()
    if (!block) return ''
    if (block.startsWith('<')) return block
    return `<p>${block}</p>`
  }).join('\n')

  // Clean up any remaining single newlines within paragraphs
  html = html.replace(/<p>([\s\S]*?)\n([\s\S]*?)<\/p>/g, '<p>$1 $2</p>')

  return html
}

// Extract headings for table of contents
function extractHeadings(markdown: string): { text: string; id: string; level: number }[] {
  const headings: { text: string; id: string; level: number }[] = []
  const lines = markdown.split('\n')
  
  for (const line of lines) {
    const h2Match = line.match(/^## (.+)$/)
    const h3Match = line.match(/^### (.+)$/)

    if (h2Match) {
      const text = h2Match[1]
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      headings.push({ text, id, level: 2 })
    } else if (h3Match) {
      const text = h3Match[1]
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      headings.push({ text, id, level: 3 })
    }
  }

  return headings
}
