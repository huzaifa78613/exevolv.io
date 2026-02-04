'use client'

import { Star } from 'lucide-react'

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  rating: number
}

export default function TestimonialCard({ quote, author, role, rating }: TestimonialCardProps) {
  return (
    <div className="card p-6">
      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-dark-300'}`}
          />
        ))}
      </div>
      
      {/* Quote */}
      <blockquote className="text-dark-700 dark:text-dark-300 mb-6">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-400 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">{author.charAt(0)}</span>
        </div>
        <div>
          <div className="font-semibold text-dark-900 dark:text-white text-sm">{author}</div>
          <div className="text-dark-500 text-xs">{role}</div>
        </div>
      </div>
    </div>
  )
}
