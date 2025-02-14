'use client'

import { useState, useMemo } from 'react'
import { CaseStudy } from '@/domain/models/case-study.model'
import { Locale } from '@/i18n'
import { CaseStudyCard } from '@/components/ui/case-study/case-study-card'
import { Tag } from '@/components/ui/tag/tag'
import { useTranslations } from 'next-intl'
import { Settings2, SearchIcon, CircleX } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

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

  const handleRecommended = () => {
    console.log('recommended')

  }

  const FilterComponent = () => {
    return (
      <div className="">
        <AnimatePresence mode="wait">
          {!isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3,
                ease: [0.23, 1, 0.32, 1] // Custom easing function for smooth motion
              }}
              className="w-full flex justify-between items-center gap-[10px]  py-[20px] text-black"
            >
              <motion.button
                onClick={handleFilter}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-1 md:flex-none justify-center md:justify-between items-center gap-[10px] rounded-full border border-grey-200 px-[30px] py-[13px]"
              >
                <Settings2 className="w-[16px] h-[16px]" />
                <span className="text-[16px] font-bold">{t('filter')}</span>
              </motion.button>
              <div className="flex-1 relative hidden md:block border border-grey-200 rounded-full px-[30px] py-[15px] text-[16px]">
                <SearchIcon className="w-[20px] h-[20px] absolute left-[30px] top-1/2 -translate-y-1/2 " />
                <input type="text" placeholder="" className="w-full pl-[40px] focus:outline-none" />
              </div>
              <div className=" hidden md:block">
                <button onClick={handleRecommended} className="  rounded-full font-bold border border-grey-200 py-[13px] px-[30px] text-[16px]">
                  {t('recommended')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isFilterOpen && (
            <motion.div
              initial={{ 
                height: 0,
                opacity: 0
              }}
              animate={{ 
                height: "auto",
                opacity: 1
              }}
              exit={{ 
                height: 0,
                opacity: 0
              }}
              transition={{
                height: {
                  duration: 0.4,
                  ease: [0.23, 1, 0.32, 1]
                },
                opacity: {
                  duration: 0.3,
                  delay: 0.1
                }
              }}
              className="w-full overflow-hidden"
            >
              <motion.div
                initial={{ y: -40 }}
                animate={{ y: 0 }}
                exit={{ y: -40 }}
                transition={{
                  duration: 0.4,
                  ease: [0.23, 1, 0.32, 1]
                }}
                className="flex flex-col justify-between items-center gap-[20px] px-[28px] py-[50px] text-black"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-full flex justify-center items-center"
                >
                  <motion.button
                    onClick={handleFilter}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="py-[15px] px-[30px] border border-grey-200 rounded-full"
                  >
                    <CircleX className="w-[18px] h-[18px]" />
                  </motion.button>
                </motion.div>

                <div className="w-full relative group">
                  <motion.div 
                    className="flex flex-col md:flex-row overflow-y-auto md:overflow-x-auto pb-8 gap-[10px] scrollbar-hide scrollbar-w-0 relative"
                  >
                    {filterCards.map((card, index) => (
                      <motion.button
                        key={index}
                        onClick={() => toggleTag(card.tag)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.2 + index * 0.1,
                          ease: [0.23, 1, 0.32, 1]
                        }}
                        whileHover={{ 
                          scale: 1.03,
                          transition: { duration: 0.3 }
                        }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full md:w-[235px] h-[250px] rounded-[50px] overflow-hidden flex-shrink-0"
                      >
                        <motion.div
                          whileHover={{ 
                            scale: 1.1,
                            transition: { duration: 0.6 }
                          }}
                          className="h-full w-full"
                        >
                          <Image
                            src={card.imageUrl}
                            alt={card.alt}
                            width={235}
                            height={250}
                            className="object-cover h-full w-full"
                          />
                        </motion.div>
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
