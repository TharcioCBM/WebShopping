import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword?: boolean; // Para controle de visualização de senha
  togglePasswordVisibility?: () => void; // Função para alternar o ícone
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  placeholder,
  type,
  value,
  onChange,
  showPassword = false, // Define se é um campo de senha
  togglePasswordVisibility // Função para alternar visibilidade
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm font-medium mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded-lg py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {/* Condicional para mostrar o ícone de visualização de senha */}
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
          >
            {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
