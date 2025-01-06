'use client'

import { Button } from '@/components/ui/button/button'
import { useTranslations } from 'next-intl'

export function HeroButtons() {
  const t = useTranslations('navigation')
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6 sm:pt-8 w-full sm:w-auto px-4 sm:px-0">
      <Button
        variant="outline"
        size="lg"
        className="w-full sm:w-auto rounded-full px-6 sm:px-10 h-[48px] sm:h-[56px] text-[15px] sm:text-[16px] border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/5"
        onClick={() => {
          const element = document.getElementById('pricing')
          const offset = -100 // Adjust this value to control the offset from top
          const elementPosition = element?.getBoundingClientRect().top ?? 0
          const offsetPosition = elementPosition + window.pageYOffset + offset
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }}
      >
        {t('viewPricing')}
      </Button>
      <Button
        size="lg"
        className="w-full sm:w-auto rounded-full px-6 sm:px-10 h-[48px] sm:h-[56px] text-[15px] sm:text-[16px] bg-[#0066FF] hover:bg-[#0066FF]/90"
        onClick={() => {
          window.location.href = 'https://calendly.com/ziro-nikhil/30min'
        }}
      >
        {t('bookCall')}
      </Button>
    </div>
  )
}
