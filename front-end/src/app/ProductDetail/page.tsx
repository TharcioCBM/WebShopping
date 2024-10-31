"use client"
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft } from "lucide-react"

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(0)

  const product = {
    name: "Samsung Galaxy A25 5g Dual SIM 256GB Verde claro 8GB RAM",
    price: 1281,
    oldPrice: 2248.34,
    discount: 42,
    images: [
      "https://http2.mlstatic.com/D_NQ_NP_895584-MLA79727741653_102024-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_886358-MLA79983835183_102024-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_952239-MLA79480834218_102024-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_617465-MLA79727849219_102024-O.webp",
    ],
    features: [
      "Compatível com redes 5G.",
      "Tela Super AMOLED de 6.5\".",
      "Tem 3 câmeras traseiras de 50Mpx/8Mpx/2Mpx.",
      "Câmera frontal de 13Mpx.",
      "Bateria de 5000mAh.",
      "Memória interna de 256GB.",
      "8GB de RAM.",
    ],
    description: "POTÊNCIA, DESEMPENHO E ESTILO EM SUAS MÃOS!\n\nCom o Samsung Galaxy A25 5G de 256GB de armazenamento, você terá em mãos um smartphone poderoso e versátil. Equipado com tecnologia 5G, este dispositivo oferece velocidades de conexão impressionantes para que você possa desfrutar de downloads rápidos e streaming sem interrupções. Para garantir sua segurança, ele possui verificação dupla pelo sensor de impressão digital lateral. Além disso, com seu processador Exynos 1280 de 2.4GHz, você terá um desempenho ágil e eficiente em todas as suas tarefas.",
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="flex items-center text-blue-600 hover:underline mb-4">
        <ChevronLeft size={20} />
        <span>Voltar</span>
      </Link>

      <div className="bg-white rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="flex flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col space-y-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`border-2 rounded-md p-1 bg-white transition-all ${
                  selectedImage === index ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Image 
                  src={img} 
                  alt="A25" 
                  width={60} 
                  height={60}
                  className="object-contain"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-white p-4 rounded-lg shadow-sm">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-lg object-contain w-full"
            />
          </div>
        </div>


        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-700">{product.name}</h1>
            <div className="flex flex-wrap items-baseline gap-2 mb-4">
              <span className="text-2xl font-semibold">
                R$ {product.price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                R$ {product.oldPrice.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-green-600">
                {product.discount}% OFF no PIX
              </span>
            </div>
          </div>

          <Card className="shadow-none border-none">
            <CardContent className="p-6 px-0">
              <h2 className="font-semibold mb-3">Características principais</h2>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-green-600">•</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button className="w-full bg-[#333137] hover:bg-[#333137]/90 text-white">
              Comprar
            </Button>
            <Button className="w-full bg-slate-200 hover:bg-slate-300 text-gray-700">
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
            {product.description}
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