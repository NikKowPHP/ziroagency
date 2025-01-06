'use client'

import { Button } from '@/components/ui/button/button'
import { Tag } from '@/components/ui/tag/tag'
import { type CaseStudy } from '@/lib/data/case-studies'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const t = useTranslations('caseStudy')
  
  return (
    <div className="flex flex-col rounded-[24px] sm:rounded-[32px] border border-gray-200 p-6 sm:p-8 lg:p-10 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
        <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
          {/* Title */}
          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-medium tracking-[-0.02em] text-gray-900">
            {caseStudy.title}
          </h2>
          
          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
            {caseStudy.description}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {caseStudy.tags.map((tag) => (
              <Tag 
                key={tag} 
                variant="primary" 
                className="px-8 text-sm sm:text-base"
              >
                {tag}
              </Tag>
            ))}
          </div>
          
          {/* Desktop/Tablet CTA Button */}
          <div className="hidden pt-10 pr-[15px]  md:block  lg:block xl:block">
          <Button size="xl" href={caseStudy.ctaUrl} >{t(caseStudy.ctaTextName)}</Button>
        </div>
          {/* <div className="hidden md:block lg:block pt-6 sm:pt-8 lg:pt-10">
            <Button 
              size="xl" 
              href={caseStudy.ctaUrl}
              className="w-full sm:w-auto"
            >
              {t(caseStudy.ctaTextName)}
            </Button>
          </div> */}
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 auto-rows-[150px] sm:auto-rows-[180px] lg:auto-rows-[200px]">
          {caseStudy.images.slice(0, 7).map((image, index) => (
            <div
              key={image.url}
              className={cn(
                'relative rounded-xl sm:rounded-2xl overflow-hidden',
                index === 0 ? 'col-span-2 row-span-2' : ''
              )}
            >
              <Image
                src={image.url}
                alt={image.alt}
                loading="lazy"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile CTA Button */}
      <div className="md:hidden pt-10 sm:pt-10">
        <Button 
          size="xl" 
          href={caseStudy.ctaUrl}
          className="w-full"
        >
          {t(caseStudy.ctaTextName)}
        </Button>
      </div>
    </div>
  )
}
