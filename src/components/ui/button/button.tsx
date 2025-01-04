'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isActive?: boolean
  isFullWidth?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isActive,
      isFullWidth,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          // Base styles
          'inline-flex items-center justify-center font-medium transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0066FF] focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          isFullWidth && 'w-full',

          // Variants
          {
            // Primary variant (blue)
            'bg-[#0066FF] text-white hover:bg-[#0066FF]/90 active:bg-[#0066FF]/80':
              variant === 'primary',

            // Secondary variant (light blue)
            'bg-[#0066FF]/10 text-[#0066FF] hover:bg-[#0066FF]/20 active:bg-[#0066FF]/30':
              variant === 'secondary',

            // Outline variant
            'border-2 border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/5 active:bg-[#0066FF]/10':
              variant === 'outline',

            // Ghost variant (for language switcher)
            'text-gray-700 hover:text-gray-900 active:bg-gray-200':
              variant === 'ghost' && !isActive,
            'bg-[#0066FF] text-white': variant === 'ghost' && isActive,

            // White variant
            'bg-white text-black hover:bg-white/90 active:bg-white/80':
              variant === 'white',
          },

          // Sizes
          {
            'h-10 px-4 text-[15px] rounded-full': size === 'sm',
            'h-[56px] px-8 text-[16px] rounded-full': size === 'md',
            'h-[64px] px-10 text-[18px] rounded-full': size === 'lg',
            'h-[72px] px-12 text-[20px] rounded-full w-full': size === 'xl',
          },

          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
