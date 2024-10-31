"use client"

import { useState } from 'react'
import { ShoppingCart } from '../components/common/shoppingCart'
import { PurchaseSummary } from '../components/common/purchaseSummary'

export default function CartPage() {
    const [items, setItems] = useState([
      {
        id: '1',
        name: 'Samsung Galaxy A25 5g Dual SIM 256GB Verde claro 8GB RAM',
        image: 'https://http2.mlstatic.com/D_NQ_NP_746733-MLU74996478795_032024-O.webp',
        price: 2248.34,
        quantity: 1,
      }
    ])
  
    const handleUpdateQuantity = (id: string, quantity: number) => {
      setItems(items.map(item => 
        item.id === id ? { ...item, quantity } : item
      ))
    }
  
    const handleRemoveItem = (id: string) => {
      setItems(items.filter(item => item.id !== id))
    }
  
    const handleCheckout = () => {
      console.log('Proceeding to checkout')
    }
  
    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
    const discount = 967.24
    const total = subtotal - discount
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ShoppingCart 
              items={items}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>
          <div>
            <PurchaseSummary
              subtotal={subtotal}
              discount={discount}
              total={total}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    )
  }