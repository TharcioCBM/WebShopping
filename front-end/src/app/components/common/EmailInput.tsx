// components/EmailInput.tsx
import React, { useState } from 'react';

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ value, onChange }) => {
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(value)) {
      setEmailError('Por favor, insira um e-mail válido.');
    } else {
      setEmailError('');
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-1">
        Email
      </label>
      <input
        type="email"
        id="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleEmailBlur}
        placeholder="ex.: tercio@email.com"
        className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
    </div>
  );
};

export default EmailInput;
