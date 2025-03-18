'use client'

import { useEffect, useState } from 'react'
import { CaseStudy, CaseStudyWithTags } from '@/domain/models/models'
import { Locale } from '@/i18n'
import { CaseStudyForm } from './components/case-study-form'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { createCaseStudyAction, deleteCaseStudyAction, updateCaseStudyAction, updateCaseStudyOrderAction } from '@/components/server-actions/case_study-actions'
import logger from '@/lib/utils/logger'
import toast from 'react-hot-toast'

export function CaseStudyList({ caseStudies }: { caseStudies: Record<Locale, CaseStudyWithTags[]> }) {
  const [activeLocale, setActiveLocale] = useState<Locale>('en')
  const [editingStudy, setEditingStudy] = useState<CaseStudyWithTags | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [orderedStudies, setOrderedStudies] = useState<CaseStudyWithTags[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    debugger
    setOrderedStudies(caseStudies[activeLocale])
  }, [activeLocale, caseStudies])
  
    const handleCreate = async (data: Partial<CaseStudyWithTags>) => {
      try {
      setLoading(true)
      setError(null)
      await createCaseStudyAction(data, activeLocale)
      toast.success('Case study created successfully')
      setIsCreating(false)
    } catch (error) {
      logger.error('Failed to create case study:', error)
      toast.error('Failed to create case study')
      setError(error instanceof Error ? error.message : 'Failed to create case study')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (data: Partial<CaseStudyWithTags>) => {
    if (!editingStudy) return
    try {
      setLoading(true)
      setError(null)
      await updateCaseStudyAction(editingStudy.id, data, activeLocale)
      toast.success('Case study updated successfully')
      setEditingStudy(null)
    } catch (error) {
      logger.error('Failed to update case study:', error)
      toast.error('Failed to update case study')
      setError(error instanceof Error ? error.message : 'Failed to update case study')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this case study?')) {
      try {
        setLoading(true)
        setError(null)
        await deleteCaseStudyAction(id, activeLocale)
        toast.success('Case study deleted successfully')
      } catch (error) {
        logger.error('Failed to delete case study:', error)
        toast.error('Failed to delete case study')
        setError(error instanceof Error ? error.message : 'Failed to delete case study')
      } finally {
        setLoading(false)
      }
    }
  }

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return
    const items = Array.from(orderedStudies)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setOrderedStudies(items)

    const orders = items.map((study, index) => ({
      id: study.id,
      order: index
    }));
    try {
      setLoading(true)
      setError(null)
      await updateCaseStudyOrderAction(orders, activeLocale)
      toast.success('Case study order updated successfully')
    } catch (error) {
      logger.error('Failed to update order:', error)
      toast.error('Failed to update order')
      setError(error instanceof Error ? error.message : 'Failed to update order')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { console.log(caseStudies) }, [caseStudies])

  return (
    <div className="space-y-8">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-primary">
          {error}
        </div>
      )}
      {loading && (
        <div className="p-4 bg-gray-50 text-gray-600 rounded-primary">
          Loading...
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveLocale('en')}
            className={`px-6 py-3 rounded-full transition-colors ${
              activeLocale === 'en' ? 'bg-primary text-white' : 'bg-secondary text-gray-700 hover:bg-secondary/80'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setActiveLocale('pl')}
            className={`px-6 py-3 rounded-full transition-colors ${
              activeLocale === 'pl' ? 'bg-primary text-white' : 'bg-secondary text-gray-700 hover:bg-secondary/80'
            }`}
          >
            Polish
          </button>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="px-6 py-3 text-white bg-primary rounded-full hover:bg-primary/90 transition-colors"
          disabled={loading}
        >
          Add Case Study
        </button>
      </div>

      {(isCreating || editingStudy) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-primary p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-[32px] font-medium tracking-[-0.02em] text-gray-900 mb-8">
              {editingStudy ? 'Edit Case Study' : 'New Case Study'}
            </h3>
            <CaseStudyForm
              study={editingStudy ?? undefined}
              locale={activeLocale}
              onSubmit={editingStudy ? handleUpdate : handleCreate}
              onCancel={() => {
                setEditingStudy(null)
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
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                URL Preview
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="caseStudies">
              {(provided) => (
                <tbody className="divide-y divide-gray-200" {...provided.droppableProps} ref={provided.innerRef}>
                  {orderedStudies.map((study, index) => (
                    <Draggable key={study.id} draggableId={study.id} index={index}>
                      {(provided) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={loading ? 'opacity-50' : ''}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {study.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {study.slug}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              /case-studies/{study.slug}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-500 line-clamp-2">
                              {study.description}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                            <button
                              onClick={() => setEditingStudy(study)}
                              className="text-primary hover:text-primary/90 disabled:opacity-50"
                              disabled={loading}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(study.id)}
                              className="text-red-600 hover:text-red-900 disabled:opacity-50"
                              disabled={loading}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </table>
      </div>
    </div>
  )
} 