import { getCaseStudyBySlug } from '@/lib/data/case-studies'
import { notFound } from 'next/navigation'
import { type Locale } from '@/i18n'
import Image from 'next/image'
import Link from 'next/link'

interface CaseStudyPageProps {
  params: {
    slug: string
    locale: Locale
  }
}

export default async function CaseStudyPage({ params: { slug, locale } }: CaseStudyPageProps) {
  const caseStudy = await getCaseStudyBySlug(slug, locale)

  if (!caseStudy) {
    notFound()
  }

  const [heroImage, ...otherImages] = caseStudy.images

  return (
    <article className="bg-white">
      {/* Hero Section */}
      <header className="container mx-auto pt-32 pb-16">
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
                  <p>Created: {caseStudy.createdAt.toLocaleDateString()}</p>
                  <p>Updated: {caseStudy.updatedAt.toLocaleDateString()}</p>
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
}
