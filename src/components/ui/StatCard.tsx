import { cn } from '@/lib/utils'

interface StatCardProps {
  value: string
  label: string
  icon?: React.ReactNode
  className?: string
}

export default function StatCard({ value, label, icon, className }: StatCardProps) {
  return (
    <div className={cn(
      'text-center p-6 rounded-2xl bg-white dark:bg-dark-900 border border-dark-100 dark:border-dark-800',
      className
    )}>
      {icon && (
        <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
          {icon}
        </div>
      )}
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
        {value}
      </div>
      <div className="text-dark-500 text-sm">
        {label}
      </div>
    </div>
  )
}
