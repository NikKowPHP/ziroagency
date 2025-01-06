import { Suspense } from 'react'
// import { CaseStudies } from '@/components/sections/case-studies/case-studies'
// import { RunningTags } from '@/components/sections/running-tags/running-tags'
// import { Pricing } from '@/components/sections/pricing/pricing'
// import { Faq } from '@/components/sections/faq/faq'
import { services } from '@/lib/data/services'
import { HeroButtons } from '@/components/sections/hero/hero-buttons'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'

// Dynamic imports with loading boundaries
const CaseStudies = dynamic(
  () => import('@/components/sections/case-studies/case-studies').then(mod => mod.CaseStudies),
  {
    loading: () => <div className="min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]" />,
    ssr: true
  }
)
const RunningTags = dynamic(
  () => import('@/components/sections/running-tags/running-tags').then(mod => mod.RunningTags),
  { ssr: true }
)

const Pricing = dynamic(
  () => import('@/components/sections/pricing/pricing').then(mod => mod.Pricing),
  {
    loading: () => <div className="min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]" />,
    ssr: true
  }
)

const Faq = dynamic(
  () => import('@/components/sections/faq/faq').then(mod => mod.Faq),
  {
    loading: () => <div className="min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]" />,
    ssr: true
  }
)

export const metadata: Metadata = {
  title: 'Professional Web Design & Development Services | ZIRO',
  description: 'Transform your digital presence with our expert web design and development services. Custom websites, responsive design, and modern web solutions.',
  alternates: {
    canonical: 'https://ziro.agency',
  },
  openGraph: {
    title: 'Expert Web Design & Development | ZIRO',
    description: 'Custom web solutions for modern businesses',
  }
}

export default function HomePage() {
  const t = useTranslations('hero')

  return (
    <div className="relative overflow-hidden min-h-screen bg-white">
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[200px]">
              Loading...
            </div>
          }
        >
          <section className="flex flex-col items-center text-center pt-[180px] sm:pt-[180px] lg:pt-[160px] pb-[60px] sm:pb-[80px] lg:pb-[100px] space-y-6 sm:space-y-8"
            itemScope
            itemType="https://schema.org/WebPageElement"
          >
            <h1 className="text-[40px] sm:text-[56px] lg:text-[80px] leading-[1.1] font-medium tracking-[-0.02em] text-primary"
              itemProp="headline"
            >
              {t('title1')}
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              {t('title2')}
            </h1>
            <p className="text-[18px] sm:text-[20px] lg:text-[24px] text-gray-900 leading-relaxed max-w-xl sm:max-w-2xl px-4 sm:px-0">
              {t('subtitle')}
            </p>
            <HeroButtons />
          </section>
        </Suspense>

        <Suspense 
          fallback={
            <div className="min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]" />
          }
        >
          <CaseStudies />
        </Suspense>

        <div className="py-12 sm:py-16 lg:py-20">
          <RunningTags services={services} />
        </div>

        <Suspense 
          fallback={
            <div className="min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]" />
          }
        >
          <Pricing />
        </Suspense>

        <Suspense 
          fallback={
            <div className="min-h-[300px] sm:min-h-[350px] lg:min-h-[400px]" />
          }
        >
          <Faq />
        </Suspense>
      </div>
    </div>
  )
}