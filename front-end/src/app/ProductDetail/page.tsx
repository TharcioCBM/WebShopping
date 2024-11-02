"use client"
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft } from "lucide-react"
import { useCart } from '../contexts/CartContext'

interface Product {
  id: string
  name: string
  images: string[]
  price: number
  offer: number
  specifications: string[]
  description: string;
}

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0)
  const searchParams = useSearchParams()
  const productId = searchParams?.get('id') ?? ''
  const [productsData, setProductsData] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`/api/products/products?x-product-id=${productId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          const data = await res.json();
          setProductsData(data.request_data);
        } else {
          console.error('Erro ao buscar produtos:', res.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, [productId]);

  if (!productsData)
    return (
      <div className="container mx-auto px-4 py-4 animate-pulse">
        <div className="h-8 w-32 bg-gray-200 rounded mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-96 bg-gray-200 rounded" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-gray-200 rounded" />
            <div className="h-6 w-1/4 bg-gray-200 rounded" />
            <div className="h-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );

  const discountedPrice = productsData.price * (1 - productsData.offer / 100);

  const handleAddToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...currentCart, { ...productsData, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    addToCart({
      id: productsData.id,
      name: productsData.name,
      images: productsData.images,
      price: productsData.price,
      quantity: 1,
    });
  };


  return (
    <div className="container justify-items-center mb-4 mx-auto px-4 py-4">
      <Link href="#" onClick={() => window.history.go(-1)} className="flex items-center text-blue-600 hover:underline mb-2 min-w-[1024px]">
        <ChevronLeft size={20} />
        <span>Voltar</span>
      </Link>

      <div className="bg-white rounded-lg p-5 w-full sm:w-[640px] md:w-[768px] lg:w-[1024px] mx-auto content-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-0">
          {/* Product Images */}
          <div className="flex pt-0 flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col place-content-center space-y-2">
              {productsData.images?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-md p-1 bg-white transition-all ${selectedImage === index ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <Image
                    src={img}
                    alt="A25"
                    width={60}
                    height={60}
                    className="object-contain min-h-[60px] min-w-[60px] max-h-[60px] max-w-[60px]"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 place-content-center max-w-[358px] max-h-[400px] min-h-[300px] min-w-[250px] sm:max-w-[300px] sm:max-h-[350px] md:max-w-[358px] md:max-h-[400px] bg-white p-4 rounded-lg shadow-sm">
              <Image
                src={productsData.images[selectedImage]}
                alt={productsData.name}
                layout="fixed"
                width={400}
                height={500}
                className="rounded-lg object-contain w-full max-h-[400px]"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-700">{productsData.name}</h1>
              <div className="flex flex-wrap items-baseline gap-2 mb-4">
                <span className="text-2xl font-semibold">
                  R$ {discountedPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  R$ {productsData.price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-sm font-semibold text-green-600">
                  {productsData.offer}% OFF
                </span>
              </div>
            </div>

            <Card className="shadow-none border-none">
              <CardContent className="p-2 px-0">
                <h2 className="font-semibold mb-3">Características principais</h2>
                <ul className="space-y-2">
                  {productsData.specifications?.map((specification, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-sky-950">•</span>
                      <span className="text-gray-700">{specification}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button className="w-full bg-[#333137] hover:bg-[#333137]/90 text-white">
                Comprar
              </Button>
              <Button onClick={handleAddToCart} className="w-full bg-slate-200 hover:bg-slate-300 text-gray-700">
                Adicionar ao carrinho
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <Card className="mt-8 shadow-none border-none">
          <CardContent className="p-6 px-0">
            <h2 className="text-xl font-bold mb-4">Descrição</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {productsData.description}
            </p>
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card className="mt-8 shadow-none border-none">
          <CardContent className="p-6 px-0">
            <h2 className="text-xl font-bold mb-4">Opiniões do produto</h2>
            <p className="text-gray-600 mb-4">
              Deixe sua opinião sobre o produto abaixo
            </p>
            <form className="space-y-4">
              <Textarea
                placeholder="Sua opinião"
                className="min-h-[100px]"
              />
              <Button type="submit">
                Enviar
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

