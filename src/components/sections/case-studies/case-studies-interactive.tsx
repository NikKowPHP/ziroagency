'use client'

import { useState, useMemo } from 'react'
import { CaseStudyWithTags } from '@/domain/models/models'
import { Locale } from '@/i18n'
import { CaseStudyCard } from '@/components/ui/case-study/case-study-card'
import { useTranslations } from 'next-intl'
import { FilterComponent } from '@/components/ui/filter-component'

interface CaseStudiesInteractiveProps {
  caseStudies: CaseStudyWithTags[]
  locale: Locale
}

export function CaseStudiesInteractive({
  caseStudies,
  locale,
}: CaseStudiesInteractiveProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const t = useTranslations('caseStudies')

  // Extract unique tags from all case studies
  const uniqueTags = useMemo(() => {
    const tags = caseStudies.flatMap((cs) => cs.tags)
    return Array.from(new Set(tags.map(tag => tag.id))) // Use tag IDs for filtering
  }, [caseStudies])

  // Filter case studies based on the selected tag and search term
  const filteredStudies = useMemo(() => {
    let filtered = caseStudies;

    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter((cs) => cs.tags.some(tag => tag.id === selectedTag));
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((cs) =>
        cs.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return filtered;
  }, [caseStudies, selectedTag, searchTerm])

  // Sort case studies by orderIndex
  const sortedStudies = useMemo(() => {
    return [...filteredStudies].sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0))
  }, [filteredStudies])

  // Prepare filter cards for the UI
  const filterCards = useMemo(() => {
    return uniqueTags.map((tagId) => {
      const caseStudy = caseStudies.find((cs) => cs.tags.some(tag => tag.id === tagId))
      return {
        imageUrl: caseStudy?.tags.find(tag => tag.id === tagId)?.image_url || '/images/placeholder.png', // Default placeholder image
        alt: caseStudy?.tags.find(tag => tag.id === tagId)?.name || 'Case Study',
        tag: tagId, // Use tag ID for filtering
      }
    })
  }, [uniqueTags, caseStudies])

  // Toggle the selected tag
  const toggleTag = (tagId: string) => {
    setSelectedTag(selectedTag === tagId ? null : tagId)
    setIsFilterOpen(false)
  }

  // Toggle the filter menu
  const handleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  // Handle the "Recommended" button click
  const handleRecommended = () => {
    console.log('recommended')
  }



  return (
    <>
      <FilterComponent
        isFilterOpen={isFilterOpen}
        onFilterToggle={handleFilter}
        onTagSelect={toggleTag}
        filterCards={filterCards}
        onSearch={setSearchTerm}
        onRecommended={handleRecommended}
      />
  
      <div className="relative  flex flex-col gap-16">
        {sortedStudies.map((cs) => (
          <CaseStudyCard key={cs.id} caseStudy={cs} locale={locale} />
        ))}
      </div>
    </>
  )
}


