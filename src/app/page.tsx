import { Suspense } from 'react'
import { Button } from '@/components/ui/button/button'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[200px]">
          Loading...
        </div>
      }>
        <section className="space-y-6">
          <h1 className="text-4xl font-bold">Welcome to Ziro Health</h1>
          <p className="text-lg text-text-secondary">
            Modern healthcare platform for modern practices
          </p>
          <div className="flex gap-4">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </section>
      </Suspense>
    </div>
  )
}
