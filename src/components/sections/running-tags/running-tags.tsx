'use client'

import { type Service } from '@/lib/data/services'
import { useEffect, useRef } from 'react'

interface RunningTagsProps {
  services: Service[]
  speed?: number
}

export function RunningTags({ services, speed = 50 }: RunningTagsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const scrollerInnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!scrollerRef.current || !scrollerInnerRef.current) return

    const scrollerContent = Array.from(scrollerInnerRef.current.children)
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true)
      if (scrollerInnerRef.current) {
        scrollerInnerRef.current.appendChild(duplicatedItem)
      }
    })

    const scrollerInner = scrollerInnerRef.current
    const scrollingAnimation = scrollerInner.animate(
      [
        { transform: 'translateX(0)' },
        { transform: `translateX(-${scrollerContent[0].clientWidth}px)` },
      ],
      {
        duration: scrollerContent[0].clientWidth * speed,
        iterations: Infinity,
      }
    )

    return () => {
      scrollingAnimation.cancel()
    }
  }, [speed])

  return (
    <div
      ref={scrollerRef}
      className="max-w-[100vw] overflow-hidden bg-black py-8"
    >
      <div
        ref={scrollerInnerRef}
        className="flex min-w-full shrink-0 gap-8 py-4"
      >
        {services.map((service) => (
          <span
            key={service.id}
            className="flex-shrink-0 text-[24px] font-medium text-white"
          >
            {service.name}
          </span>
        ))}
      </div>
    </div>
  )
}
