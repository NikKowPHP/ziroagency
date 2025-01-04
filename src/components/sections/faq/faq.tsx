'use client'

import { useState } from 'react'
import { faqItems, type FaqItem } from '@/lib/data/faq'
import { cn } from '@/lib/utils/cn'

interface FaqAccordionProps {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}

function FaqAccordion({ item, isOpen, onToggle }: FaqAccordionProps) {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="flex w-full items-center justify-between py-6 text-left"
        onClick={onToggle}
      >
        <span className="text-xl font-medium">{item.question}</span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <MinusIcon className="h-6 w-6" />
          ) : (
            <PlusIcon className="h-6 w-6" />
          )}
        </span>
      </button>
      <div
        className={cn(
          'grid overflow-hidden transition-all duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden">
          <p className="text-gray-600">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-[56px] font-medium mb-16">FAQ</h2>
        <div className="mx-auto max-w-3xl">
          {faqItems.map((item) => (
            <FaqAccordion
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6v12m6-6H6"
      />
    </svg>
  )
}

function MinusIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 12H6"
      />
    </svg>
  )
}
