"use client"
import { useEffect, useState } from 'react';
import { ShoppingCart } from '../components/common/shoppingCart'
import { PurchaseSummary } from '../components/common/purchaseSummary'
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
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