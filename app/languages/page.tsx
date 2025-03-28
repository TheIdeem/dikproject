"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';

// Updated languages data to match screenshot
const languagesList = [
  {
    id: 'tr',
    name: 'Türkçe',
    flagComponent: (
      <div className="bg-red w-8 h-6 flex items-center justify-center rounded overflow-hidden">
        <div className="relative w-full h-full bg-red-600">
          <div className="absolute left.5 top-1/2 transform -translate-y-1/2 w-4 h-4">
            <div className="absolute w-3 h-3 bg-white rounded-full">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-red-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'de',
    name: 'Deutsch',
    flagComponent: (
      <div className="w-8 h-6 flex flex-col overflow-hidden rounded">
        <div className="h-1/3 bg-black"></div>
        <div className="h-1/3 bg-red-600"></div>
        <div className="h-1/3 bg-yellow-500"></div>
      </div>
    )
  },
  {
    id: 'en',
    name: 'English',
    flagComponent: (
      <div className="w-8 h-6 bg-blue-900 rounded overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-1 bg-white absolute"></div>
          <div className="w-1 h-full bg-white absolute"></div>
          <div className="w-full h-1.5 bg-red-600 absolute"></div>
          <div className="w-1.5 h-full bg-red-600 absolute"></div>
        </div>
      </div>
    )
  },
  {
    id: 'nl',
    name: 'Dutch',
    flagComponent: (
      <div className="w-8 h-6 flex flex-col overflow-hidden rounded">
        <div className="h-1/3 bg-red-600"></div>
        <div className="h-1/3 bg-white"></div>
        <div className="h-1/3 bg-blue-800"></div>
      </div>
    )
  },
  {
    id: 'ar',
    name: 'عربي',
    flagComponent: (
      <div className="w-8 h-6 bg-green-600 flex items-center justify-center rounded overflow-hidden">
        <span className="text-white text-xs">عر</span>
      </div>
    )
  },
  {
    id: 'az',
    name: 'Azərbaycan',
    flagComponent: (
      <div className="w-8 h-6 flex flex-col overflow-hidden rounded">
        <div className="h-1/3 bg-blue-500"></div>
        <div className="h-1/3 bg-red-600"></div>
        <div className="h-1/3 bg-green-600"></div>
      </div>
    )
  },
  {
    id: 'fr',
    name: 'Français',
    flagComponent: (
      <div className="w-8 h-6 flex overflow-hidden rounded">
        <div className="w-1/3 bg-blue-800"></div>
        <div className="w-1/3 bg-white"></div>
        <div className="w-1/3 bg-red-600"></div>
      </div>
    )
  },
  {
    id: 'pl',
    name: 'Polish',
    flagComponent: (
      <div className="w-8 h-6 flex flex-col overflow-hidden rounded">
        <div className="h-1/2 bg-white"></div>
        <div className="h-1/2 bg-red-600"></div>
      </div>
    )
  }
];

export default function LanguagesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0f1826]">
      {/* Header */}
      <header className="bg-[#1e2b3f] flex justify-between items-center p-3 border-b border-[#2a3847]">
        <button onClick={openSidebar} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <Link href="/" className="flex justify-center">
          <Image src="/logo/250x76.png" alt="KurdBetDax Logo" width={150} height={40} priority />
        </Link>
        
        <div className="text-white font-medium bg-black rounded px-2 py-1">
          0.00 USD
        </div>
      </header>

      {/* Back Button and Title Bar */}
      <div className="bg-[#1e2b3f] p-3 flex items-center">
        <Link href="/" className="mr-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <div className="text-white font-semibold">
          Languages
        </div>
      </div>

      {/* Languages List */}
      <div className="flex-grow bg-[#0f1826]">
        {languagesList.map((language) => (
          <Link 
            key={language.id} 
            href={`/?lang=${language.id}`}
            className="flex items-center px-4 py-3 border-b border-[#1e2b3f] text-white"
          >
            <div className="mr-4">
              {language.flagComponent}
            </div>
            <span className="text-white font-medium">
              {language.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Timer at bottom (overlay) */}
      <div className="fixed bottom-20 right-4 bg-[#1e2b3f] text-white px-3 py-1 rounded-md border border-gray-600 text-sm">
        00:47:57
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav flex justify-around py-3 bg-[#1e2b3f] border-t border-[#2a3847]">
        <Link href="/" className="bottom-nav-item text-center flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3,12 L5,10 L12,3 L19,10 L21,12 L21,21 L3,21 L3,12 Z" stroke="#7fc9ff" fill="none" strokeWidth="2" />
          </svg>
          <span className="text-xs text-[#7fc9ff] mt-1">HOME PAGE</span>
        </Link>
        <Link href="/live-bets" className="bottom-nav-item text-center flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ff0000" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="5" stroke="#ff0000" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-xs text-red-500 mt-1">LIVE</span>
        </Link>
        <Link href="/sport-bets" className="bottom-nav-item text-center flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
            <path d="M7,7 L17,17 M7,17 L17,7" stroke="white" strokeWidth="2" />
          </svg>
          <span className="text-xs text-white mt-1">SPORTS</span>
        </Link>
        <Link href="/coupon" className="bottom-nav-item text-center flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="3" width="14" height="18" stroke="white" strokeWidth="2" fill="none" />
            <line x1="8" y1="8" x2="16" y2="8" stroke="white" strokeWidth="1" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="1" />
            <line x1="8" y1="16" x2="16" y2="16" stroke="white" strokeWidth="1" />
          </svg>
          <span className="text-xs text-white mt-1">COUPON</span>
        </Link>
      </nav>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
} 