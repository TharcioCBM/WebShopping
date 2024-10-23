// pages/index.tsx
"use client";
import Head from 'next/head';
import { useState } from 'react';
import Header from '../app/components/Header';
import LoginModal from '../app/components/modals/LoginModal'; 
import RegisterModal from '../app/components/modals/RegisterModal'; 

export default function Home() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  
  const toggleLoginModal = () => {
    setLoginModalOpen(!isLoginModalOpen);
  };

  const toggleRegisterModal = () => {
    setRegisterModalOpen(!isRegisterModalOpen);
  };

  
  const handleRegisterClickFromLogin = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  
  const handleLoginClickFromRegister = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  return (
    <div>
      <Head>
        <title>Login - MarkFree</title>
        <meta name="description" content="Login page for markFree" />
      </Head>

      {/* Header */}
      <Header onRegisterClick={toggleRegisterModal} />

      {/* Modais */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <LoginModal onClose={toggleLoginModal} onRegisterClick={handleRegisterClickFromLogin} />
        </div>
      )}

      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <RegisterModal onClose={toggleRegisterModal} onLoginClick={handleLoginClickFromRegister} />
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto py-10">
        <p className="text-center text-gray-500"></p>
      </main>
    </div>
  );
}