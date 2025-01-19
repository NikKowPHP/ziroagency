import { getCaseStudyBySlug } from '@/lib/data/case-studies'
import { notFound } from 'next/navigation'
import { type Locale } from '@/i18n'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

interface CaseStudyPageProps {
  params: {
    slug: string
    locale: Locale
  }
}

// Loading component
function CaseStudyLoading() {
  return (
    <div className="bg-white pt-20 animate-pulse">
      <div className="container mx-auto pt-32 pb-16">
        <div className="max-w-[90rem] mx-auto">
          <div className="relative w-full aspect-[16/9] mb-16 bg-gray-200 rounded-lg" />
          <div className="grid lg:grid-cols-[2fr,1fr] gap-16">
            <div>
              <div className="h-12 bg-gray-200 rounded mb-8 w-3/4" />
              <div className="h-24 bg-gray-200 rounded" />
            </div>
            <div className="space-y-8">
              <div className="h-32 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Error component
function CaseStudyError() {
  return (
    <div className="bg-white pt-20">
      <div className="container mx-auto pt-32 pb-16 text-center">
        <h1 className="text-2xl font-medium text-gray-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-8">
          We couldn&apos;t load the case study. Please try again later.
        </p>
        <Link 
          href="/case-studies"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          Back to Case Studies
        </Link>
      </div>
    </div>
  )
}

// Main component
export default async function CaseStudyPage({ params: { slug, locale } }: CaseStudyPageProps) {
  return (
    <Suspense fallback={<CaseStudyLoading />}>
      <CaseStudyContent slug={slug} locale={locale} />
    </Suspense>
  )
}

// Content component
async function CaseStudyContent({ slug, locale }: { slug: string, locale: Locale }) {
  try {
    const caseStudy = await getCaseStudyBySlug(slug, locale)

    if (!caseStudy) {
      notFound()
    }

    const [heroImage, ...otherImages] = caseStudy.images

    // Format dates safely
    const formatDate = (dateString: string) => {
      try {
        return new Date(dateString).toLocaleDateString(locale, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      } catch (error) {
        console.error('Error formatting date:', error)
        return 'Date unavailable'
      }
    }

    return (
      <article className="bg-white pt-28 px-[10px]">
        {/* Hero Section */}
        <header className="container mx-auto pt-32 pb-16 ">
          <div className="max-w-[90rem] mx-auto">
            {/* Hero Image */}
            <div className="relative w-full aspect-[16/9] mb-16">
              <Image
                src={heroImage.url}
                alt={heroImage.alt}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>

            <div className="grid lg:grid-cols-[2fr,1fr] gap-16">
              <div>
                <h1 className="text-4xl md:text-6xl font-medium mb-8">
                  {caseStudy.title}
                </h1>
                <p className="text-xl text-gray-700">
                  {caseStudy.description}
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="font-medium text-lg mb-2">Tags:</h2>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="font-medium text-lg mb-4">Timeline:</h2>
                  <div className="space-y-2 text-gray-600">
                    <p>Created: {formatDate(caseStudy.createdAt as unknown as string)}</p>
                    <p>Updated: {formatDate(caseStudy.updatedAt as unknown as string)}</p>
                  </div>
                </div>

                <Link 
                  href={caseStudy.ctaUrl}
                  className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {caseStudy.ctaText} 
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Gallery Section */}
        {otherImages.length > 0 && (
          <section className="container mx-auto py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherImages.map((image, index) => (
                <div key={index} className="relative aspect-[4/3]">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    )
  } catch (error) {
    console.error('Error loading case study:', error)
    return <CaseStudyError />
  }
}
