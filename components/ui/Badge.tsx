import { cn } from '@/lib/utils'

export default function Badge({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'text-xs px-2 py-0.5 border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400',
        className
      )}
    >
      {children}
    </span>
  )
}
