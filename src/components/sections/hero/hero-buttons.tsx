'use client'

import { Button } from '@/components/ui/button/button'

export function HeroButtons() {
  return (
    <div className="flex gap-4 pt-8">
      <Button
        variant="outline"
        size="lg"
        className="rounded-full px-10 h-[56px] text-[16px] border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/5"
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
        View pricing
      </Button>
      <Button
        size="lg"
        className="rounded-full px-10 h-[56px] text-[16px] bg-[#0066FF] hover:bg-[#0066FF]/90"
        onClick={() => {
          window.location.href = 'https://calendly.com/ziro-nikhil/30min'
        }}
      >
        Book a call
      </Button>
    </div>
  )
}
