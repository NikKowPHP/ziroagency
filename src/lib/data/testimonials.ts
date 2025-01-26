export interface TestimonialItem {
    id: string
    author: string
    role: string
    company: string
    quote: string
    image: string
    imageAlt: string
  }
  
  export const testimonialItems: TestimonialItem[] = [
    {
      id: 'client1',
      author: 'Mikita Kavaliou',
      role: 'testimonials.client1.role',
      company: 'testimonials.client1.company',
      quote: 'testimonials.client1.quote',
      image: 'https://i.postimg.cc/tTm7X37D/client2.avif',
      imageAlt: 'testimonials.client1.imageAlt'
    },
    {
        id: 'client2',
        author: 'Client Name',
        role: 'testimonials.client1.role',
        company: 'testimonials.client1.company',
        quote: 'testimonials.client1.quote',
        image: 'https://i.postimg.cc/tTm7X37D/client2.avif',
        imageAlt: 'testimonials.client1.imageAlt'
      },
      {
        id: 'client3',
        author: 'Client Name',
        role: 'testimonials.client1.role',
        company: 'testimonials.client1.company',
        quote: 'testimonials.client1.quote',
        image: 'https://i.postimg.cc/T1nrzdwP/BCJ9upw-V2-ARbexiidm-P5w0okz-LE.avif',
        imageAlt: 'testimonials.client1.imageAlt'
      },
      {
        id: 'client4',
        author: 'Client Name',
        role: 'testimonials.client1.role',
        company: 'testimonials.client1.company',
        quote: 'testimonials.client1.quote',
        image: 'https://i.postimg.cc/T1nrzdwP/BCJ9upw-V2-ARbexiidm-P5w0okz-LE.avif',
        imageAlt: 'testimonials.client1.imageAlt'
      },
      {
        id: 'client5',
        author: 'Client Name',
        role: 'testimonials.client1.role',
        company: 'testimonials.client1.company',
        quote: 'testimonials.client1.quote',
        image: 'https://i.postimg.cc/T1nrzdwP/BCJ9upw-V2-ARbexiidm-P5w0okz-LE.avif',
        imageAlt: 'testimonials.client1.imageAlt'
      },
    // Add more testimonials
  ]
  
  export async function getTestimonials(): Promise<TestimonialItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return testimonialItems
  }