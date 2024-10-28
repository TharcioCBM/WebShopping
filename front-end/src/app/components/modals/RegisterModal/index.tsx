import React, { useState } from 'react';
<<<<<<< HEAD
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ModalWrapper from '../../wrappers/ModalWrappers';
//import EmailInput from '../../common/EmailInput';
import CloseButton from '../../common/ClosedButton';

=======
import { useRouter } from 'next/navigation';
import ModalWrapper from '../../wrappers/ModalWrappers';
import CloseButton from '../../common/ClosedButton';
import InputField from '../../common/InputField';
import EmailInput from '../../common/EmailInput';
import ActionButton from '../../common/ActionButton';
>>>>>>> 3c7f000343a1c14e34d741b6ddf9981fdd41a9ab

interface RegisterModalProps {
  onClose: () => void;
  onLoginClick: () => void;
<<<<<<< HEAD

}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, onLoginClick }) => {
=======
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, onLoginClick }) => {
  const router = useRouter();
>>>>>>> 3c7f000343a1c14e34d741b6ddf9981fdd41a9ab
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
<<<<<<< HEAD
        // Cadastro bem-sucedido
        const data = await res.json();
        console.log(data.message);
      } else {
        // Erro durante o cadastro
        const errorData = await res.json();
        setError(errorData.message);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
=======
        const data = await res.json();
        router.push('/');
        console.log(data.message);
      } else {
        const errorData = await res.json();
        setError(errorData.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
>>>>>>> 3c7f000343a1c14e34d741b6ddf9981fdd41a9ab
    } catch (err) {
      setError('Erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD

  return (
    <ModalWrapper>

      <CloseButton onClose={onClose} />

      {/* Título */}
=======
  return (
    <ModalWrapper>
      <CloseButton onClose={onClose} />

>>>>>>> 3c7f000343a1c14e34d741b6ddf9981fdd41a9ab
      <h2 className="text-xl font-bold text-gray-800 mb-1">Bem-vindo ao markFree</h2>
      <p className="text-sm text-gray-500 mb-6">
        Seja bem-vindo ao nosso site de vendas online! Explore o melhor site de vendas online.
      </p>

<<<<<<< HEAD
      {/* Formulário */}
      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-medium mb-1">
            Nome de usuário
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="ex.: Tércio"
            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>


        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
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
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
=======
      <form onSubmit={handleSubmit}>
        <InputField
          id="username"
          label="Nome de usuário"
          placeholder="ex.: Tércio"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <EmailInput
          value={email}
          onChange={(value) => setEmail(value)}
        />

        <InputField
          id="password"
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          showPassword={showPassword}
          togglePasswordVisibility={() => setShowPassword(!showPassword)}
        />

        <ActionButton
          label={loading ? 'Cadastrando...' : 'Cadastrar'}
          type="submit"
          variant="primary"
          onClick={handleSubmit}
        />
>>>>>>> 3c7f000343a1c14e34d741b6ddf9981fdd41a9ab

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <p className="w-full flex items-center justify-center text-sm text-gray-500 mt-5">
<<<<<<< HEAD
          Já tem conta? {' '}
=======
          Já tem conta?{' '}
>>>>>>> 3c7f000343a1c14e34d741b6ddf9981fdd41a9ab
          <a href="#" className="text-indigo-500 hover:text-indigo-700" onClick={onLoginClick}>
            faça login
          </a>
        </p>
<<<<<<< HEAD

=======
>>>>>>> 3c7f000343a1c14e34d741b6ddf9981fdd41a9ab
      </form>
    </ModalWrapper>
  );
};

export default RegisterModal;
