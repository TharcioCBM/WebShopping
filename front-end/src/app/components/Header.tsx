import React from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';

interface HeaderProps {
  onRegisterClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onRegisterClick }) => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          MarkFree
        </div>

        {/* Barra de Pesquisa */}
        <div className="relative flex-grow mx-8 max-w-lg">
          <input
            type="text"
            placeholder="Pesquisar produtos"
            className="w-full border border-gray-300 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-400"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>

        {/* Links de Navegação */}
        <nav className="flex items-center space-x-8">
          <a href="/" className="text-gray-600 hover:text-gray-900">
            Home
          </a>
          <a href="/categorias" className="text-gray-600 hover:text-gray-900">
            Categorias
          </a>
          <a href="/ofertas" className="text-gray-600 hover:text-gray-900">
            Ofertas
          </a>
        </nav>

        {/* Ações (Criar Conta e Carrinho) */}
        <div className="flex items-center space-x-4">

          <button
            onClick={onRegisterClick}
            className="text-gray-700 hover:text-gray-900"
          >
            Criar conta
          </button>

          <a href="/carrinho" className="relative">
            <FaShoppingCart className="text-gray-600 hover:text-gray-900" size={20} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
