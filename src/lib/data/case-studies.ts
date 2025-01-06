import { supabase } from '../supabase'
import { Locale } from '@/i18n'
import { CaseStudy } from '@/domain/models/case-study.model'
import { CaseStudyDTO } from '@/infrastructure/dto/case-study.dto'
import { CaseStudyMapper } from '@/infrastructure/mappers/case-study.mapper'

export async function getCaseStudies(locale: Locale): Promise<CaseStudy[]> {
  const { data, error } = await supabase
    .from(`case_studies_${locale}`)
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching case studies:', error)
    return []
  }

  return (data as CaseStudyDTO[]).map(CaseStudyMapper.toDomain)
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

  return data ? CaseStudyMapper.toDomain(data as CaseStudyDTO) : null
} 