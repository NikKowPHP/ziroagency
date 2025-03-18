import { Suspense } from 'react';
import { type Locale } from '@/i18n'
import { CaseStudiesLoader } from '@/components/sections/case-studies/case-studies-loader'

import dynamic from "next/dynamic";
import { getCaseStudiesAction } from '@/components/server-actions/case_study-actions';

interface CaseStudiesProps {
  locale: Locale
}


const CaseStudiesInteractive = dynamic(
  () => import("./case-studies-interactive").then(mod => mod.CaseStudiesInteractive),
  { ssr: true }
);

interface CaseStudiesProps {
  locale: Locale;
}

export async function CaseStudies({ locale }: CaseStudiesProps) {
  const caseStudies = await getCaseStudiesAction(locale)
  console.log('caseStudies', caseStudies)
 

  return (
    <section id="work" className="relative overflow-hidden bg-white ">
      <Suspense fallback={<CaseStudiesLoader />}>
        <CaseStudiesInteractive caseStudies={caseStudies} locale={locale} />
      </Suspense>
    </section>
  )
}
