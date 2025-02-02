import { Testimonial } from "../../domain/models/testimonial.model"

export interface ITestimonialsRepository {
    getTestimonials(): Promise<Testimonial[]>
    getTestimonialById(id: string): Promise<Testimonial>
    createTestimonial(testimonial: Testimonial): Promise<Testimonial>
    deleteTestimonial(id: string): Promise<void>
}