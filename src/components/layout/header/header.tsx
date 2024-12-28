'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button/button'
import { navigationConfig } from '@/config/navigation'
import { cn } from '@/lib/utils/cn'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container flex h-26 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">
              <span className="text-primary">ZIRO</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navigationConfig.mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href
                    ? 'text-primary'
                    : 'text-text-secondary'
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="gap-2"
            >
              <span className="i-lucide-globe h-4 w-4" />
              English
            </Button>
          </div>
          <Button>Book a call</Button>
        </div>
      </div>
    </header>
  )
} 