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
    <div className="fixed bottom-8 right-8 flex gap-2 z-50">
      {languages.map((lang) => (
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
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            currentLang === lang.code
              ? 'bg-[#0066FF] text-white'
              : 'bg-white text-gray-900 hover:bg-gray-100'
          )}
        >
          {lang.name}
        </button>
      ))}
    </div>
  )
}
