'use server'

import { unstable_cache } from 'next/cache';
import { supabase } from '../supabase'
import { Locale } from '@/i18n'
import { TestimonialItem } from '@/domain/models/testimonial.model';
import { TestimonialDTO } from '@/infrastructure/dto/testimonial.dto';



// Define a DTO and Mapper if your Supabase data structure is different from TestimonialItem
// For simplicity, let's assume they are similar for now. Adjust as needed.
// type TestimonialDTO = TestimonialItem; // No longer a placeholder
const TestimonialMapper = { // Placeholder, adjust if needed
  toDomain: (dto: TestimonialDTO): TestimonialItem => ({ // Mapper now uses TestimonialDTO
    id: dto.id,
    author: dto.author,
    role: dto.role,
    company: dto.company,
    quote: dto.quote,
    image: dto.image,
    imageAlt: dto.imageAlt,
    // created_at and updated_at are DTO specific and not needed in Domain model
  }),
};


export const getTestimonials = unstable_cache(
  async (locale: Locale): Promise<TestimonialItem[]> => {
    const { data, error } = await supabase
      .from(`testimonials_${locale}`) // Use a table name specific to testimonials and locale
      .select('*')
      .order('created_at', { ascending: false }); // Assuming you have a 'created_at' column

    if (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
    console.log('getTestimonials data:', data); // Log the fetched data for debugging

    return (data as TestimonialDTO[]).map(TestimonialMapper.toDomain); // Data is now casted to TestimonialDTO[]
  },
  [`testimonials`], // Consider a more specific cache tag if needed, e.g., CACHE_TAGS.TESTIMONIALS if you define it
  {
    revalidate: 60 * 60, // 1 hour - adjust as needed, CACHE_TIMES.HOUR if you have it
    tags: [`testimonials`], //  Consider a more specific cache tag if needed, e.g., [CACHE_TAGS.TESTIMONIALS]
  }
);

export const getTestimonialById = async (id: string, locale: Locale): Promise<TestimonialItem | null> => {
  return unstable_cache(
    async () => {
      const { data, error } = await supabase
        .from(`testimonials_${locale}`)
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching testimonial by ID:', id, error)
        return null
      }

      return data ? TestimonialMapper.toDomain(data as TestimonialDTO) : null // Data is now casted to TestimonialDTO
    },
    [`testimonial-${id}-${locale}`], // Unique cache key per testimonial and locale
    {
      revalidate: 60 * 60 * 24, // 1 day revalidation for individual testimonials
      tags: [`testimonials`, `testimonial-${id}`], // Add specific tag for invalidation if needed
    }
  )()
}