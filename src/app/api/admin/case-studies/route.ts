import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { revalidateTag } from 'next/cache'
import { CACHE_TAGS } from '@/lib/utils/cache'

export async function POST(request: NextRequest) {
  const { data, locale } = await request.json()
  
  try {
    console.log('Processing case study creation:', {
      locale,
      mappedData: data
    })

    const { data: newCaseStudy, error } = await supabaseAdmin!
      .from(`case_studies_${locale}`)
      .insert(data)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', {
        code: error.code,
        message: error.message,
        details: error.details
      })
      throw error
    }

    // Revalidate cache
    revalidateTag(CACHE_TAGS.CASE_STUDIES)

    return NextResponse.json(newCaseStudy)
  } catch (error) {
    console.error('Error creating case study:', error)
    return NextResponse.json(
      { error: 'Failed to create case study', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
