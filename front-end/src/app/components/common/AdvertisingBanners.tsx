import Image from 'next/image'
import Link from 'next/link'

interface BannerProps {
  imageUrl: string
  altText: string
  link: string
}

function Banner({ imageUrl, altText, link }: BannerProps) {
  return (
    <Link href={link} className="block w-full h-full">
      <Image
        src={imageUrl}
        alt={altText}
        width={600}
        height={100}
        className="w-full h-24 object-cover rounded-lg"
      />
    </Link>
  )
}

export default function AdvertisingBanners() {
  const banners = [
    {
      imageUrl: "https://vinabeauty.vn/wp-content/uploads/2024/06/La-Roche-Posay-Mela-B3-serum-1.jpg",
      altText: "Novo Mela B3 Serum - 85% MANCHAS* EM 8 SEMANAS**",
      link: "/promo/mela-b3-serum"
    },
    {
      imageUrl: "https://parceirosacer.com.br/Conteudos-Especiais/Notebooks/Predator-Helios-Neo/PHN16-71-709K/dealer/assets/images/boy-with-notebook-img.png",
      altText: "NOTEBOOK PREDATOR - HELIOS NEO 16 PARCEIRO EM RIO",
      link: "/promo/notebook-predator"
    }
  ]

  return (
    <section className="py-4 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {banners.map((banner, index) => (
            <Banner key={index} {...banner} />
          ))}
        </div>
      </div>
    </section>
  )
}