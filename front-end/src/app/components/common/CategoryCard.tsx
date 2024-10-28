import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  icon: string
  name: string
  href: string
}

export function CategoryCard({ icon, name, href }: CategoryCardProps) {
  return (
    <Link href={href} className="block">
      <Card className="rounded border hover:shadow-md transition-shadow duration-200">
        <CardContent className="flex items-center p-4 space-x-4">
          <Image src={icon} alt="" width={40} height={40} className="flex-shrink-0" />
          <span className="text-sm font-medium text-gray-700">{name}</span>
        </CardContent>
      </Card>
    </Link>
  )
}

const categories = [
  { icon: "https://http2.mlstatic.com/storage/homes-korriban/assets/icons/xxhdpi/home_mobile-button-category.webp", name: "Celulares e Telefones", href: "/categoria/celulares-telefones" },
  { icon: "https://http2.mlstatic.com/storage/homes-korriban/assets/icons/xxhdpi/home_oven-category.webp", name: "Eletrodoméstico", href: "/categoria/eletrodomestico" },
  { icon: "https://http2.mlstatic.com/storage/homes-korriban/assets/icons/xxhdpi/home_tv-2-category.webp", name: "Informática", href: "/categoria/informatica" },
  { icon: "https://http2.mlstatic.com/storage/homes-korriban/assets/icons/xxhdpi/home_audio-92-category.webp", name: "Eletrônicos, Áudio e Vídeo", href: "/categoria/eletronicos-audio-video" },
  { icon: "https://www.pinpng.com/pngs/m/341-3417282_modelo-camisa-branca-png-plain-white-v-neck.png", name: "Calçados, Roupas e Bolsas", href: "/categoria/calcados-roupas-bolsas" },
]

export default function CategoriesSection() {
  return (
    <section className="rounded-lg py-5 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Categorias</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.name} {...category} />
          ))}
        </div>
      </div>
    </section>
  )
}