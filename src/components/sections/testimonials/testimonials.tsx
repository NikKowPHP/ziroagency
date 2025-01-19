'use client'

import { useState } from 'react'
import { testimonialItems } from '@/lib/data/testimonials'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function Testimonials() {
  const [currentIndex] = useState(0)
  const t = useTranslations('testimonials')

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image Column */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[600px] rounded-3xl overflow-hidden">
            <Image
              src={testimonialItems[currentIndex].image}
              alt={testimonialItems[currentIndex].author}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content Column */}
          <div className="flex flex-col space-y-6">
            <blockquote className="text-[20px] sm:text-[24px] lg:text-[28px] leading-relaxed text-gray-900">
              &quot;{testimonialItems[currentIndex].quote}&quot;
            </blockquote>
            
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <span className="font-medium text-lg">
                  {testimonialItems[currentIndex].author}
                </span>
                <span className="text-gray-600">
                  {testimonialItems[currentIndex].role}, {testimonialItems[currentIndex].company}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <button className="bg-white text-black px-6 py-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
                {t('bookCall')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 