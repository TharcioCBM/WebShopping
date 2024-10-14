// components/CloseButton.tsx
import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
      aria-label="Close"
    >
      <FaTimes size={20} />
    </button>
  );
};

export default CloseButton;
