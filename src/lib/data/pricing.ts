export interface PricingFeature {
  id: string
  name: string
}

export interface PricingPlan {
  id: string
  title: string
  description: string
  price: string
  pricePrefix?: string
  features: PricingFeature[]
  ctaText: string
  ctaUrl: string
  deliveryTime?: string
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'one-page',
    title: 'One-Page Solution',
    description: 'Streamlined, Engaging, and Effective Designs for Maximum Impact in a Single Scroll!',
    price: '990 PLN',
    features: [
      { id: '1', name: 'Average 2-3 days delivery' },
      { id: '2', name: 'User-Centric Design' },
      { id: '3', name: 'Responsive and Mobile-friendly' },
      { id: '4', name: 'Fast-loading Speeds' },
      { id: '5', name: 'Clear Messaging' },
      { id: '6', name: 'Cost-Effective Solutions' },
      { id: '7', name: 'Comprehensive Solutions' },
      { id: '8', name: 'Maintenance Support' },
    ],
    ctaText: 'Book a call',
    ctaUrl: '/contact'
  },
  {
    id: 'multi-page',
    title: 'Multi-Page Solution',
    description: 'Unlock the power of multi-page design for a seamless, engaging user experience that drives results!',
    price: '1990 PLN',
    pricePrefix: 'from',
    features: [
      { id: '1', name: 'User-Centric Design' },
      { id: '2', name: 'Responsive and Mobile-friendly' },
      { id: '3', name: 'Fast-loading Speeds' },
      { id: '4', name: 'Fast-loading Speeds' },
      { id: '5', name: 'Cost-Effective Solutions' },
      { id: '6', name: 'Comprehensive Solutions' },
      { id: '7', name: 'Maintenance Support' },
      { id: '8', name: 'Custom Support' },
    ],
    ctaText: 'Book a call',
    ctaUrl: '/contact'
  }
]

export async function getPricingPlans(): Promise<PricingPlan[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return pricingPlans
} 