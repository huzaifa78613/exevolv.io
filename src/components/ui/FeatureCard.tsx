import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href?: string
  className?: string
}

export default function FeatureCard({ icon, title, description, href, className }: FeatureCardProps) {
  const content = (
    <>
      <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-lg text-dark-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-dark-600 dark:text-dark-400 text-sm">
        {description}
      </p>
      {href && (
        <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Learn more <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      )}
    </>
  )

  if (href) {
    return (
      <Link 
        href={href}
        className={cn(
          'card card-hover p-6 group block',
          className
        )}
      >
        {content}
      </Link>
    )
  }

  return (
    <div className={cn('card p-6', className)}>
      {content}
    </div>
  )
}
