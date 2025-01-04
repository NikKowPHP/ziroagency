import { type CaseStudy, caseStudies } from '@/lib/data/case-studies'
import { CaseStudyCard } from '@/components/ui/case-study/case-study-card'

export async function CaseStudies() {
  return (
    <section id="work" className="relative overflow-hidden bg-white">
      <div className="container relative mx-auto lg:px-6 flex flex-col gap-16">
        {caseStudies.map((caseStudy: CaseStudy) => (
          <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
        ))}
      </div>
    </section>
  )
}
