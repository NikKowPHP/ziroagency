'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button/button'
import { navigationConfig } from '@/config/navigation'
import { cn } from '@/lib/utils/cn'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function Header() {
  const pathname = usePathname()
  const t = useTranslations('navigation')

  return (
    <header className="fixed top-10  container rounded-full left-0 right-0 z-50 bg-[#F7F7F7] bg-opacity-80 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/ziro.avif"
              alt="ZIRO"
              width={150}
              height={51}
              className="h-[36px] w-[95px]"
            />
          </Link>

{/* todo: fix layout for desktop */}

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigationConfig.mainNav.map((item) => (
              <Button
                key={item.href}
                onClick={() => {
                  const element = document.getElementById(item.href)
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
                variant='navbar'
                className={cn(
                  'text-[16px] font-medium transition-colors',
                  pathname === item.href ? 'text-gray-900' : 'text-gray-900'
                )}
              >
                {t(item.title)}
              </Button>
            ))}
          </nav>

          {/* CTA Button */}
          <Button
            size="sm"
            className="rounded-full px-6 h-10 text-[15px] bg-white text-black hover:bg-white/90"
            onClick={() => {
              window.location.href = 'https://calendly.com/ziro-nikhil/30min'
            }}
          >
            {t('bookCall')}
          </Button>
        </div>
      </div>
    </header>
  )
}
