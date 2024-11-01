/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"


interface Product {
  id: string;
  name: string;
  price: number;
  offer: number;
  images: { url: string }[];
  shipping: string;
  description: string;
}

interface ofertasSectionSectionProps {
  products: Product[];
}

export default function OfertasSection({products }: ofertasSectionSectionProps) {
  const [startIndex, setStartIndex] = useState(0)
  const router = useRouter();

  const nextProduct = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  const prevProduct = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <section className="py-12 my-5 rounded-lg container bg-white mx-auto px-4">
        <div className="container mx-auto p-4 flex space-x-4 overflow-hidden">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <div
              key={index}
              className="w-full max-w-[250px] rounded-lg bg-gray-200 animate-pulse shadow-lg p-4"
            >
              <div className="aspect-square bg-gray-300 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-2/3"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const handleClick = (productId: string) => {
    router.push(`/ProductDetail?id=${encodeURIComponent(productId)}`);
  };

  return (
    <section className="py-12">
      <div className="rounded-lg container bg-white mx-auto px-4">
        <h2 className="text-2xl font-bold pt-4 mb-6">Ofertas</h2>
        <div className="relative">
          <div className="flex overflow-x-hidden">
            {products.map((product, index) => (
              <Card key={product.id} onClick={() => handleClick(product.id)} className="w-full max-w-[250px] flex-shrink-0 mr-4 transition-transform duration-300 ease-in-out" style={{
                transform: `translateX(-${startIndex * 208}px)`
              }}>
                <CardContent className="p-4">
                  <div className="aspect-square relative mb-4">
                    <Image
                      src={product.images[0]}
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
                    R$ {product.price.toFixed(2)}
                    </span>
                    <span className="text-sm font-bold">
                    R$ {(product.price * (1 - (product.offer / 100))).toFixed(2)}
                    </span>
                    <span className="text-xs font-semibold text-green-600">
                      {product.offer}% OFF
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