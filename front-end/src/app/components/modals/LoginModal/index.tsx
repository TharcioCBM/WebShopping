import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Wrapper from '../../wrappers/ModalWrappers';
import CloseButton from '../../common/ClosedButton';
import { FaEye, FaEyeSlash  } from 'react-icons/fa';

interface LoginModalProps {
  onClose: () => void;
  onRegisterClick: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onRegisterClick }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username,password }),
      });
      if (res.ok) {
        
        const data = await res.json();
        localStorage.setItem('token', data.token); 
        router.push('/');
        console.log(data.message);

      } else {

        const errorData = await res.json();
        console.log('Error Data:', errorData);
        setError(errorData.error_message);
        setError(errorData.error_message || errorData.message || "Usuário e/ou senha inválidos");
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      
      <CloseButton onClose={onClose} />

      <h2 className="text-2xl font-bold text-gray-900 mb-1">Bem-vindo ao markFree</h2>
      <p className="text-sm text-gray-500 mb-5">
        Seja bem-vindo ao nosso site de vendas online! Explore o melhor site de vendas online
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
            Usuário
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ex.: tercio@email.com"
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-1">
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Logando...' : 'Login'}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

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
