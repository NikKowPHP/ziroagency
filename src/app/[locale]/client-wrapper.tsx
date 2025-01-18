'use client'

import { Header } from '@/components/layout/header/header'
import { Footer } from '@/components/layout/footer/footer'
import { LanguageSwitcher } from '@/components/ui/language-switcher/language-switcher'

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-white px-[20px]'>
      <Header />
      {children}
      <Footer />
      <LanguageSwitcher />
    </div>
  )
}

