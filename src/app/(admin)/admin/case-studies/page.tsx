import { CaseStudyList } from './case-study-list'
import { Suspense } from 'react'
import { getCaseStudiesAction } from '@/components/server-actions/case_study-actions'

export default async function CaseStudiesAdminPage() {
  const [enCaseStudies, plCaseStudies] = await Promise.all([
    getCaseStudiesAction('en'),
    getCaseStudiesAction('pl')
  ])

  return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold mb-6">Case Studies Management</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <CaseStudyList caseStudies={{ en: enCaseStudies, pl: plCaseStudies }} />
          </Suspense>
        </div>
      </div>
  )
}
