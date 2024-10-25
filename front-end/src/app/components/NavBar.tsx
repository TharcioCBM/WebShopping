"use client"
import React, { useState } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';

const NavBar: React.FC = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

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

  return (
    <header className="bg-white shadow-sm py-4 relative">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="text-2xl font-bold text-gray-800">MarkFree</div>
        
        <div className="relative flex-grow mx-8 max-w-lg">
          <input
            type="text"
            placeholder="Pesquisar produtos"
            className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>

        <nav className="flex items-center space-x-8">
          <a href="/" className="text-gray-600 hover:text-gray-900">Home</a>
          <a href="/categorias" className="text-gray-600 hover:text-gray-900">Categorias</a>
          <a href="/ofertas" className="text-gray-600 hover:text-gray-900">Ofertas</a>
        </nav>

        <div className="flex items-center space-x-4">
          <button onClick={toggleRegisterModal} className="text-gray-700 hover:text-gray-900">
            Criar conta
          </button>
          <a href="/carrinho" className="relative">
            <FaShoppingCart className="text-gray-600 hover:text-gray-900" size={20} />
          </a>
        </div>
      </div>

      {/* Modals */}
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
    </header>
  );
};

export default NavBar;
