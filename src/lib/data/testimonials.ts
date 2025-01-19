import { unstable_cache } from 'next/cache';
import { Locale } from '@/i18n'
import { Testimonial } from '@/domain/models/testimonial.model'
import { TestimonialDTO } from '@/infrastructure/dto/testimonial.dto'
import { TestimonialMapper } from '@/infrastructure/mappers/testimonial.mapper'
import { CACHE_TAGS, CACHE_TIMES } from '@/lib/utils/cache'

const mockTestimonials: Record<Locale, TestimonialDTO[]> = {
  en: [
    {
      id: '1',
      name: 'Jenny',
      handle: '@jennymcines',
      quote: 'I like the use of red light simply to recalibrate my circadian rhythm.',
      goal: 'Wanted to improve her energy levels',
      image: {
        url: 'https://i.postimg.cc/Dmwyh6gM/1.jpg',
        alt: 'Jenny using red light therapy'
      },
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Sam',
      handle: '@inspired.wong',
      quote: 'I keep my Luminousred Model 1 by my bed and use it night and morning. Overtime, I see my skin tone improving. I also use it for sun recovery.',
      goal: 'Looked for better sleep',
      image: {
        url: 'https://i.postimg.cc/Lg5HV45p/2.jpg',
        alt: 'Sam using red light therapy'
      },
      created_at: new Date().toISOString()
    }
  ],
  pl: [
    {
      id: '1',
      name: 'Jenny',
      handle: '@jennymcines',
      quote: 'Me gusta usar la luz roja simplemente para recalibrar mi ritmo circadiano.',
      goal: 'Quería mejorar sus niveles de energía',
      image: {
        url: '/images/testimonials/jenny.jpg',
        alt: 'Jenny usando terapia de luz roja'
      },
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Sam',
      handle: '@inspired.wong',
      quote: 'Mantengo mi Luminousred Model 1 junto a mi cama y lo uso por la noche y por la mañana. Con el tiempo, veo que mi tono de piel mejora. También lo uso para la recuperación solar.',
      goal: 'Buscaba dormir mejor',
      image: {
        url: '/images/testimonials/sam.jpg',
        alt: 'Sam usando terapia de luz roja'
      },
      created_at: new Date().toISOString()
    }
  ]
}

export const getTestimonials = unstable_cache(
  async (locale: Locale): Promise<Testimonial[]> => {
    // Mock database fetch with locale-specific data
    const data = mockTestimonials[locale] || mockTestimonials.en;
    return data.map(TestimonialMapper.toDomain)
  },
  [CACHE_TAGS.TESTIMONIALS],
  {
    revalidate: CACHE_TIMES.HOUR,
    tags: [CACHE_TAGS.TESTIMONIALS]
  }
) 