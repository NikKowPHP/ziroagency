export interface CaseStudyDTO {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: {
    url: string;
    alt: string;
  }[];
  cta_text: string;
  cta_text_name: string;
  cta_url: string;
  created_at: string;
  updated_at: string;
} 