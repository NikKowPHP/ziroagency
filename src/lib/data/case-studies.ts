export interface CaseStudy {
  id: string
  title: string
  description: string
  tags: string[]
  images: {
    url: string
    alt: string
  }[]
  ctaText: string
  ctaUrl: string
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'gsense',
    title: 'gSense',
    description: 'gSense is a health platform which focuses on personalized health monitoring. It integrates various health metrics and devices to assist in managing chronic diseases.',
    tags: ['Branding', 'Saas', 'HealthTech'],
    images: [
      { url: '/images/case-studies/gsense/gsense.avif', alt: 'gSense branded bag' },
    //   { url: '/images/case-studies/gsense/letter.jpg', alt: 'gSense letterhead' },
    //   { url: '/images/case-studies/gsense/app.jpg', alt: 'gSense mobile app' },
    //   { url: '/images/case-studies/gsense/guidelines.jpg', alt: 'Brand guidelines' },
    //   { url: '/images/case-studies/gsense/mobile.jpg', alt: 'Mobile interface' },
    //   { url: '/images/case-studies/gsense/document.jpg', alt: 'Documentation' },
    //   { url: '/images/case-studies/gsense/card.jpg', alt: 'Business card' }
    ],
    ctaText: 'View Case Study',
    ctaUrl: '/work/gsense'
  }
]

export async function getCaseStudies(): Promise<CaseStudy[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return caseStudies
} 