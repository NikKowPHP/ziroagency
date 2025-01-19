import { unstable_cache } from 'next/cache';
import { supabase } from '../supabase'
import { Locale } from '@/i18n'
import { CaseStudy } from '@/domain/models/case-study.model'
import { CaseStudyDTO } from '@/infrastructure/dto/case-study.dto'
import { CaseStudyMapper } from '@/infrastructure/mappers/case-study.mapper'
import { CACHE_TAGS, CACHE_TIMES } from '@/lib/utils/cache'

export const getCaseStudies = unstable_cache(
  async (locale: Locale): Promise<CaseStudy[]> => {
    const { data, error } = await supabase
      .from(`case_studies_${locale}`)
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching case studies:', error)
      return []
    }
    console.log('getCaseStudies', data)

    return (data as CaseStudyDTO[]).map(CaseStudyMapper.toDomain)
  },
  [CACHE_TAGS.CASE_STUDIES],
  {
    revalidate: CACHE_TIMES.HOUR,
    tags: [CACHE_TAGS.CASE_STUDIES]
  }
)

export const getCaseStudyBySlug = async (slug: string, locale: Locale): Promise<CaseStudy | null> => {
  return unstable_cache(
    async () => {
      const { data, error } = await supabase
        .from(`case_studies_${locale}`)
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) {
        console.error('Error fetching case study:', error)
        return null
      }

      return data ? CaseStudyMapper.toDomain(data as CaseStudyDTO) : null
    },
    [`case-study-${slug}-${locale}`],
    {
      revalidate: CACHE_TIMES.DAY,
      tags: [CACHE_TAGS.CASE_STUDIES]
    }
  )()
} 