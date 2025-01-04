import { cn } from '@/lib/utils/cn'

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Tag({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: TagProps) {
  return (
    <span
      className={cn(
        // Base styles
        'inline-flex items-center justify-center font-medium rounded-full transition-colors',

        // Variants
        {
          // Primary variant (blue outline)
          'border border-[#0066FF] text-[#0066FF]': variant === 'primary',

          // Secondary variant (light blue bg)
          'bg-[#0066FF]/10 text-[#0066FF]': variant === 'secondary',

          // Outline variant (gray)
          'border border-gray-200 text-gray-600': variant === 'outline',
        },

        // Sizes
        {
          'px-3 py-1 text-sm': size === 'sm',
          'px-4 py-2 text-sm': size === 'md',
          'px-5 py-2.5 text-base': size === 'lg',
        },

        className
      )}
      {...props}
    />
  )
}