import { unstable_cache } from 'next/cache'
import { SupabaseClient } from '@supabase/supabase-js'
import { Locale } from '@/i18n'
import { CaseStudy, CaseStudyWithTags, Image, Tag } from '@/domain/models/models'
import { CaseStudyDTO } from '@/infrastructure/dto/case-study.dto'
import { CaseStudyMapper } from '@/infrastructure/mappers/case-study.mapper'
import { CACHE_TAGS, CACHE_TIMES } from '@/lib/utils/cache'
import { supabase } from '../supabase'

export class CaseStudyRepository {
  private supabaseClient: SupabaseClient

  constructor() {
    this.supabaseClient = supabase
  }

  // READ: Retrieve case studies ordered by order_index
  getCaseStudies = unstable_cache(
    async (locale: Locale): Promise<CaseStudyWithTags[]> => {
      const { data, error } = await this.supabaseClient
        .from(`case_studies_${locale}`)
        .select('*')
        .order('order_index', { ascending: true })

      if (error) {
        console.error('Error fetching case studies:', error)
        return []
      }

      // Fetch tags for each case study
      const caseStudies = (data as CaseStudyDTO[]).map(CaseStudyMapper.toDomain)
      return await this.enrichWithTags(caseStudies )
    },
    [CACHE_TAGS.CASE_STUDIES],
    {
      revalidate: CACHE_TIMES.HOUR,
      tags: [CACHE_TAGS.CASE_STUDIES],
    }
  )

  // READ: Retrieve a case study by its slug
  getCaseStudyBySlug = async (slug: string, locale: Locale): Promise<CaseStudyWithTags | null> => {
    return unstable_cache(
      async () => {
        const { data, error } = await this.supabaseClient
          .from(`case_studies_${locale}`)
          .select('*')
          .eq('slug', slug)
          .single()

        if (error) {
          console.error('Error fetching case study:', error)
          return null
        }

        const caseStudy = data ? CaseStudyMapper.toDomain(data as CaseStudyDTO) : null
        return caseStudy ? await this.enrichWithTags([caseStudy] ).then(studies => studies[0] || null) : null
      },
      [`case-study-${slug}-${locale}`],
      {
        revalidate: CACHE_TIMES.DAY,
        tags: [CACHE_TAGS.CASE_STUDIES],
      }
    )()
  }

  // CREATE: Insert a new case study record and return the newly created domain object.
  createCaseStudy = async (
    data: Partial<CaseStudy>,
    locale: Locale
  ): Promise<CaseStudy> => {
    const { data: inserted, error } = await this.supabaseClient
      .from(`case_studies_${locale}`)
      .insert(data)
      .select()
      .single()

    if (error) {
      throw new Error(`Error creating case study: ${error.message}`)
    }
    return CaseStudyMapper.toDomain(inserted as CaseStudyDTO)
  }

  // UPDATE: Update an existing case study identified by its ID.
  updateCaseStudy = async (
    id: string,
    data: Partial<CaseStudy>,
    locale: Locale
  ): Promise<CaseStudy | null> => {
    const { data: updated, error } = await this.supabaseClient
      .from(`case_studies_${locale}`)
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`Error updating case study: ${error.message}`)
    }
    return updated ? CaseStudyMapper.toDomain(updated as CaseStudyDTO) : null
  }

  // DELETE: Remove a case study by its ID.
  deleteCaseStudy = async (id: string, locale: Locale): Promise<boolean> => {
    const { data: deleted, error } = await this.supabaseClient
      .from(`case_studies_${locale}`)
      .delete()
      .eq('id', id)
    if (error) {
      throw new Error(`Error deleting case study: ${error.message}`)
    }
    return !!deleted
  }

  // UPDATE ORDER: Update the order_index for each case study entry.
  updateCaseStudyOrder = async (
    orders: { id: string; order: number }[],
    locale: Locale
  ): Promise<void> => {
    // Update each record; using Promise.all to process in parallel.
    const updates = orders.map(({ id, order }) =>
      this.supabaseClient
        .from(`case_studies_${locale}`)
        .update({ order_index: order })
        .eq('id', id)
    )
    const results = await Promise.all(updates)
    for (const result of results) {
      if (result.error) {
        throw new Error(`Error updating case study order: ${result.error.message}`)
      }
    }
  }

  private async enrichWithTags(caseStudies: CaseStudy[]): Promise<CaseStudyWithTags[]> {
    // Fetch all tags
    const { data: tags, error: tagsError } = await this.supabaseClient
      .from('ziroagency_tags')
      .select('*');

    if (tagsError) {
      console.error('Error fetching tags:', tagsError);
      return caseStudies.map(cs => ({ ...cs, tags: [] })); // Return case studies without tags in case of error
    }

    const allTags: Tag[] = tags || [];

    // Enrich each case study with its tags and parse images
    return caseStudies.map(caseStudy => {
      // Parse images from JSON string to Image[]
      const images: Image[] = typeof caseStudy.images === 'string' ? JSON.parse(caseStudy.images) : caseStudy.images;

      // Assuming caseStudy.tags contains an array of tag IDs
      const tagIds = caseStudy.tags as string[];
      const caseStudyTags = allTags.filter(tag => tagIds.includes(tag.id));
      return { ...caseStudy, tags: caseStudyTags, images };
    });
  }
}

// Export a singleton instance.
export const caseStudyRepository = new CaseStudyRepository();