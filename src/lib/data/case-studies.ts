import { supabase } from '../supabase'
import { Locale } from '@/i18n'

export interface CaseStudy {
  id: string
  title: string
  description: string
  tags: string[]
  images: {
    url: string
    alt: string
  }[]
  ctaText: string
  ctaTextName: string
  ctaUrl: string
  created_at?: string
  updated_at?: string
}

export async function getCaseStudies(locale: Locale): Promise<CaseStudy[]> {
  const { data, error } = await supabase
    .from(`case_studies_${locale}`)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching case studies:', error)
    return []
  }
  console.log(data)

  return data || []
}

export async function getCaseStudyById(id: string, locale: Locale): Promise<CaseStudy | null> {
  const { data, error } = await supabase
    .from(`case_studies_${locale}`)
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching case study:', error)
    return null
  }

  return data
} 