'use server'
import { caseStudyService } from '@/lib/services/caseStudy.service'
import { CaseStudy } from '@/domain/models/case-study.model'
import { Locale } from '@/i18n'

export async function getCaseStudiesAction(locale: Locale): Promise<CaseStudy[]> {
  return await caseStudyService.getCaseStudies(locale)
}

export async function getCaseStudyBySlugAction(slug: string, locale: Locale): Promise<CaseStudy | null> {
  if (!slug) {
    throw new Error('Case study slug is required')
  }
  return await caseStudyService.getCaseStudyBySlug(slug, locale)
}

export async function createCaseStudyAction(data: Partial<CaseStudy>, locale: Locale): Promise<CaseStudy> {
  if (!data.title) {
    throw new Error('Case study title is required')
  }
  if (!data.slug) {
    throw new Error('Case study slug is required')
  }
  return await caseStudyService.createCaseStudy(data, locale)
}

export async function updateCaseStudyAction(id: string, data: Partial<CaseStudy>, locale: Locale): Promise<CaseStudy | null> {
  if (!id) {
    throw new Error('Case study id is required for update')
  }
  return await caseStudyService.updateCaseStudy(id, data, locale)
}

export async function deleteCaseStudyAction(id: string, locale: Locale): Promise<boolean> {
  if (!id) {
    throw new Error('Case study id is required for deletion')
  }
  return await caseStudyService.deleteCaseStudy(id, locale)
}

export async function updateCaseStudyOrderAction(orders: { id: string; order: number }[], locale: Locale): Promise<void> {
  return await caseStudyService.updateCaseStudyOrder(orders, locale)
}