'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { CaseStudy } from '@/domain/models/case-study.model'
import { Locale } from '@/i18n'

interface AdminContextType {
  caseStudies: Record<Locale, CaseStudy[]>
  loading: boolean
  error: string | null
  createCaseStudy: (data: Partial<CaseStudy>, locale: Locale) => Promise<void>
  updateCaseStudy: (id: string, data: Partial<CaseStudy>, locale: Locale) => Promise<void>
  deleteCaseStudy: (id: string, locale: Locale) => Promise<void>
  clearError: () => void
}

interface AdminProviderProps {
  children: React.ReactNode
  initialCaseStudies?: Record<Locale, CaseStudy[]>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children, initialCaseStudies }: AdminProviderProps) {
  const [caseStudies, setCaseStudies] = useState<Record<Locale, CaseStudy[]>>(
    initialCaseStudies || { en: [], pl: [] }
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize case studies when initialCaseStudies changes
  useEffect(() => {
    if (initialCaseStudies) {
      setCaseStudies(initialCaseStudies)
    }
  }, [initialCaseStudies])

  const createCaseStudy = async (data: Partial<CaseStudy>, locale: Locale) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/case-studies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, locale }),
      })
      
      console.log('Response status:', response.status)
      console.log('Response status text:', response.statusText)
      
      let errorMessage = 'Failed to create case study'
      try {
        const errorData = await response.clone().json()
        console.log('Response body:', errorData)
        errorMessage = errorData.error || errorMessage
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError)
      }

      if (!response.ok) {
        throw new Error(`${errorMessage} (Status: ${response.status})`)
      }
      
      const newCaseStudy = await response.json()
      console.log('Successfully created case study:', newCaseStudy)
      
      // Update state with new case study
      setCaseStudies(prev => ({
        ...prev,
        [locale]: [...prev[locale], newCaseStudy]
      }))
    } catch (err) {
      console.error('Create case study error details:', {
        error: err,
        requestData: { data, locale },
        timestamp: new Date().toISOString()
      })
      setError(err instanceof Error ? err.message : 'Failed to create case study')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateCaseStudy = async (id: string, data: Partial<CaseStudy>, locale: Locale) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/case-studies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, locale }),
      })
      
      console.log('Update response status:', response.status)
      let errorMessage = 'Failed to update case study'
      try {
        const errorData = await response.clone().json()
        console.log('Update response body:', errorData)
        errorMessage = errorData.error || errorMessage
      } catch (parseError) {
        console.error('Failed to parse update error response:', parseError)
      }
      
      if (!response.ok) {
        throw new Error(`${errorMessage} (Status: ${response.status})`)
      }
      
      const updatedCaseStudy = await response.json()
      console.log('Successfully updated case study:', updatedCaseStudy)
      
      // Update state with modified case study
      setCaseStudies(prev => ({
        ...prev,
        [locale]: prev[locale].map(cs => 
          cs.id === id ? updatedCaseStudy : cs
        )
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update case study')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteCaseStudy = async (id: string, locale: Locale) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/admin/case-studies/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete case study')
      }
      
      // Update state by removing deleted case study
      setCaseStudies(prev => ({
        ...prev,
        [locale]: prev[locale].filter(cs => cs.id !== id)
      }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete case study')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => setError(null)

  return (
    <AdminContext.Provider value={{
      caseStudies,
      loading,
      error,
      createCaseStudy,
      updateCaseStudy,
      deleteCaseStudy,
      clearError
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
} 