/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import { useRouter } from 'next/navigation';
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

interface FeaturedProductsSectionProps {
  products: Product[];
}

export default function FeaturedProductsSection({ products }: FeaturedProductsSectionProps) {
  const [startIndex, setStartIndex] = useState(0)
  const router = useRouter();

  const nextProduct = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % products.length)
  }

  const prevProduct = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length)
  }

  const handleClick = (productId: string) => {
    router.push(`/ProductDetail?id=${encodeURIComponent(productId)}`);
  };

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <section className="relative w-full bg-transparent px-0 py-8">
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

  return (
    <section className="relative w-full bg-transparent px-0 py-8">
      <div className="container mx-auto px-4">
        <div className="relative flex overflow-x-hidden items-center space-x-4">
          {products.map((product, index) => (
            <Card
              key={product.id}
              onClick={() => handleClick(product.id)}
              className="rounded-lg border w-full max-w-[250px] h-full min-h-[418px] flex-shrink-0 transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${startIndex * 254}px)`
              }}
            >
              <CardContent className="p-4 flex flex-col h-full">
                <div className="aspect-square relative mb-4 w-full flex items-center justify-center">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    layout="fixed"
                    width={96}
                    height={110}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-sm font-semibold mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 line-through">
                  R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2  })}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-bold">
                    R$ {(product.price * (1 - product.offer / 100)).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2  })}
                    </span>
                    <span className="text-xs font-semibold text-green-600">
                      {product.offer}%OFF
                    </span>
                  </div>
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
          aria-label="Previous product"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-white"
          onClick={nextProduct}
          aria-label="Next product"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
