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

  static toPersistence(domain: Partial<CaseStudy>): Partial<CaseStudyDTO> {
    const id = domain.id || (domain.title ? 
      domain.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        + '-' + Date.now()
      : undefined)

    return {
      id,
      title: domain.title,
      description: domain.description,
      tags: domain.tags ? [...domain.tags] : undefined,
      images: domain.images?.map(image => ({
        url: image.url,
        alt: image.alt,
      })),
      cta_text: domain.ctaText,
      cta_text_name: domain.ctaTextName,
      cta_url: domain.ctaUrl,
    }
  }
} 