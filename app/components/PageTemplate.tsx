"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProtectedRoute from './ProtectedRoute';
import AccountButton from './AccountButton';

interface PageTemplateProps {
  title: string;
  children: ReactNode;
  showBackButton?: boolean;
  showProtection?: boolean;
}

const PageTemplate: React.FC<PageTemplateProps> = ({ 
  title, 
  children, 
  showBackButton = true,
  showProtection = true
}) => {
  const content = (
    <div className="flex flex-col min-h-screen bg-[#1a2538] bg-opacity-80 bg-[url('/bg-pattern.jpg')] bg-cover overflow-y-auto pb-16">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-[#1a2538]">
        <button className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex-1 flex justify-center">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="KurdBetDax Logo" 
              width={150} 
              height={40} 
              className="object-contain cursor-pointer"
            />
          </Link>
        </div>
        <AccountButton />
      </header>

      {/* Back button and title */}
      {showBackButton && (
        <div className="flex items-center px-4 py-2">
          <Link href="/" className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-white text-lg font-medium mx-auto">{title}</h1>
        </div>
      )}

      {/* Content area */}
      <div className="flex-1 p-4">
        {children}
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav fixed bottom-0 w-full bg-[#1a2538] flex justify-around py-3">
        <Link href="/" className="bottom-nav-item flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3,12 L5,10 L12,3 L19,10 L21,12 L21,21 L3,21 L3,12 Z" stroke="#7fc9ff" fill="none" />
          </svg>
          <span className="text-xs mt-1 text-white">HOME PAGE</span>
        </Link>
        <Link href="/live-bets" className="bottom-nav-item flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ff0000" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="5" stroke="#ff0000" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-xs mt-1 text-white">LIVE</span>
        </Link>
        <Link href="/sport-bets" className="bottom-nav-item flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
            <path d="M7,7 L17,17 M7,17 L17,7" stroke="white" strokeWidth="2" />
          </svg>
          <span className="text-xs mt-1 text-white">SPORTS</span>
        </Link>
        <Link href="/coupon" className="bottom-nav-item flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="3" width="14" height="18" stroke="white" strokeWidth="2" fill="none" />
            <line x1="8" y1="8" x2="16" y2="8" stroke="white" strokeWidth="1" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="1" />
            <line x1="8" y1="16" x2="16" y2="16" stroke="white" strokeWidth="1" />
          </svg>
          <span className="text-xs mt-1 text-white">COUPON</span>
        </Link>
      </nav>
    </div>
  );

  return showProtection ? <ProtectedRoute>{content}</ProtectedRoute> : content;
};

export default PageTemplate; 