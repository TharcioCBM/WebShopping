import React, { useState } from 'react';
//import { useRouter } from 'next/navigation';
import Wrapper from '../../wrappers/ModalWrappers';
import CloseButton from '../../common/ClosedButton';
import InputField from '../../common/InputField';
import ActionButton from '../../common/ActionButton';
import { useAuth } from '@/app/contexts/AuthContext';

interface LoginModalProps {
  onClose: () => void;
  onRegisterClick: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onRegisterClick }) => {
  //const router = useRouter();
  const { login } = useAuth();
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
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.token, data.user);
        onClose();
      } else {
        const errorData = await res.json();
        setError(errorData.error_message || 'Usuário e/ou senha inválidos');
      }
    } catch (err) {
      console.error(err);
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
        <InputField
          id="username"
          label="Usuário"
          placeholder="ex.: tercio@email.com"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="mb-2">
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

          <a href="#" className="text-sm text-gray-500 hover:text-gray-800 mt-1 block">
            Esqueceu a senha
          </a>
        </div>



        <ActionButton
          label={loading ? 'Logando...' : 'Login'}
          type="submit"
          variant="primary"
          onClick={handleSubmit}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>

      <p className="w-full flex items-center justify-center text-sm text-gray-500 mt-5">
        Não tem conta?{' '}
        <a href="#" className="text-indigo-500 hover:text-indigo-700" onClick={onRegisterClick}>
          cadastre-se
        </a>
      </p>
    </Wrapper>
  );
};
export default LoginModal;
