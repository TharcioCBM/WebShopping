import React from 'react';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  type?: 'submit' | 'button';
  variant?: 'primary' | 'secondary' | 'google';
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick, type = 'button', variant = 'primary' }) => {
  let buttonClass = 'w-full py-2 rounded-lg transition duration-300 ';

  switch (variant) {
    case 'primary':
      buttonClass += 'bg-gray-800 text-white hover:bg-gray-700';
      break;
    case 'secondary':
      buttonClass += 'bg-gray-200 text-gray-600 hover:bg-gray-300';
      break;
    case 'google':
      buttonClass += 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100';
      break;
  }

  return (
    <button type={type} onClick={onClick} className={buttonClass}>
      {label}
    </button>
  );
};

export default ActionButton;
