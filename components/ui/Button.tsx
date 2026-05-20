import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline'
}

export default function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'px-5 py-2 text-sm transition-colors disabled:opacity-50',
        variant === 'primary' && 'bg-accent text-black hover:bg-blue-300',
        variant === 'outline' &&
          'border border-current hover:border-accent hover:text-accent',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
