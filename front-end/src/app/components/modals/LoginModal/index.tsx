// components/LoginModal.tsx
import React, { useState } from 'react';
import Wrapper from '../../wrappers/ModalWrappers';
import CloseButton from '../../common/ClosedButton';
import { AiOutlineGoogle } from 'react-icons/ai';
import { FaEye, FaEyeSlash  } from 'react-icons/fa';

interface LoginModalProps {
  onClose: () => void;
  onRegisterClick: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onRegisterClick }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Wrapper>
      {/* Botão de Fechar */}
      <CloseButton onClose={onClose} />

      {/* Título e subtítulo */}
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Bem-vindo ao markFree</h2>
      <p className="text-sm text-gray-500 mb-5">
        Seja bem-vindo ao nosso site de vendas online! Explore o melhor site de vendas online
      </p>

      {/* Formulário de Login */}
      <form>
        {/* Campo de Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="ex.: tercio@email.com"
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Campo de Senha */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Digite sua senha"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
            >
              {showPassword ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </button>
          </div>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-800 mt-1 block">
            Esqueceu a senha
          </a>
        </div>

        {/* Botão de Login */}
        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Login
        </button>

        {/* Separador */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-400">Ou</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Botão de Login com Google */}
        <button
          type="button"
          className="w-full flex items-center justify-center bg-gray-200 text-gray-600 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
        >
          <AiOutlineGoogle className="w-5 h-5 mr-2" />
          Entre com Google
        </button>
      </form>

      {/* Link para registro */}
      <p className="w-full flex items-center justify-center text-sm text-gray-500 mt-5">
        Não tem conta? {' '}
        <a href="#" className="text-indigo-500 hover:text-indigo-700" onClick={onRegisterClick}>
          cadastre-se
        </a>
      </p>
    </Wrapper>
  );
};

export default LoginModal;
