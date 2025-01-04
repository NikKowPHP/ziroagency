'use client'

import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils/cn'

interface Language {
  code: string
  name: string
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'pl', name: 'Polish' },
]

export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const currentLang = pathname.startsWith('/pl') ? 'pl' : 'en'

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="inline-flex rounded-full bg-gray-100 p-1">
        {languages.map((lang, index) => (
          <button
            key={lang.code}
            onClick={() => {
              const newPath =
                currentLang === 'en'
                  ? `/pl${pathname}`
                  : pathname.replace('/pl', '')
              router.push(newPath)
            }}
            className={cn(
              'px-4 py-2 text-sm font-medium transition-all duration-200',
              // First button (English)
              index === 0 && 'rounded-full',
              // Last button (Polish)
              index === languages.length - 1 && 'rounded-r-full',
              currentLang === lang.code
                ? 'bg-[#0066FF] text-white'
                : 'text-gray-700 hover:text-gray-900'
            )}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  )
}
