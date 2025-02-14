'use client'

import { useState, useMemo } from 'react'
import { CaseStudy } from '@/domain/models/case-study.model'
import { Locale } from '@/i18n'
import { CaseStudyCard } from '@/components/ui/case-study/case-study-card'
import { Tag } from '@/components/ui/tag/tag'
import { useTranslations } from 'next-intl'
import { Settings2, SearchIcon, CircleX } from 'lucide-react'
import Image from 'next/image'

interface CaseStudiesInteractiveProps {
  caseStudies: CaseStudy[]
  locale: Locale
}

export function CaseStudiesInteractive({
  caseStudies,
  locale,
}: CaseStudiesInteractiveProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const t = useTranslations('caseStudies')

  const uniqueTags = useMemo(() => {
    const tags = caseStudies.flatMap((cs) => cs.tags)
    return Array.from(new Set(tags))
  }, [caseStudies])

  const filteredStudies = useMemo(() => {
    if (!selectedTag) return caseStudies
    return caseStudies.filter((cs) => cs.tags.includes(selectedTag))
  }, [caseStudies, selectedTag])

  const sortedStudies = useMemo(() => {
    const sorted = [...filteredStudies].sort(
      (a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0)
    )
    console.log(filteredStudies)
    return sorted
  }, [filteredStudies])

  const filterCards = useMemo(() => {
    return uniqueTags.map((tag) => {
      const caseStudy = caseStudies.find((cs) => cs.tags.includes(tag))
      return {
        imageUrl: caseStudy?.images?.[0]?.url || '/images/placeholder.png', // Default placeholder image
        alt: caseStudy?.images?.[0]?.alt || 'Case Study',
        tag: tag,
      }
    })
  }, [uniqueTags, caseStudies])
  console.log('filtered cards', filterCards)

  const toggleTag = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
    setIsFilterOpen(false)
  }

  const handleFilter = () => {
    console.log('filter')
    setIsFilterOpen(!isFilterOpen)
  }

  const FilterComponent = () => {
    return (
      <div className={`border border-red-500 `}>
        <div
          className={` w-full flex justify-between items-center gap-[10px] px-[28px] py-[20px] text-black ${
            isFilterOpen ? 'hidden' : ''
          }`}
        >
          <button
            onClick={handleFilter}
            className=" flex flex-1 md:flex-none justify-center md:justify-between  items-center gap-[10px] rounded-full border border-grey-200 px-[30px] py-[13px]"
          >
            <Settings2 className="w-[16px] h-[16px]" />
            <span className="text-[16px] font-bold ">{t('filter')}</span>
          </button>
          <div className="flex-1 hidden md:block border border-grey-200 rounded-full px-[30px] py-[15px] text-[16px]">
            <SearchIcon className="w-[20px] h-[20px]" />
          </div>
          <div className=" hidden md:block">
            <button className="  rounded-full font-bold border border-grey-200 py-[13px] px-[30px] text-[16px]">
              {t('recommended')}
            </button>
          </div>
        </div>

        <div
          className={`w-full  flex-col justify-between items-center gap-[20px] px-[28px] py-[50px] text-black ${
            isFilterOpen ? 'flex' : 'hidden'
          }`}
        >
          {/* close filter button */}
          <div className="w-full flex justify-center items-center ">
            <button
              onClick={handleFilter}
              className="py-[15px] px-[30px] border border-grey-200 rounded-full"
            >
              <CircleX className="w-[18px] h-[18px]" />
            </button>
          </div>
          <div className="w-full relative group ">
            <div className="flex overflow-x-auto pb-8 gap-[10px] scrollbar-hide scrollbar-w-0 relative">
              {filterCards.map((card, index) => (
                <button
                  onClick={() => toggleTag(card.tag)}
                  key={index}
                  className="w-[235px] h-[250px]  rounded-3xl flex-shrink-0  rounded-[50px]"
                >
                  <Image
                    src={card.imageUrl}
                    alt={card.alt}
                    width={235}
                    height={250}
                    className="object-cover h-full w-full rounded-[50px]"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <FilterComponent />
      <div
        id="work-tags-filter"
        className="md:container mb-8 sm:mb-16 flex gap-4 hidden flex-wrap border border-gray-700"
      >
        <button onClick={() => setSelectedTag(null)}>
          <Tag
            variant="primary"
            //   className="px-5 py-2 rounded-primary-lg border border-gray-200"
            className={` px-5 py-2  ${
              selectedTag === null ? 'bg-gray-200' : ''
            }`}
          >
            All
          </Tag>
        </button>
        {uniqueTags.map((tag, index) => (
          <button key={`${tag}-${index}`} onClick={() => toggleTag(tag)}>
            <Tag
              variant="primary"
              //   className="px-5 py-2 rounded-primary-lg border border-gray-200"
              className={` px-5 py-2  ${
                selectedTag === tag ? 'bg-gray-200' : ''
              }`}
            >
              {tag}
            </Tag>
          </button>
        ))}
      </div>
      <div className="relative  flex flex-col gap-16">
        {sortedStudies.map((cs) => (
          <CaseStudyCard key={cs.id} caseStudy={cs} locale={locale} />
        ))}
      </div>
    </>
  )
}
