import { Testimonial } from '@/domain/models/testimonial.model'
import { TestimonialDTO } from '@/infrastructure/dto/testimonial.dto'

export class TestimonialMapper {
  static toDomain(dto: TestimonialDTO): Testimonial {
    return {
      id: dto.id,
      name: dto.name,
      handle: dto.handle,
      quote: dto.quote,
      goal: dto.goal,
      image: dto.image,
      createdAt: new Date(dto.created_at),
    }
  }
}