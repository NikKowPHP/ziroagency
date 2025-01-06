'use client'

import { memo } from 'react'
import { Button } from '@/components/ui/button/button'
import { Tag } from '@/components/ui/tag/tag'
import { type CaseStudy } from '@/lib/data/case-studies'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

// Separate image component for better performance
const CaseStudyImage = memo(function CaseStudyImage({ 
  url, 
  alt, 
  isFirst 
}: { 
  url: string
  alt: string
  isFirst: boolean 
}) {
  return (
    <div
      className={cn(
        'relative rounded-xl sm:rounded-2xl overflow-hidden',
        isFirst ? 'col-span-2 row-span-2' : ''
      )}
    >
      <Image
        src={url}
        alt={alt}
        loading={isFirst ? "eager" : "lazy"}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={isFirst}
        quality={isFirst ? 100 : 75}
      />
    </div>
  )
})

// Separate tags component to prevent unnecessary re-renders
const CaseStudyTags = memo(function CaseStudyTags({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {tags.map((tag) => (
        <Tag 
          key={tag} 
          variant="primary" 
          className="px-8 text-sm sm:text-base"
        >
          {tag}
        </Tag>
      ))}
    </div>
  )
})

// Main component with performance optimizations
export const CaseStudyCard = memo(function CaseStudyCard({ 
  caseStudy 
}: CaseStudyCardProps) {
  const t = useTranslations('caseStudy')
  
  return (
    <article className="flex flex-col rounded-[24px] sm:rounded-[32px] border border-gray-200 p-6 sm:p-8 lg:p-10 shadow-sm">
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
          <CaseStudyTags tags={caseStudy.tags} />
          
          {/* Desktop/Tablet CTA Button */}
          <div className="hidden pt-10 pr-[15px] md:block">
            <Button 
              size="xl" 
              href={caseStudy.ctaUrl}
            >
              {t(caseStudy.ctaTextName)}
            </Button>
          </div>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 auto-rows-[150px] sm:auto-rows-[180px] lg:auto-rows-[200px]">
          {caseStudy.images.slice(0, 7).map((image, index) => (
            <CaseStudyImage
              key={image.url}
              url={image.url}
              alt={image.alt}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>

      {/* Mobile CTA Button */}
      <div className="md:hidden pt-10">
        <Button 
          size="xl" 
          href={caseStudy.ctaUrl}
          className="w-full"
        >
          {t(caseStudy.ctaTextName)}
        </Button>
      </div>
    </article>
  )
})

// Add display name for better debugging
CaseStudyCard.displayName = 'CaseStudyCard'
