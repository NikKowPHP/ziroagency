import { Button } from '@/components/ui/button/button'
import { getPricingPlans, type PricingPlan } from '@/lib/data/pricing'

interface PricingCardProps {
  plan: PricingPlan
}

function PricingCard({ plan }: PricingCardProps) {
  return (
    <div className="flex flex-col bg-white rounded-[32px] p-8 space-y-6">
      <h3 className="text-[32px] font-medium">{plan.title}</h3>
      <p className="text-gray-600">{plan.description}</p>

      <div className="flex items-baseline gap-1">
        {plan.pricePrefix && (
          <span className="text-xl text-gray-600">{plan.pricePrefix}</span>
        )}
        <span className="text-[48px] font-medium">{plan.price}</span>
      </div>

      <Button
        size="lg"
        className="w-full rounded-full px-8 h-[56px] text-[16px] bg-[#0066FF] hover:bg-[#0066FF]/90"
      >
        {plan.ctaText}
      </Button>

      <ul className="space-y-4 pt-4">
        {plan.features.map((feature) => (
          <li key={feature.id} className="text-gray-600">
            {feature.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export async function Pricing() {
  const plans = await getPricingPlans()

  return (
    <section className="relative overflow-hidden bg-[#0066FF] py-24">
      <div className="container relative mx-auto px-6">
        <h2 className="text-center text-[56px] font-medium text-white mb-16">
          Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  )
}
