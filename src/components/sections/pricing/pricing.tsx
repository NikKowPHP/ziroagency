'use client'

import { Button } from '@/components/ui/button/button'
import { getPricingPlans, type PricingPlan } from '@/lib/data/pricing'
import { useTranslations } from 'next-intl'

interface PricingCardProps {
  plan: PricingPlan
}

export function PricingCard({ plan }: PricingCardProps) {
  const t = useTranslations('pricing')

  return (
    <div className="flex flex-col items-center p-10 bg-white rounded-[32px] space-y-6">
      <h3 className="text-[32px] font-medium">{t(plan.title)}</h3>
      <p className="text-gray-600 text-center">{t(plan.description)}</p>

      <div className="flex items-baseline gap-1">
        {plan.pricePrefix && (
          <span className="text-xl text-gray-600">{t(plan.pricePrefix)}</span>
        )}
        <span className="text-[48px] font-medium">{plan.price}</span>
      </div>

      <Button
        size="lg"
        className="rounded-full px-28 h-[56px] text-[16px] bg-[#0066FF] hover:bg-[#0066FF]/90"
      >
        {t(plan.ctaText)}
      </Button>

      <ul className="space-y-4 pt-4">
        {plan.features.map((feature) => (
          <li key={feature.id} className="text-gray-600">
            {t(feature.name)}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Create a client component for rendering
function PricingContent({ plans }: { plans: PricingPlan[] }) {
  const t = useTranslations('pricing')

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#0066FF] py-24 rounded-[32px]">
      <div className="container relative mx-auto px-6">
        <h2 className="text-center text-[56px] font-medium text-white mb-16">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto pb-10">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Create a server component for data fetching
export async function Pricing() {
  const plans = await getPricingPlans()
  
  return <PricingContent plans={plans} />
}
