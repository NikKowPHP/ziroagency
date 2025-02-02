import { Suspense, memo } from 'react';
// import { getCaseStudies } from '@/lib/data/case-studies'
import { CaseStudyCard } from '@/components/ui/case-study/case-study-card'
import { type Locale } from '@/i18n'
import { CaseStudy } from '@/domain/models/case-study.model'
import { CaseStudiesLoader } from '@/components/sections/case-studies/case-studies-loader'
import { caseStudyService } from '@/lib/services/caseStudy.service';

import dynamic from "next/dynamic";

interface CaseStudiesProps {
  locale: Locale
}

// const CaseStudyList = memo(function CaseStudyList({ 
//   caseStudies,
//   locale
// }: { 
//   caseStudies: CaseStudy[] 
//   locale: Locale
// }) {
//   return (
//     <div className="md:container relative mx-auto  flex flex-col gap-16">
//       {caseStudies.map((caseStudy) => (
//         <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} locale={locale} />
//       ))}
//     </div>
//   );
// });

const CaseStudiesInteractive = dynamic(
  () => import("./case-studies-interactive").then(mod => mod.CaseStudiesInteractive),
  { ssr: true }
);

interface CaseStudiesProps {
  locale: Locale;
}

export async function CaseStudies({ locale }: CaseStudiesProps) {
  const caseStudies = await caseStudyService.getCaseStudies(locale)
 

  return (
    <section id="work" className="relative overflow-hidden bg-white">
      <Suspense fallback={<CaseStudiesLoader />}>
        <CaseStudiesInteractive caseStudies={caseStudies} locale={locale} />
      </Suspense>
    </section>
  )
}
