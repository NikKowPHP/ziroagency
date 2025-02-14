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


  const filterCards = [
    {
      imageUrl: '/images/case-studies/supernormal/supernormal.avif',
      alt: 'supernormal',
      tag: 'supernormal',
    },
    {
      imageUrl: '/images/case-studies/supernormal/supernormal.avif',
      alt: 'supernormal',
      tag: 'supernormal',
    },
    {
      imageUrl: '/images/case-studies/supernormal/supernormal.avif',
      alt: 'supernormal',
      tag: 'supernormal',
    },
    {
      imageUrl: '/images/case-studies/supernormal/supernormal.avif',
      alt: 'supernormal',
      tag: 'supernormal',
    },
    {
      imageUrl: '/images/case-studies/supernormal/supernormal.avif',
      alt: 'supernormal',
      tag: 'supernormal',
    },
    {
      imageUrl: '/images/case-studies/supernormal/supernormal.avif',
      alt: 'supernormal',
      tag: 'supernormal',
    },
    {
      imageUrl: '/images/case-studies/supernormal/supernormal.avif',
      alt: 'supernormal',
      tag: 'supernormal',
    },
    {
      imageUrl: '/images/case-studies/supernormal/supernormal.avif',
      alt: 'supernormal',
      tag: 'supernormal',
    },
  ]

  const toggleTag = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
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
          className={`w-full  flex-col justify-between items-center gap-[10px] px-[28px] py-[20px] text-black ${
            isFilterOpen ? 'flex' : 'hidden'
          }`}
        >
          {/* close filter button */}
          <div className="w-full flex justify-center items-center ">
            <button onClick={handleFilter} className="p-[10px] border border-grey-200 rounded-full">
                
                <CircleX className="w-[16px] h-[16px]" />
            
            </button>
          </div>
          <div className="w-full flex overflow-x-scroll gap-[10px]">

            {filterCards.map((card, index) => (
              <div key={index} className="w-[200px] h-[200px]  border border-red-500 rounded-3xl">
                <Image src={card.imageUrl} alt={card.alt} width={200} height={200} className="object-cover h-full w-full rounded-3xl" />
              </div>
            ))}
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
