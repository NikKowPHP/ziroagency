import { ITestimonialsRepository } from "@/lib/repositories/testimoinals.repository.interface"
import { TestimonialsRepositoryMock } from "@/lib/repositories/testimoinals.repository.mock"
import { Testimonial } from "@/domain/models/testimonial.model"

 class TestimonialsService {
    private testimonialsRepository: ITestimonialsRepository

    constructor() {
        if(process.env.MOCK_REPOSITORIES) {
            this.testimonialsRepository = new TestimonialsRepositoryMock()
        } else {
            this.testimonialsRepository = new TestimonialsRepository()
        }
    }

    async getTestimonials(): Promise<Testimonial[]> {
        return this.testimonialsRepository.getTestimonials()
    }

    async getTestimonialById(id: string): Promise<Testimonial> {
        return this.testimonialsRepository.getTestimonialById(id)

    }

    async createTestimonial(testimonial: Testimonial): Promise<Testimonial> {
        return this.testimonialsRepository.createTestimonial(testimonial)
    }

    async updateTestimonial(id: string, testimonial: Testimonial): Promise<Testimonial> {
        return this.testimonialsRepository.updateTestimonial(id, testimonial)
    }

    async deleteTestimonial(id: string): Promise<void> {
        return this.testimonialsRepository.deleteTestimonial(id)
    }
}

export const testimonialService =  new TestimonialsService()