'use client'

import { Navbar } from '@/components/layout/navbar/navbar'
import { Footer } from '@/components/layout/footer/footer'
import { LanguageSwitcher } from '@/components/ui/language-switcher/language-switcher'

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white w-full border border-red-500">
      <div className="bg-white  pb-[40px] container px-[20px] sm:px-[20px] relative border border-blue-500">
        <Navbar />
        {children}
        <Footer />
        <LanguageSwitcher />
      </div>
    </div>
  )
}
