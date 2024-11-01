"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Search } from "lucide-react"
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';
import { useCart } from '../contexts/CartContext';
import CategoriesDropdown from './common/CategoriesDropdown';

const NavBar: React.FC = () => {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const { cart } = useCart();
    const [cartCount, setCartCount] = useState(0);


    const toggleLoginModal = () => setLoginModalOpen(!isLoginModalOpen);
    const toggleRegisterModal = () => setRegisterModalOpen(!isRegisterModalOpen);

    const handleRegisterClickFromLogin = () => {
        setLoginModalOpen(false);
        setRegisterModalOpen(true);
    };

    const handleLoginClickFromRegister = () => {
        setRegisterModalOpen(false);
        setLoginModalOpen(true);
    };


    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        router.push(`/searchResults?q=${encodeURIComponent(searchQuery)}`);
    };

    const handleCartClick = () => {
        router.push("/shoppingCart");
      };

      useEffect(() => {
        setCartCount(cart ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0);
    }, [cart]); 


    return (
        <nav className="bg-white border shadow-sky-950/90 m-0 p-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-2xl font-semibold text-gray-600">MarkFree</span>
                        </Link>
                    </div>
                    <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                        <div className="max-w-lg w-full lg:max-w-xs">
                            <label htmlFor="search" className="sr-only">Search products</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                                <form onSubmit={handleSearch}>
                                    <Input
                                        id="search"
                                        name="search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                        placeholder="Pesquisar produtos"
                                        type="search"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <div className="flex space-x-4">
                            <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                Home
                            </Link>
                            <CategoriesDropdown />
                            <Link href="/ofertas" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                Ofertas
                            </Link>
                        </div>
                        <Button variant="ghost" onClick={toggleRegisterModal} className="ml-4 text-gray-500 hover:text-gray-700">
                            Criar conta
                        </Button>
                        <Button variant="ghost" className="border ml-4 text-gray-500 hover:text-gray-700" aria-label="Shopping cart" onClick={handleCartClick}>
                            <ShoppingCart className="h-6 w-6" />
                            <span className="ml-1">{cartCount}</span>
                        </Button>
                    </div>
                </div>
            </div>
            {isLoginModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <LoginModal onClose={toggleLoginModal} onRegisterClick={handleRegisterClickFromLogin} />
                </div>
            )}
            {isRegisterModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <RegisterModal onClose={toggleRegisterModal} onLoginClick={handleLoginClickFromRegister} />
                </div>
            )}
        </nav>
    );
};

export default NavBar;

