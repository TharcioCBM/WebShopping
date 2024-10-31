import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItem {
  id: string
  name: string
  image: string
  price: number
  quantity: number
}

interface ShoppingCartProps {
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
}

export function ShoppingCart({ items, onUpdateQuantity, onRemoveItem }: ShoppingCartProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const handleDeselectItems = () => {
    selectedItems.forEach(id => onRemoveItem(id))
    setSelectedItems([])
  }

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium">Carrinho de compras</h2>
          <button 
            className="text-sm text-gray-500 hover:text-gray-700"
            onClick={handleDeselectItems}
            disabled={selectedItems.length === 0}
          >
            Desmarcar itens
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-600">Preço</span>
          <span className="text-xl font-medium">R$ {totalPrice.toFixed(2)}</span>
        </div>

        {items.map((item) => (
          <div key={item.id} className="border-t py-4">
            <div className="flex gap-4">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleItemSelection(item.id)}
                className="mt-1"
              />
              <div className="w-24 h-24 relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center border-t pt-4 mt-4">
          <span className="text-gray-600">Subtotal (Quantidade):</span>
          <span className="text-xl font-medium">R$ {totalPrice.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  )
}