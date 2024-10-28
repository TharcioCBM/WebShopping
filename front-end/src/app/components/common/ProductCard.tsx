import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  name: string
  imageUrl: string
  oldPrice: number
  price: number
  discount: number
  shipping: string
}

export default function ProductCard({
  name,
  imageUrl,
  oldPrice,
  price,
  discount,
  shipping
}: ProductCardProps) {
  return (
    <Card className="rounded-lg border w-full max-w-[250px]">
      <CardContent className="p-4">
        <div className="aspect-square relative mb-4">
          <Image
            src={imageUrl}
            alt={name}
            priority={true}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <h3 className="text-sm font-semibold mb-2 line-clamp-2">{name}</h3>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 line-through">
            R$ {oldPrice}
          </span>
          <span className="text-lg font-bold">
            R$ {price}
          </span>
          <div className="flex items-center mt-1">
            <span className="text-sm font-semibold text-green-600 mr-2">
              {discount}% OFF
            </span>

            <span className="text-xs text-green-600 font-medium">
              {shipping}
            </span>

          </div>
        </div>
      </CardContent>
    </Card>
  )
}