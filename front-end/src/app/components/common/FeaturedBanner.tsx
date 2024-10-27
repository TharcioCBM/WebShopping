import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Star } from "lucide-react"

export default function FeaturedBanner() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card 
      className="w-full overflow-hidden shadow-xl transform transition duration-300 hover:shadow-2xl" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row items-stretch relative">
          {/* Left Content Section */}
          <motion.div 
            className="w-full lg:w-1/2 p-6 lg:p-12 bg-gradient-to-br from-blue-950 via-indigo-900 to-indigo-700 text-white flex flex-col justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 tracking-tight leading-tight">
              Notebook Gamer de Alta Performance
            </h2>
            <p className="text-lg lg:text-xl mb-6 text-gray-200">
              Eleve Seu Desempenho e Domine Cada Partida
            </p>
            <ul className="mb-6 text-sm lg:text-base space-y-3">
              {['Processador de última geração', 'Placa de vídeo dedicada', 'SSD de alta velocidade'].map((feature, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <ChevronRight className="mr-2 h-5 w-5 text-blue-300" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
              <span className="ml-2 text-sm text-gray-200">(128 avaliações)</span>
            </div>
            <Button 
              size="lg"
              className="bg-white hover:bg-gray-100 text-blue-900 font-semibold px-6 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Saiba Mais
            </Button>
          </motion.div>

          {/* Right Image Section */}
          <div className="relative w-full lg:w-1/2 h-64 lg:h-auto overflow-hidden">
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Image
                src="https://http2.mlstatic.com/D_NQ_NP_918102-MLB76348263758_052024-O.webp"
                alt="Gaming Notebook"
                layout="fill"
                objectFit="cover"
                className="rounded-b-xl lg:rounded-r-xl lg:rounded-bl-none"
              />
            </motion.div>
            
            {/* Disguise Element */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply" />
            <div 
              className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400')] bg-repeat opacity-10"
              style={{ backgroundSize: '100px 100px' }}
            />
            
            {/* Price Info */}
            <motion.div 
              className="absolute bottom-6 left-6 text-white backdrop-blur-sm bg-black/40 p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-lg font-semibold mb-1">Preço Promocional</p>
              <p className="text-3xl font-bold mb-1">R$ 5.999,00</p>
              <p className="text-sm">ou 12x de R$ 499,92 sem juros</p>
              <div className="mt-2 text-xs bg-green-500 text-white px-2 py-1 rounded-full inline-block">
                Frete Grátis
              </div>
            </motion.div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}