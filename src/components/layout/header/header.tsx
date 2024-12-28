'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button/button'
import { navigationConfig } from '@/config/navigation'
import { cn } from '@/lib/utils/cn'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-10">
              <div className="absolute inset-0 rounded-full bg-[#0066FF]" />
            </div>
            <span className="text-[22px] font-semibold">ZIRO</span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navigationConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-[16px] font-medium transition-colors hover:text-[#0066FF]',
                  pathname === item.href
                    ? 'text-[#0066FF]'
                    : 'text-gray-900'
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-6">
            {/* Language Selector */}
            <div className="hidden md:flex items-center">
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full bg-[#F2F2F2] hover:bg-gray-200 h-10 px-4"
              >
                <span className="flex items-center gap-2">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    <path d="M2 12h20"/>
                  </svg>
                  English
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                </span>
              </Button>
            </div>

            {/* CTA Button */}
            <Button 
              size="lg"
              className="rounded-full px-6 h-11 text-[16px] bg-[#0066FF] hover:bg-[#0066FF]/90"
            >
              Book a call
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 