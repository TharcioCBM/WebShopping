// components/Wrapper.tsx
import React from 'react';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
      {children}
    </div>
  );
};

export default Wrapper;
