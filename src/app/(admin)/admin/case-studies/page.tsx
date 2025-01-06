import { getCaseStudies } from '@/lib/data/case-studies'
import { CaseStudyList } from '@/app/admin/case-studies/case-study-list'
import { Suspense } from 'react'

export default async function CaseStudiesAdminPage() {
  const caseStudies = await getCaseStudies('en') // Default to English

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-2xl font-bold mb-6">Case Studies Management</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <CaseStudyList initialCaseStudies={caseStudies} />
        </Suspense>
      </div>
    </div>
  )
} 