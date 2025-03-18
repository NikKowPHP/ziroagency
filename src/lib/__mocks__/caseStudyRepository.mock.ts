// src/lib/__mocks__/supabase.ts
import { CaseStudyDTO } from '@/infrastructure/dto/case-study.dto';

// Define mock case studies data for different locales
export const mockCaseStudyDTOs: CaseStudyDTO[] = [
  {
    id: '1',
    slug: 'case-study-1',
    title: 'Case Study One',
    description: 'Description for case study one.',
    tags: ['tag1', 'tag2'],
    images: [{ url: '/images/case-studies/gsense/gsense.avif', alt: 'Image 1' }],
    cta_text: 'View Case Study',
    cta_text_name: 'viewCaseStudy',
    cta_url: '/case-study-1',
    created_at: '2024-01-01T10:00:00.000Z',
    updated_at: '2024-01-02T10:00:00.000Z',
    order_index: 1,
  },
  {
    id: '2',
    slug: 'case-study-2',
    title: 'Case Study Two',
    description: 'Description for case study two.',
    tags: ['tag3', 'tag4'],
    images: [{ url: '/images/case-studies/gsense/gsense.avif', alt: 'Image 2' }],
    cta_text: 'Learn More',
    cta_text_name: 'learnMore',
    cta_url: '/case-study-2',
    created_at: '2024-01-05T10:00:00.000Z',
    updated_at: '2024-01-06T10:00:00.000Z',
    order_index: 2,
  },
];

// Mock Supabase client
