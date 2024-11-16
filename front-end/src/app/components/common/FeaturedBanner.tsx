"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Star, ShoppingCart, Heart, X } from "lucide-react"

export default function FeaturedBanner() {
  const [isLiked, setIsLiked] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <Card className="w-full overflow-hidden shadow-xl bg-gradient-to-br from-gray-900 to-black/75 relative min-h-[400px]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />
      
      <CardContent className="p-0 flex flex-col lg:flex-row items-stretch relative z-10">
        
        {/* Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/3 p-6 lg:p-8 text-white flex flex-col justify-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Notebook Gamer de Alta Performance
          </h2>
          <p className="text-sm lg:text-base mb-4 text-gray-300">
            Eleve Seu Desempenho e Domine Cada Partida com Precisão e Potência Incomparáveis
          </p>
          <ul className="mb-4 text-xs lg:text-sm space-y-3">
            {['Processador Intel Core i9', 'NVIDIA RTX 3080 8GB', 'SSD NVMe 1TB', '32GB RAM DDR4'].map((feature, index) => (
              <motion.li 
                key={index} 
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ChevronRight className="mr-2 h-4 w-4 text-blue-300" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </ul>
          <div className="flex items-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-xs text-gray-300">(128 avaliações)</span>
          </div>
          <div className="flex space-x-4">
            <Button 
              className="bg-blue-800 hover:bg-blue-900 text-white transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={() => setShowModal(true)}
            >
              <ShoppingCart className="mr-2 h-3 w-3" /> Comprar Agora
            </Button>
          </div>
        </motion.div>

        {/* Centered Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/3 flex flex-col place-content-center h-[300px] lg:h-[400px]"
        >
          <div className="relative w-full h-full">
            <Image
              src="https://cdn.thepcenthusiast.com/wp-content/uploads/2023/03/Lenovo-LOQ-RTX-40-Gaming-Laptops.jpg"
              alt="Notebook Gamer de Alta Performance"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </motion.div>

        {/* Price and Offer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/3 lg:absolute bottom-6 right-6 mt-6 lg:mt-0 mx-6 lg:mx-0 text-white bg-black/30 p-4 rounded-xl shadow-lg backdrop-blur-sm z-20 flex flex-col place-content-center"
        >
          <Badge className="mb-1 bg-green-500">Oferta Especial</Badge>
          <p className="text-base font-semibold mb-1">Preço Promocional</p>
          <p className="text-3xl font-bold mb-1">R$ 5.999,00</p>
          <p className="text-xs mb-2">ou 12x de R$ 499,92 sem juros</p>
          <Badge variant="outline" className="text-green-400 border-green-400">
            Frete Grátis
          </Badge>
          <p className="mt-2 text-xs text-gray-300">
            *Oferta válida por tempo limitado
          </p>
        </motion.div>
      </CardContent>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Finalizar Compra</h3>
                <Button variant="ghost" onClick={() => setShowModal(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="mb-4">Seu produto foi adicionado ao carrinho. Deseja finalizar a compra?</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowModal(false)}>Continuar Comprando</Button>
                <Button className="bg-[#333137] hover:bg-[#333137]/90 text-white">Ir para o Carrinho</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}