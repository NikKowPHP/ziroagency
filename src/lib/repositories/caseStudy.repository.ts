import { SupabaseClient } from '@supabase/supabase-js'
import { Locale } from '@/i18n'
import { CaseStudy, CaseStudyWithTags, Image, Tag } from '@/domain/models/models'
import { supabase } from '../supabase'

export class CaseStudyRepository {
  private supabaseClient: SupabaseClient

  constructor() {
    this.supabaseClient = supabase
  }

  // READ: Retrieve case studies ordered by order_index
  getCaseStudies = async (locale: Locale): Promise<CaseStudyWithTags[]> => {
    const { data, error } = await this.supabaseClient
      .from(`case_studies_${locale}`)
        .select('*')
        .order('order_index', { ascending: true })

      if (error) {
        console.error('Error fetching case studies:', error)
        return []
      }

      // Fetch tags for each case study
  
      return await this.enrichWithTags(data as CaseStudy[])
  }

  // READ: Retrieve a case study by its slug
  getCaseStudyBySlug = async (slug: string, locale: Locale): Promise<CaseStudyWithTags | null> => {
    const { data, error } = await this.supabaseClient
      .from(`case_studies_${locale}`)
      .select('*')
      .eq('slug', slug)
      .single()

        if (error) {
          console.error('Error fetching case study:', error)
          return null
        }

        return data ? await this.enrichWithTags([data as CaseStudy]).then(studies => studies[0] || null) : null
  }

  // CREATE: Insert a new case study record and return the newly created domain object.
  createCaseStudy = async (
    data: Partial<CaseStudyWithTags>,
    locale: Locale
  ): Promise<CaseStudyWithTags> => {
    const createData: Partial<CaseStudy> = {
      ...data,
      tags: data.tags ? data.tags.map(tag => tag.id) : undefined
    }
    const { data: inserted, error } = await this.supabaseClient
      .from(`case_studies_${locale}`)
      .insert(createData)
      .select()
      .single()

    if (error) {
      throw new Error(`Error creating case study: ${error.message}`)
    }
    const [caseStudyWithTags] = await this.enrichWithTags([inserted as CaseStudy])
    return caseStudyWithTags
  }

  // UPDATE: Update an existing case study identified by its ID.
  updateCaseStudy = async (
    id: string,
    data: Partial<CaseStudyWithTags>,
    locale: Locale
  ): Promise<CaseStudyWithTags | null> => {
    // Convert CaseStudyWithTags to CaseStudy by mapping tags to tag IDs
    const updateData: Partial<CaseStudy> = {
      ...data,
      tags: data.tags ? data.tags.map(tag => tag.id) : undefined
    }

    const { data: updated, error } = await this.supabaseClient
      .from(`case_studies_${locale}`)
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`Error updating case study: ${error.message}`)
    }
    if (!updated) {
      return null
    }
    const [caseStudyWithTags] = await this.enrichWithTags([updated as CaseStudy])
    return caseStudyWithTags
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