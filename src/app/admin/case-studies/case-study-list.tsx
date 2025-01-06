'use client'

import { useState } from 'react'
import { CaseStudy } from '@/domain/models/case-study.model'
import { supabase } from '@/lib/supabase'

interface CaseStudyListProps {
  initialCaseStudies: CaseStudy[]
}

export function CaseStudyList({ initialCaseStudies }: CaseStudyListProps) {
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies)

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this case study?')) {
      const { error } = await supabase
        .from('case_studies_en')
        .delete()
        .eq('id', id)

      if (!error) {
        setCaseStudies(caseStudies.filter(study => study.id !== id))
      }
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {caseStudies.map((study) => (
            <tr key={study.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {study.title}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-500 line-clamp-2">
                  {study.description}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => handleDelete(study.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 