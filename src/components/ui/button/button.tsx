'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false,
    disabled,
    children,
    type = 'button',
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={isLoading || disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-primary text-white shadow hover:bg-primary/90': variant === 'primary',
            'bg-secondary text-primary hover:bg-secondary/90': variant === 'secondary',
            'border-2 border-primary text-primary hover:bg-primary/10': variant === 'outline',
          },
          {
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4 text-base': size === 'md',
            'h-12 px-6 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      >
        <span className="relative inline-flex items-center gap-2">
          {isLoading && (
            <span className="absolute left-0 flex h-4 w-4 animate-spin">
              <span className="h-full w-full rounded-full border-2 border-current border-t-transparent" />
            </span>
          )}
          <span className={cn('inline-flex items-center gap-2', {
            'opacity-0': isLoading,
          })}>
            {children}
          </span>
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, type ButtonProps } 