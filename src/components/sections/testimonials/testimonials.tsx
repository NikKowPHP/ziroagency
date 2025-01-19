import {  memo } from 'react';
import { getTestimonials } from '@/lib/data/testimonials'
import { type Locale } from '@/i18n'
import { Testimonial } from '@/domain/models/testimonial.model'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface TestimonialsProps {
  locale: Locale
}

const TestimonialCard = memo(function TestimonialCard({ 
  testimonial 
}: { 
  testimonial: Testimonial 
}) {
  return (
    <div className="flex flex-col items-center text-center px-6">
      <div className="relative w-[200px] h-[200px] mb-6">
        <Image
          src={testimonial.image.url}
          alt={testimonial.image.alt}
          fill
          className="object-cover rounded-2xl"
          sizes="200px"
        />
      </div>
      <blockquote className="text-lg sm:text-xl mb-4">
        &quot;{testimonial.quote}&quot;
      </blockquote>
      <div className="mt-auto">
        <div className="font-medium">{testimonial.name}</div>
        <div className="text-sm text-gray-600 flex flex-col gap-1">
          <span>{testimonial.handle}</span>
          <span>{testimonial.goal}</span>
        </div>
      </div>
    </div>
  )
})

const TestimonialList = memo(function TestimonialList({ 
  testimonials 
}: { 
  testimonials: Testimonial[] 
}) {
  const t = useTranslations()
  
  return (
    <div className="container mx-auto px-4 sm:px-6">
      <h2 className="text-center text-[32px] sm:text-[40px] lg:text-[48px] font-medium mb-12 sm:mb-16">
        {t('testimonials.title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  )
})

export async function Testimonials({ locale }: TestimonialsProps) {
  const testimonials = await getTestimonials(locale)

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <TestimonialList testimonials={testimonials} />
    </section>
  )
}