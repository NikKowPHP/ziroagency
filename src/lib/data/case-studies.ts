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
  ctaTextName: string
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
    ctaTextName: 'viewCaseStudy',
    ctaUrl: '/work/gsense'
    },
    {
        id: 'supernormal',
        title: 'SuperNormal',
        description: 'SuperNormal is an innovative app concept designed specifically for "Rejuvenation Athletes," individuals dedicated to slowing biological aging and enhancing their overall well-being. This project aims to integrate various features that support users in their journey toward longevity through a user-friendly interface and community engagement.',
        tags: ['Mobile Application', 'HealthTech'],
        images: [
          { url: '/images/case-studies/supernormal/supernormal.avif', alt: 'SuperNormal app interface' },
        ],
        ctaText: 'View Case Study',
        ctaTextName: 'viewCaseStudy',
        ctaUrl: '/work/supernormal'
    },
   
]

export async function getCaseStudies(): Promise<CaseStudy[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return caseStudies
} 