export interface TestimonialItem {
  id: string
  author: string
  role: string
  company: string
  quote: string
  image: string
  imageAlt: string
  imagePerson: string
}

export const testimonialItems: TestimonialItem[] = [
  {
    id: 'nikhil',
    author: 'Nikhil Singh',
    role: 'testimonials.nikhil.role',
    company: 'testimonials.nikhil.company',
    quote: 'testimonials.nikhil.quote',
    image: 'https://i.postimg.cc/T1nrzdwP/BCJ9upw-V2-ARbexiidm-P5w0okz-LE.avif',
    imageAlt: 'testimonials.nikhil.imageAlt',
    imagePerson: 'https://i.postimg.cc/XJkjmtWb/morda.avif'
  },
  // Add more testimonials as needed
]

export async function getTestimonialItems(): Promise<TestimonialItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return testimonialItems
} 