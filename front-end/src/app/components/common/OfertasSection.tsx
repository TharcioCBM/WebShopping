import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  image: string
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
}

const products: Product[] = [
  {
    id: 1,
    name: "Caixa De Som JBL Go 3",
    description: "Portátil Bluetooth 4.2w À Prova D'água E poeira Cor Preto",
    image: "https://http2.mlstatic.com/D_NQ_NP_814465-MLA79345006240_092024-O.webp",
    originalPrice: 249.99,
    discountedPrice: 220,
    discountPercentage: 8
  },
  {
    id: 2,
    name: "Samsung Smart TV 50'",
    description: "UHD 4K 50DU7700 2024 Processador Crystal 4K Gaming...",
    image: "https://http2.mlstatic.com/D_NQ_NP_700507-MLU78160025232_082024-O.webp",
    originalPrice: 3999,
    discountedPrice: 2399,
    discountPercentage: 40
  },
  {
    id: 3,
    name: "Smart Tv LG Led 65",
    description: "65UR871C0SA AI Thinq Led 4k 65 100v 240v Preto",
    image: "https://http2.mlstatic.com/D_NQ_NP_884778-MLU77355786759_062024-O.webp",
    originalPrice: 5499.94,
    discountedPrice: 3086.55,
    discountPercentage: 43
  },
  {
    id: 4,
    name: "Fritadeira Air Fryer",
    description: "Pfr15pg Gourmet 4,4l Black Philco 127v",
    image: "https://http2.mlstatic.com/D_NQ_NP_676762-MLU74978646295_032024-O.webp",
    originalPrice: 474.60,
    discountedPrice: 299.90,
    discountPercentage: 36
  },
  {
    id: 5,
    name: "Fone de ouvido sem fio",
    description: "JBL Tune 520BT Dobrável Preto",
    image: "https://http2.mlstatic.com/D_NQ_NP_986177-MLU73187129209_122023-O.webp",
    originalPrice: 324,
    discountedPrice: 227.49,
    discountPercentage: 29
  },
]

export default function OfertasSection() {
  const [startIndex, setStartIndex] = useState(0)

  const nextProduct = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  const prevProduct = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  return (
    <section className="py-12">
      <div className="rounded-lg container bg-white mx-auto px-4">
        <h2 className="text-2xl font-bold pt-4 mb-6">Ofertas</h2>
        <div className="relative">
          <div className="flex overflow-x-hidden">
            {products.map((product, index) => (
              <Card key={product.id} className="w-full max-w-[250px] flex-shrink-0 mr-4 transition-transform duration-300 ease-in-out" style={{
                transform: `translateX(-${startIndex * 208}px)`
              }}>
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-lg"
                    />
                  </div>
                  <h3 className="text-sm font-semibold mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 line-through">
                      R$ {product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm font-bold">
                      R$ {product.discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-xs font-semibold text-green-600">
                      {product.discountPercentage}% OFF
                    </span>
                    <span className="text-xs text-green-600">
                      Frete grátis
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-white"
            onClick={prevProduct}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-white"
            onClick={nextProduct}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}