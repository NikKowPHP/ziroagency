import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  
  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="">
            <Image
              src="/images/ziro.avif"
              alt="ZIRO"
              width={150}
              height={51}
              className="h-30 w-30"
            />
            <div className="text-gray-500">
              {t('address')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
