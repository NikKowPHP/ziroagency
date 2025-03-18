
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
  readonly ctaText: string;
  readonly ctaTextName: string;
  readonly ctaUrl: string;
  readonly orderIndex: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
} 