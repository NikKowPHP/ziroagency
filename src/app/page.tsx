import { Suspense } from 'react'
import { Button } from '@/components/ui/button/button'
import { CaseStudies } from '@/components/sections/case-studies/case-studies'
import { RunningTags } from '@/components/sections/running-tags/running-tags'
import { Pricing } from '@/components/sections/pricing/pricing'
import { Faq } from '@/components/sections/faq/faq'
import { services } from '@/lib/data/services'
import { HeroButtons } from '@/components/sections/hero/hero-buttons'

export default function HomePage() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-white">
      <div className="container relative mx-auto px-6">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[200px]">
              Loading...
            </div>
          }
        >
          <section className="flex flex-col items-center text-center pt-[160px] pb-[100px] space-y-8">
            <h1 className="text-[80px] leading-[1.1] font-medium tracking-[-0.02em] text-primary">
              Creating Brands
              <br />
              with care
            </h1>
            <p className="text-[24px] text-gray-900 leading-relaxed max-w-2xl">
              Partnering for Your Success Through Design
            </p>
            <HeroButtons />
          </section>
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px]" />}>
          <CaseStudies />
        </Suspense>

        <div className="py-20">
          <RunningTags services={services} />
        </div>

        <Suspense fallback={<div className="min-h-[400px]" />}>
          <Pricing />
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px]" />}>
          <Faq />
        </Suspense>
      </div>
    </div>
  )
}
