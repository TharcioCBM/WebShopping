import React, { useState } from 'react';
//import { useRouter } from 'next/navigation';
import ModalWrapper from '../../wrappers/ModalWrappers';
import CloseButton from '../../common/ClosedButton';
import InputField from '../../common/InputField';
import EmailInput from '../../common/EmailInput';
import ActionButton from '../../common/ActionButton';
import { useAuth } from '@/app/contexts/AuthContext';

interface RegisterModalProps {
  onClose: () => void;
  onLoginClick: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose, onLoginClick }) => {
  //const router = useRouter();
  const { login } = useAuth();
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
        const data = await res.json();
        login(data.token, data.user);
        onClose();
        console.log(data.message);
      } else {
        const errorData = await res.json();
        setError(errorData.message);
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper>
      <CloseButton onClose={onClose} />

      <h2 className="text-xl font-bold text-gray-800 mb-1">Bem-vindo ao markFree</h2>
      <p className="text-sm text-gray-500 mb-6">
        Seja bem-vindo ao nosso site de vendas online! Explore o melhor site de vendas online.
      </p>

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

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <p className="w-full flex items-center justify-center text-sm text-gray-500 mt-5">
          Já tem conta?{' '}
          <a href="#" className="text-indigo-500 hover:text-indigo-700" onClick={onLoginClick}>
            faça login
          </a>
        </p>
      </form>
    </ModalWrapper>
  );
};

export default RegisterModal;
