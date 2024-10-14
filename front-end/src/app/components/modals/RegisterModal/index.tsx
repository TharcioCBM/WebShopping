import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AiOutlineGoogle } from 'react-icons/ai';
import ModalWrapper from '../../wrappers/ModalWrappers';
import EmailInput from '../../common/EmailInput';
import CloseButton from '../../common/ClosedButton';


interface RegisterModalProps {
  onClose: () => void;
  onLoginClick: () => void;

}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, onLoginClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <ModalWrapper>

      <CloseButton onClose={onClose} />

      {/* Título */}
      <h2 className="text-xl font-bold text-gray-800 mb-1">Bem-vindo ao markFree</h2>
      <p className="text-sm text-gray-500 mb-6">
        Seja bem-vindo ao nosso site de vendas online! Explore o melhor site de vendas online.
      </p>

      {/* Formulário */}
      <form>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">
            Nome
          </label>
          <input
            type="text"
            id="name"
            placeholder="ex.: Tércio"
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>


        <EmailInput value={email} onChange={setEmail} />

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
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>


        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Cadastrar
        </button>

        {/* Divisor Ou */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="mx-2 text-gray-400">Ou</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>


        <button
          type="button"
          className="w-full flex items-center justify-center bg-gray-200 text-gray-600 py-2 rounded-lg hover:bg-gray-300 transition duration-300"
        >
          <AiOutlineGoogle size={24} className="mr-2" />
          Cadastre-se com Google
        </button>

        <p className="w-full flex items-center justify-center text-sm text-gray-500 mt-5">
          Já tem conta? {' '}
          <a href="#" className="text-indigo-500 hover:text-indigo-700" onClick={onLoginClick}>
            faça login
          </a>
        </p>

      </form>
    </ModalWrapper>
  );
};

export default RegisterModal;
