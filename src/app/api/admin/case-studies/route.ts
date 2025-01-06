import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { revalidateTag } from 'next/cache'
import { CACHE_TAGS } from '@/lib/utils/cache'
import { CaseStudyMapper } from '@/infrastructure/mappers/case-study.mapper'

export async function POST(request: NextRequest) {
  const { data, locale } = await request.json()
  
  try {
    const { data: newCaseStudy, error } = await supabase
      .from(`case_studies_${locale}`)
      .insert(CaseStudyMapper.toPersistence(data))
      .select()
      .single()

    if (error) throw error

    // Revalidate cache
    revalidateTag(CACHE_TAGS.CASE_STUDIES)

    return NextResponse.json(CaseStudyMapper.toDomain(newCaseStudy))
  } catch (error) {
    console.error('Error creating case study:', error)
    return NextResponse.json(
      { error: 'Failed to create case study' },
      { status: 500 }
    )
  }
} 