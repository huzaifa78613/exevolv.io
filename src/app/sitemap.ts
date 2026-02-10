import { MetadataRoute } from 'next'
import { products } from '@/lib/products'
import { blogPosts } from '@/lib/blog'

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://exevolv.io'
  
  // Static pages
  const staticPages: { path: string; changeFrequency: ChangeFrequency; priority: number }[] = [
    { path: '', changeFrequency: 'weekly', priority: 1 },
    { path: '/products', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/docs', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/faqs', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/privacy-policy', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/terms-of-service', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/cookie-policy', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/refund-policy', changeFrequency: 'monthly', priority: 0.5 },
  ]

  const staticUrls: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  // Product pages
  const productUrls: MetadataRoute.Sitemap = products.flatMap((product) => [
    {
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products/${product.slug}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/products/${product.slug}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/products/${product.slug}/documentation`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/products/${product.slug}/faqs`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.6,
    },
  ])

  // Blog post pages
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as ChangeFrequency,
    priority: 0.7,
  }))

  return [...staticUrls, ...productUrls, ...blogUrls]
}
