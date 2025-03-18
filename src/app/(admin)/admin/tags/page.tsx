import { Suspense } from 'react'
import { getTagsAction } from '@/components/server-actions/tags-actions'
import { TagList } from '@/components/tags/tag-list'

export default async function CaseStudiesAdminPage() {

  const tags = await getTagsAction();

  return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-2xl font-bold mb-6">Case Studies Management</h2>
          <Suspense fallback={<div>Loading...</div>}>
            <TagList tags={tags} />
          </Suspense>
        </div>
      </div>
  )
}
