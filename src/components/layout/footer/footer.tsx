import Image from 'next/image'
import { LanguageSwitcher } from '@/components/ui/language-switcher/language-switcher'

export function Footer() {
  return (
    <footer className="bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo.svg"
              alt="ZIRO"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-gray-500">
              Ziro sp. z o.o., ul. Mogilska 43 31-545 Kraków, Poland
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://framer.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
            >
              <span>Made in Framer</span>
              <Image
                src="/images/framer-logo.svg"
                alt="Framer"
                width={16}
                height={16}
              />
            </a>
          </div>
        </div>
      </div>

    </footer>
  )
}
