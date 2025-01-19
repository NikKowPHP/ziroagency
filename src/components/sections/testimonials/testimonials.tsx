'use client'

import { useState } from 'react'
import { testimonialItems } from '@/lib/data/testimonials'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button/button'

export function Testimonials() {
  const [currentIndex] = useState(0)
  const t = useTranslations('testimonials')

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Image */}
          <div className="rounded-[32px] overflow-hidden">
            <Image
              src={testimonialItems[currentIndex].image}
              alt={testimonialItems[currentIndex].author}
              width={600}
              height={600}
              className="object-cover w-full h-full"
              priority
            />
          </div>

          {/* Right Column - Content */}
          <div className="bg-gray-50 rounded-[32px] p-12 flex flex-col justify-between">
            <div className="space-y-8">
              <p className="text-gray-900 text-lg leading-relaxed">
                &quot;{testimonialItems[currentIndex].quote}&quot;
              </p>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image 
                    src={testimonialItems[currentIndex].imagePerson} 
                    alt={testimonialItems[currentIndex].imageAlt} 
                    width={40} 
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-base text-gray-900">
                    {testimonialItems[currentIndex].author}
                  </span>
                  <span className="text-sm text-gray-500">
                    {testimonialItems[currentIndex].role}, {testimonialItems[currentIndex].company}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Consultation Section */}
        <div className="mt-6 bg-gray-50 rounded-[32px] p-12 sm:p-10 lg:p-12 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-6">
          <p className="text-gray-900 text-base sm:text-lg font-medium text-center sm:text-left max-w-[500px]">
            {t('alwaysOpen')}
          </p>
          <Button 
            variant='white' 
            size='lg' 
            href='https://calendly.com/ziro-nikhil/30min'
            className="whitespace-nowrap w-full sm:w-auto"
          >
            {t('bookCall')}
          </Button>
        </div>
      </div>
    </section>
  )
} 