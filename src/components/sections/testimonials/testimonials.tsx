'use client'

import { TestimonialItem, testimonialItems } from '@/lib/data/testimonials'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function Testimonials() {
  const t = useTranslations('testimonials')

  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-medium mb-8 sm:mb-12">
          {t('title')}
        </h2>
        
        <div className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide">
          {testimonialItems.map((testimonial: TestimonialItem) => (
            <div 
              key={testimonial.id}
              className="flex-shrink-0 w-[300px] sm:w-[400px] bg-gray-100 rounded-[32px] p-6"
            >
              <div className="space-y-6">
                <p className="text-gray-900 text-lg leading-relaxed">
                  &quot;{t(`${testimonial.id}.quote`)}&quot;
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={t(`${testimonial.id}.imageAlt`)}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t(`${testimonial.id}.role`)}, {t(`${testimonial.id}.company`)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}