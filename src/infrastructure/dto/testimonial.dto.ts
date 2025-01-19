export interface TestimonialDTO {
  id: string;
  name: string;
  handle: string;
  quote: string;
  goal: string;
  image: {
    url: string;
    alt: string;
  };
  created_at: string;
} 