import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="">
            <Image
              src="/images/ziro.avif"
              alt="ZIRO"
              width={150}
              height={51}
              className="h-24 w-12"
            />
            <div className="text-gray-500">
              Ziro sp. z o.o., ul. Mogilska 43 31-545 Kraków, Poland
            </div>
          </div>

        </div>
      </div>

    </footer>
  )
}
