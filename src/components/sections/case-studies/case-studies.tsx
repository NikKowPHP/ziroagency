
import { getCaseStudies } from '@/lib/data/case-studies'
import { CaseStudyCard } from '@/components/ui/case-study/case-study-card'
import { type Locale } from '@/i18n'
import { CaseStudy } from '@/domain/models/case-study.model'

interface CaseStudiesProps {
  locale: Locale
}

export async function CaseStudies({ locale }: CaseStudiesProps) {
  const caseStudies = await getCaseStudies(locale)
 

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
