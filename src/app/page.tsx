import { Suspense } from 'react'
import { Button } from '@/components/ui/button/button'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[200px]">
          Loading...
        </div>
      }>
        <section className="py-20 space-y-6 max-w-4xl">
          <h1 className="text-6xl font-bold tracking-tight">
            Pioneering Integrated Digital Health Solutions
          </h1>
          <p className="text-xl text-text-secondary">
            Designing User-Friendly Technology for Better Patient Experiences, from Apps to Devices
          </p>
          <div className="flex gap-4 pt-4">
            <Button size="lg">Book a call</Button>
            <Button variant="outline" size="lg">Learn more</Button>
          </div>
        </section>
      </Suspense>
    </div>
  )
}
