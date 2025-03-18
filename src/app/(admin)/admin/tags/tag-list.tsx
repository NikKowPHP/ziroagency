'use client'

import { useEffect, useState } from 'react'
import { Tag } from '@/domain/models/models'
import { TagForm } from './components/tag-form'
import {
  createTagAction,
  updateTagAction,
  deleteTagAction,
  getTagsAction
} from '@/components/server-actions/tags-actions'
import { toast } from 'react-hot-toast'

export function TagList({ tags: initialTags }: { tags: Tag[] }) {
  const [tagList, setTagList] = useState<Tag[]>(initialTags)
  const [editingTag, setEditingTag] = useState<Tag | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Optionally, refresh list on mount or after changes – assumes getTagsAction is callable.
  useEffect(() => {
    async function refreshTags() {
      try {
        setLoading(true)
        const allTags = await getTagsAction()
        setTagList(allTags)
        setLoading(false)
      } catch (err: any) {
        setError(err.message || 'Failed to load tags')
        setLoading(false)
      }
    }
    refreshTags()
  }, [])

  const handleCreate = async (data: Partial<Tag>) => {
    try {
      setLoading(true)
      const newTag = await createTagAction(data as Omit<Tag, 'id'>)
      setTagList((prev) => [...prev, newTag])
      setIsCreating(false)
      setLoading(false)
      toast.success('Tag created successfully')
    } catch (error) {
      console.error('Failed to create tag:', error)
      setError('Failed to create tag')
      toast.error('Failed to create tag')
      setLoading(false)
    }
  }

  const handleUpdate = async (data: Partial<Tag>) => {
    if (!editingTag) return
    try {
      setLoading(true)
      const updatedTag = await updateTagAction({ ...editingTag, ...data })
      if (updatedTag) {
        setTagList((prev) => prev.map((tag) => (tag.id === editingTag.id ? updatedTag : tag)))
        toast.success('Tag updated successfully')
      }
      setEditingTag(null)
      setLoading(false)
    } catch (error) {
      console.error('Failed to update tag:', error)
      setError('Failed to update tag')
      toast.error('Failed to update tag')
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if(!id) throw new Error('Tag id is required')
    if (confirm('Are you sure you want to delete this tag?')) {
      try {
        setLoading(true)
        const success = await deleteTagAction(id)
        if (success) {
          setTagList((prev) => prev.filter((tag) => tag.id !== id))
          toast.success('Tag deleted successfully')
        }
        setLoading(false)
      } catch (error) {
        console.error('Failed to delete tag:', error)
        setError('Failed to delete tag')
        toast.error('Failed to delete tag')
        setLoading(false)
      }
    }
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-primary">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tags</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="px-6 py-3 text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
          disabled={loading}
        >
          Add Tag
        </button>
      </div>

      {(isCreating || editingTag) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-primary p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-[32px] font-medium tracking-[-0.02em] text-gray-900 mb-8">
              {editingTag ? 'Edit Tag' : 'New Tag'}
            </h3>
            <TagForm
              tag={editingTag ?? undefined}
              onSubmit={editingTag ? handleUpdate : handleCreate}
              onCancel={() => {
                setEditingTag(null)
                setIsCreating(false)
              }}
              loading={loading}
            />
          </div>
        </div>
      )}

      <div className="overflow-hidden bg-white rounded-primary shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tagList.map((tag) => (
              <tr key={tag.id} className={loading ? 'opacity-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {tag.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {tag.image_url ? (
                    <img src={tag.image_url} alt={tag.name} className="w-10 h-10 object-cover" />
                  ) : (
                    <span className="text-sm text-gray-500">No Image</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                  <button
                    onClick={() => setEditingTag(tag)}
                    className="text-primary hover:text-primary/90 disabled:opacity-50"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(tag.id)}
                    className="text-red-600 hover:text-red-900 disabled:opacity-50"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {tagList.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                  No tags found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}