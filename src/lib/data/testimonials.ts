export interface TestimonialItem {
    id: string
    author: string
    role: string
    company: string
    quote: string
    image: string
    imageAlt: string
  }
  
  
  export async function getTestimonials(): Promise<TestimonialItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return testimonialItems
  }