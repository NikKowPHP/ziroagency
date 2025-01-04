import { Suspense } from 'react'
import { Button } from '@/components/ui/button/button'
import { CaseStudies } from '@/components/sections/case-studies/case-studies'

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
            <h1 className="text-[80px] leading-[1.1] font-medium tracking-[-0.02em]">
              Creating Brands
              <br />
              with care
            </h1>
            <p className="text-[24px] text-gray-900 leading-relaxed max-w-2xl">
              Partnering for Your Success Through Design
            </p>
            <div className="flex gap-4 pt-8">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 h-[56px] text-[16px] border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF]/5"
              >
                View pricing
              </Button>
              <Button
                size="lg"
                className="rounded-full px-8 h-[56px] text-[16px] bg-[#0066FF] hover:bg-[#0066FF]/90"
              >
                Book a call
              </Button>
            </div>
          </section>
        </Suspense>

        <Suspense fallback={<div className="min-h-[400px]" />}>
          <CaseStudies />
        </Suspense>
      </div>
    </div>
  )
}
