import { ITestimonialsRepository } from "./testimoinals.repository.interface"
import { Testimonial } from "@/domain/models/testimonial.model"
export default class TestimonialsRepositoryMock implements ITestimonialsRepository {
    getTestimonials(): Promise<Testimonial[]> {
        return Promise.resolve([])
    }

    getTestimonialById(id: string): Promise<Testimonial> {
        return Promise.resolve(null)
    }

    createTestimonial(testimonial: Testimonial): Promise<Testimonial> {
        return Promise.resolve(null)
    }

    deleteTestimonial(id: string): Promise<void> {
        return Promise.resolve(null)
    }
}