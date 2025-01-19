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
    role: 'Founder',
    company: 'M.Des, B.Arch',
    quote: "At Ziro, we're passionate about how design shapes brand value. We see design as the silent ambassador of a brand, creating connections that go beyond the ordinary. Our mission is to craft engaging experiences that resonate with people and build trust, ensuring every interaction leaves a meaningful impression.",
    image: 'https://i.postimg.cc/T1nrzdwP/BCJ9upw-V2-ARbexiidm-P5w0okz-LE.avif',
    imageAlt: 'Nikhil Singh',
    imagePerson: 'https://i.postimg.cc/XJkjmtWb/morda.avif'


  },
  // Add more testimonials as needed
]

export async function getTestimonialItems(): Promise<TestimonialItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return testimonialItems
} 