import { TestimonialItem } from "../data/testimonials"
import { ITestimonialsRepository } from "./testimoinals.repository.interface"
import { Testimonial } from "@/domain/models/testimonial.model"

export class TestimonialsRepositoryMock implements ITestimonialsRepository {
    getTestimonials(): Promise<Testimonial[]> {
        return Promise.resolve(testimonialItems.find(t => t.id === id))
    }

    getTestimonialById(id: string): Promise<Testimonial> {
        const testimonial = testimonialItems.find(t => t.id === id)
        if (!testimonial) {
            throw new Error('Testimonial not found')
        }
        return Promise.resolve(testimonial)
    }

    createTestimonial(testimonial: Testimonial): Promise<Testimonial> {
        return Promise.resolve(testimonial)
    }

    deleteTestimonial(id: string): Promise<void> {
        return Promise.resolve(null)
    }
    updateTestimonial(testimonial: Testimonial): Promise<Testimonial> {
        return Promise.resolve(null)
    }
}



  export const testimonialItems: TestimonialItem[] = [

    {
        id: 'client2',
        author: 'Skand',
        role: 'testimonials.client1.role',
        company: 'testimonials.client1.company',
        quote: 'testimonials.client1.quote',
        image: '/images/client1.webp',
        imageAlt: 'testimonials.client1.imageAlt'
      },
      {
        id: 'client3',
        author: 'Vipul',
        role: 'testimonials.client1.role',
        company: 'testimonials.client1.company',
        quote: 'testimonials.client1.quote',
        image: '/images/client1.webp',
        imageAlt: 'testimonials.client1.imageAlt'
      },
      {
        id: 'client4',
        author: 'Ginny',
        role: 'testimonials.client1.role',
        company: 'testimonials.client1.company',
        quote: 'testimonials.client1.quote',
        image: '/images/client1.webp',
        imageAlt: 'testimonials.client1.imageAlt'
      },
      {
        id: 'client5',
        author: 'Skand',
        role: 'testimonials.client1.role',
        company: 'testimonials.client1.company',
        quote: 'testimonials.client1.quote',
        image: '/images/client1.webp',
        imageAlt: 'testimonials.client1.imageAlt'
      },
    // Add more testimonials
  ]