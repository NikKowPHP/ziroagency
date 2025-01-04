'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button/button'
import { navigationConfig } from '@/config/navigation'
import { cn } from '@/lib/utils/cn'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F7F7F7]">
      <div className="container mx-auto px-6">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-6 w-6">
              <div className="absolute inset-0 rounded-full bg-[#0066FF]" />
            </div>
            <span className="text-[18px] font-medium">ZIRO</span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigationConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-[16px] font-medium transition-colors',
                  pathname === item.href ? 'text-gray-900' : 'text-gray-900'
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Button
            size="sm"
            className="rounded-full px-6 h-10 text-[15px] bg-white text-black hover:bg-white/90"
          >
            Book a call
          </Button>
        </div>
      </div>
    </header>
  )
}
