import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Clock, ArrowLeft } from 'lucide-react'
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
      <section className="relative gradient-bg py-16 md:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <Breadcrumbs items={[
            { label: 'Blog', href: '/blog' },
            { label: post.title }
          ]} />

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="badge-primary px-4 py-1.5 text-sm">{post.category}</span>
              <span className="text-sm text-dark-500 dark:text-dark-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-dark-900 dark:text-white mb-6 leading-[1.15]">
              {post.title}
            </h1>
            
            <p className="text-lg md:text-xl text-dark-600 dark:text-dark-400 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-8 text-sm text-dark-500 dark:text-dark-400">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">e</span>
                </div>
                <div>
                  <span className="block font-medium text-dark-700 dark:text-dark-300">{post.author}</span>
                  <time dateTime={post.date} className="text-xs">
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
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16 bg-white dark:bg-dark-950">
        <div className="container-custom">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-3">
              <div 
                className="article-content prose prose-lg dark:prose-invert max-w-none
                  prose-headings:text-dark-900 dark:prose-headings:text-white
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-dark-100 dark:prose-h2:border-dark-800
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-dark-600 dark:prose-p:text-dark-400 prose-p:leading-[1.8] prose-p:mb-5 prose-p:text-[16px]
                  prose-li:text-dark-600 dark:prose-li:text-dark-400 prose-li:leading-[1.8] prose-li:mb-2
                  prose-ul:my-6 prose-ol:my-6
                  prose-strong:text-dark-800 dark:prose-strong:text-dark-200 prose-strong:font-semibold
                  prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary-50/50 dark:prose-blockquote:bg-primary-900/10 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:text-dark-700 dark:prose-blockquote:text-dark-300
                  prose-code:bg-dark-100 dark:prose-code:bg-dark-800 prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:text-sm prose-code:font-mono
                  prose-table:border-collapse prose-table:w-full prose-table:my-8
                  prose-th:bg-dark-50 dark:prose-th:bg-dark-800 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:text-sm prose-th:uppercase prose-th:tracking-wider
                  prose-td:p-3 prose-td:border prose-td:border-dark-200 dark:prose-td:border-dark-700 prose-td:text-sm
                  prose-hr:border-dark-200 dark:prose-hr:border-dark-700 prose-hr:my-10
                  prose-img:rounded-xl prose-img:shadow-lg
                "
                dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
              />

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-dark-100 dark:border-dark-800">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-dark-500 mb-4">Tags</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 text-sm bg-dark-50 dark:bg-dark-800 text-dark-600 dark:text-dark-400 rounded-lg border border-dark-100 dark:border-dark-700 hover:border-primary hover:text-primary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Box */}
              <div className="mt-8 p-8 bg-gradient-to-br from-dark-50 to-primary-50/30 dark:from-dark-900 dark:to-primary-900/10 rounded-2xl border border-dark-100 dark:border-dark-800">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/25">
                    <span className="text-white font-bold text-xl">e</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-dark-900 dark:text-white mb-1">Written by {post.author}</h3>
                    <p className="text-sm text-dark-600 dark:text-dark-400 leading-relaxed">
                      We build privacy-focused browser extensions and educational apps that empower users 
                      with better tools for a safer, smarter, and more productive digital experience.
                    </p>
                    <Link href="/about" className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3 hover:gap-2 transition-all">
                      Learn more about us <ArrowLeft className="w-3 h-3 rotate-180" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Table of Contents */}
                <div className="card p-6 border-t-4 border-t-primary">
                  <h3 className="font-bold text-dark-900 dark:text-white mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                    In This Article
                  </h3>
                  <nav className="space-y-1.5">
                    {extractHeadings(post.content).map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.id}`}
                        className={`block text-sm py-1.5 hover:text-primary transition-colors border-l-2 ${
                          heading.level === 2 
                            ? 'text-dark-700 dark:text-dark-300 font-medium border-dark-200 dark:border-dark-700 hover:border-primary pl-3' 
                            : 'text-dark-500 dark:text-dark-400 border-transparent pl-6'
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
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-white">
              Continue Reading
            </h2>
            <Link href="/blog" className="text-primary font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
              All articles <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="card card-hover p-6 group"
              >
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-primary/30">exevolv</span>
                    <span className="text-xs text-primary/40 block mt-1">.io</span>
                  </div>
                </div>
                <span className="badge-primary text-xs mb-3 inline-block">{relatedPost.category}</span>
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

      {/* Schema.org Article Structured Data for AdSense */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.metaDescription,
            author: {
              '@type': 'Organization',
              name: post.author,
              url: 'https://exevolv.io'
            },
            publisher: {
              '@type': 'Organization',
              name: 'exevolv.io',
              url: 'https://exevolv.io',
              logo: {
                '@type': 'ImageObject',
                url: 'https://exevolv.io/logo.png'
              }
            },
            datePublished: post.date,
            dateModified: post.date,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://exevolv.io/blog/${post.slug}`
            },
            keywords: post.tags.join(', '),
            articleSection: post.category,
            wordCount: post.content.split(/\s+/).length,
            inLanguage: 'en-US'
          })
        }}
      />

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://exevolv.io' },
              { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://exevolv.io/blog' },
              { '@type': 'ListItem', position: 3, name: post.title, item: `https://exevolv.io/blog/${post.slug}` }
            ]
          })
        }}
      />
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

  // Convert blockquotes
  html = html.replace(/(?:^|\n)((?:> .+\n?)+)/gm, (match) => {
    const text = match.trim().split('\n').map((line: string) => line.replace(/^> /, '')).join(' ')
    return `<blockquote><p>${text}</p></blockquote>`
  })

  // Convert horizontal rules
  html = html.replace(/^---$/gm, '<hr />')

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

  // Convert italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Convert links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')

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
