"use client";

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AccountMenu from './AccountMenu';

interface AccountButtonProps {
  className?: string;
}

const AccountButton: React.FC<AccountButtonProps> = ({ className = '' }) => {
  const { user, isAuthenticated } = useAuth();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!accountMenuOpen);
  };

  return (
    <>
      <button 
        className={`text-white ${className}`}
        onClick={toggleAccountMenu}
        aria-label="Account menu"
      >
        {isAuthenticated ? (
          <div className="w-8 h-8 rounded-full bg-[#0095d8] flex items-center justify-center text-white font-bold">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/>
            <path d="M4 20C4 17.7909 6.79086 16 10 16H14C17.2091 16 20 17.7909 20 20" stroke="white" strokeWidth="2"/>
          </svg>
        )}
      </button>
      
      <AccountMenu isOpen={accountMenuOpen} onClose={() => setAccountMenuOpen(false)} />
    </>
  );
};

export default AccountButton; 