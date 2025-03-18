export interface Tag {
  id: string;
  name: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}


export interface Image {
  url: string;
  alt: string;
}

export interface CaseStudy {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly images: readonly Image[];
  readonly cta_text: string;
  readonly cta_text_name: string;
  readonly cta_url: string;
  readonly order_index: number;
  readonly created_at: Date;
  readonly updated_at: Date;
}

export interface CaseStudyWithTags extends Omit<CaseStudy, 'tags'> {
  tags: Tag[];
} 