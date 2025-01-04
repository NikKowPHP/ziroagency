import { type CaseStudy, getCaseStudies } from '@/lib/data/case-studies'
import { CaseStudyCard } from '@/components/ui/case-study/case-study-card'

async function getCaseStudiesData(): Promise<CaseStudy[]> {
  // Simulate API call
  const data = await getCaseStudies()
  return data
}

export async function CaseStudies() {
  const caseStudies = await getCaseStudiesData()

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="container relative mx-auto px-6">
        {caseStudies.map((caseStudy: CaseStudy) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </div>
    </section>
  )
}