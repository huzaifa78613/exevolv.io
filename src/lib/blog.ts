export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  featured: boolean
  metaTitle: string
  metaDescription: string
  tags: string[]
  content: string
}

export const blogPosts: BlogPost[] = []

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(p => p.category === category)
}

export function getCategories(): string[] {
  const cats = new Set(blogPosts.map(p => p.category))
  return ['All', ...Array.from(cats)]
}
