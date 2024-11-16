"use client"
import { useEffect, useState } from 'react';
import { ShoppingCart } from '../components/common/shoppingCart'
import { PurchaseSummary } from '../components/common/purchaseSummary'
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext'
import LoginModal from '../components/modals/LoginModal';


export default function CartPage() {
    const { isAuthenticated } = useAuth();
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const { removeFromCart, updateCart } = useCart();
    const [items, setItems] = useState<Product[]>([]);

    useEffect(() => {
      const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
      setItems(savedCart);
    }, []);

    const handleUpdateQuantity = (id: string, quantity: number) => {
      const updatedItems = items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      setItems(updatedItems);
      updateCart(updatedItems[0]);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const handleRemoveItem = (id: string) => {
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
      removeFromCart(id);
      localStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const handleCheckout = () => {

    };

    const subtotal = items.reduce((acc, item) => {
      const discount = item.price * (1 - item.offer / 100)
      return acc + discount * item.quantity
    },0);
    const discount = items.reduce((acc, item) => acc + item.offer * item.quantity, 0);

    if (!isAuthenticated) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Acesso Restrito</h2>
            <p className="text-gray-600 mb-6">Para visualizar seu carrinho, é necessário fazer login ou se cadastrar</p>
            <div className="space-x-4">
              <button
                onClick={() => setLoginModalOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Fazer Login
              </button>
            </div>
          </div>
          {isLoginModalOpen && (
            <LoginModal
              onClose={() => setLoginModalOpen(false)}
              onRegisterClick={() => {/* handle register click */}}
            />
          )}
        </div>
      );
    }

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
              discount={discount}
              total={subtotal}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    );
}