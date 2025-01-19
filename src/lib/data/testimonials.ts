export interface TestimonialItem {
  id: string
  author: string
  role: string
  company: string
  quote: string
  image: string
}

export const testimonialItems: TestimonialItem[] = [
  {
    id: 'nikhil',
    author: 'Nikhil Singh',
    role: 'Founder',
    company: 'M.Des, B.Arch',
    quote: "At Ziro, we're passionate about how design shapes brand value. We see design as the silent ambassador of a brand, creating connections that go beyond the ordinary. Our mission is to craft engaging experiences that resonate with people and build trust, ensuring every interaction leaves a meaningful impression.",
    image: '/images/testimonials/nikhil.jpg'
  },
  // Add more testimonials as needed
]

export async function getTestimonialItems(): Promise<TestimonialItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return testimonialItems
} 