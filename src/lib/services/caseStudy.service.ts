import { Locale } from "@/i18n"
import { CaseStudyRepository } from "../repositories/caseStudy.repository"
import { CaseStudyWithTags } from "@/domain/models/models"
import { caseStudyRepositoryLocal } from "../repositories/case-study.local.repository"

const caseStudyRepository = new CaseStudyRepository()



export interface ICaseStudyRepository {
  getCaseStudies: (locale: Locale) => Promise<CaseStudyWithTags[]>
  getCaseStudyBySlug: (slug: string, locale: Locale) => Promise<CaseStudyWithTags | null>
  createCaseStudy: (data: Partial<CaseStudyWithTags>, locale: Locale) => Promise<CaseStudyWithTags>
  updateCaseStudy: (id: string, data: Partial<CaseStudyWithTags>, locale: Locale) => Promise<CaseStudyWithTags | null>
  deleteCaseStudy: (id: string, locale: Locale) => Promise<boolean>
  updateCaseStudyOrder: (orders: { id: string; order: number }[], locale: Locale) => Promise<void>
}

export class CaseStudyService {
  private caseStudyRepository: ICaseStudyRepository

  constructor() {
    if (process.env.MOCK_REPOSITORIES === 'true') {
      this.caseStudyRepository = caseStudyRepositoryLocal
    } else {
      this.caseStudyRepository = caseStudyRepository
    }
  }

  getCaseStudies = async (locale: Locale): Promise<CaseStudyWithTags[]> => {
    return this.caseStudyRepository.getCaseStudies(locale)
  }

  getCaseStudyBySlug = async (slug: string, locale: Locale): Promise<CaseStudyWithTags | null> => {
    return this.caseStudyRepository.getCaseStudyBySlug(slug, locale)
  }

  createCaseStudy = async (data: Partial<CaseStudyWithTags>, locale: Locale): Promise<CaseStudyWithTags> => {
    if (!data.title) {
      throw new Error("Case study title is required")
    }
    if (!data.slug) {
      throw new Error("Case study slug is required")
    }
    // Additional validations may be added here
    return this.caseStudyRepository.createCaseStudy(data, locale)
  }

  updateCaseStudy = async (id: string, data: Partial<CaseStudyWithTags>, locale: Locale): Promise<CaseStudyWithTags | null> => {
    if (!id) {
      throw new Error("Case study id is required for update")
    }
    return this.caseStudyRepository.updateCaseStudy(id, data, locale)
  }

  deleteCaseStudy = async (id: string, locale: Locale): Promise<boolean> => {
    if (!id) {
      throw new Error("Case study id is required for deletion")
    }
    return this.caseStudyRepository.deleteCaseStudy(id, locale)
  }

  updateCaseStudyOrder = async (orders: { id: string; order: number }[], locale: Locale): Promise<void> => {
    return this.caseStudyRepository.updateCaseStudyOrder(orders, locale)
  }
}

// Export a singleton instance
export const caseStudyService = new CaseStudyService()