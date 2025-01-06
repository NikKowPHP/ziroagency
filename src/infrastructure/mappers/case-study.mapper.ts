import { CaseStudy } from '@/domain/models/case-study.model';
import { CaseStudyDTO } from '../dto/case-study.dto';

export class CaseStudyMapper {
  static toDomain(dto: CaseStudyDTO): CaseStudy {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      tags: [...dto.tags],
      images: dto.images.map(image => ({
        url: image.url,
        alt: image.alt,
      })),
      ctaText: dto.cta_text,
      ctaTextName: dto.cta_text_name,
      ctaUrl: dto.cta_url,
      createdAt: new Date(dto.created_at),
      updatedAt: new Date(dto.updated_at),
    };
  }
} 