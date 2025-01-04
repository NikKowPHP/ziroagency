'use client'

import { Button } from '@/components/ui/button/button'
import { type CaseStudy } from '@/lib/data/case-studies'
import { cn } from '@/lib/utils/cn'
import Image from 'next/image'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 py-32">
      <div className="flex flex-col justify-center space-y-8">
        <h2 className="text-[48px] font-medium tracking-[-0.02em] text-gray-900">
          {caseStudy.title}
        </h2>
        <p className="text-xl text-gray-600 leading-relaxed">
          {caseStudy.description}
        </p>
        <div className="flex gap-3">
          {caseStudy.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full border border-[#0066FF] px-4 py-2 text-sm text-[#0066FF]"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="pt-4">
          <Button
            size="lg"
            className="rounded-full px-8 h-[56px] text-[16px] bg-[#0066FF] hover:bg-[#0066FF]/90"
          >
            {caseStudy.ctaText}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 auto-rows-[200px]">
        {caseStudy.images.slice(0, 7).map((image, index) => (
          <div
            key={image.url}
            className={cn(
              'relative rounded-2xl overflow-hidden',
              index === 0 ? 'col-span-2 row-span-2' : ''
            )}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
