'use client'

import { TestimonialItem } from '@/domain/models/testimonial.model'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { memo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { type Locale } from '@/i18n'
import { getTestimonials } from '@/lib/data/testimonials'
import { useTestimonials } from '@/hooks/use-testimonials'

interface TestimonialsProps {
  locale: Locale
}

const TestimonialList = memo(function TestimonialList({
  testimonials,
  locale
}: {
  testimonials: TestimonialItem[]
  locale: Locale
}) {
  return (
    <>
      {testimonials.map((testimonial: TestimonialItem) => (
        <div
          key={testimonial.id}
          className="flex-shrink-0 w-[300px] sm:w-[400px] bg-gray-100 rounded-[32px] p-6"
        >
          <div className="space-y-6">
            <p className="text-gray-900 text-lg leading-relaxed">
              {/* &quot;{t(`${testimonial.id}.quote`)}&quot; */}
              'these dudes are the best'
            </p>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={testimonial.image}
                  //   alt={t(`${testimonial.id}.imageAlt`)}
                  alt='testimonial'
                  width={48}
                  height={48}
                  className="object-cover h-full"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-500">
                  {/* {t(`${testimonial.id}.role`)},{' '} */}
                  'my role'
                  {/* {t(`${testimonial.id}.company`)} */}
                  'my company'
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
});

export async function Testimonials({ locale }: TestimonialsProps) {
  const t = useTranslations('testimonials')

  const testimonials = await getTestimonials(locale)
  const { containerRef, showLeftButton, showRightButton } = useTestimonials()

  const handleScrollButtonClick = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'right' ? 400 : -400;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative ">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center mb-10 sm:mb-12">

          <h2 className="text-3xl font-medium sm:text-4xl font-medium mb-4 sm:mb-8">
            {t('title')}
          </h2>
          <h3 className='text-gray-500 text-lg sm:text-xl'>
            {t('description')}
          </h3>
        </div>

        <div className="relative group">
          <div 
            ref={containerRef}
            className="flex overflow-x-auto pb-8 gap-6 scrollbar-hide relative"
          >
            <TestimonialList testimonials={testimonials} locale={locale} />
          </div>
          
         {/* Scroll fade Left */}
         {showLeftButton && (
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          )}

          {/* Scroll fade Right */}
          {showRightButton && (
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          )}
          
          {/* Navigation buttons */}
           {/* Navigation buttons */}
           {showLeftButton && (
            <button
              onClick={() => handleScrollButtonClick('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {showRightButton && (
            <button
              onClick={() => handleScrollButtonClick('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
