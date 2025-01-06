import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  
  return (
    <footer 
      className="bg-gray-50 py-12"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div>
            <Image
              src="/images/ziro.avif"
              alt="ZIRO - Web Design & Development Agency"
              width={150}
              height={51}
              className="h-30 w-30"
              itemProp="logo"
            />
            <div 
              className="text-gray-500"
              itemProp="address"
              itemScope
              itemType="https://schema.org/PostalAddress"
            >
              {t('address')}
            </div>
            <meta itemProp="name" content="ZIRO" />
            <meta itemProp="description" content="Professional Web Design & Development Agency" />
            <meta itemProp="url" content="https://ziro.agency" />
          </div>
        </div>
      </div>
    </footer>
  )
}
