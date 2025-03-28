"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';

// Sports tabs data
const sportsTabs = [
  { id: "football", name: "Football" },
  { id: "ice-hockey", name: "Ice Hockey" },
  { id: "basketball", name: "Basketball" },
  { id: "tennis", name: "Tennis" },
  { id: "volleyball", name: "Volleyball" },
  { id: "american-football", name: "American Football" },
  { id: "baseball", name: "Baseball" },
  { id: "boxing", name: "Boxing" },
  { id: "darts", name: "Darts" },
  { id: "futsal", name: "Futsal" },
  { id: "handball", name: "Handball" },
  { id: "table-tennis", name: "Table Tennis" }
];

export default function PopularMatchesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1a2634]">
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

      <div className="flex flex-col flex-grow">
        {/* Page Title */}
        <div className="p-3 flex items-center bg-[#1e2b3f] border-b border-[#2a3847]">
          <Link href="/" className="mr-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <h1 className="text-white text-lg font-medium">Popular Matches</h1>
        </div>

        {/* Sports Tabs */}
        <div className="overflow-x-auto flex bg-[#133e14]">
          {sportsTabs.map((sport, index) => (
            <Link 
              href={`/sports/${sport.id}`}
              key={sport.id} 
              className="flex-shrink-0 py-2 px-3 text-center flex flex-col items-center justify-center border-r border-opacity-30 border-[#2a3847]"
              style={{ minWidth: `${100/12}%` }}
            >
              <div className="w-10 h-10 flex items-center justify-center mb-1">
                {sport.id === 'football' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" stroke="#ffff00" strokeWidth="2" fill="none" />
                  </svg>
                )}
                {sport.id === 'ice-hockey' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12H18" stroke="#ffff00" strokeWidth="2" />
                    <path d="M8 8L12 12L16 8" stroke="#ffff00" strokeWidth="2" />
                  </svg>
                )}
                {sport.id === 'basketball' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="2" fill="none" />
                  </svg>
                )}
                {sport.id === 'tennis' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="5" stroke="#ffff00" strokeWidth="2" fill="none" />
                    <path d="M6 6L18 18" stroke="#ffff00" strokeWidth="2" />
                  </svg>
                )}
                {sport.id === 'volleyball' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="2" fill="none" />
                  </svg>
                )}
                {sport.id === 'american-football' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12Z" stroke="#ffff00" strokeWidth="2" />
                    <path d="M6 12H18" stroke="#ffff00" strokeWidth="2" />
                  </svg>
                )}
                {sport.id === 'baseball' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 16L18 8" stroke="#ffff00" strokeWidth="2" />
                  </svg>
                )}
                {sport.id === 'boxing' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="8" r="6" stroke="#ffff00" strokeWidth="2" fill="none" />
                    <path d="M6 14L18 20" stroke="#ffff00" strokeWidth="2" />
                  </svg>
                )}
                {sport.id === 'darts' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="2" fill="none" />
                    <circle cx="12" cy="12" r="5" stroke="#ffff00" strokeWidth="2" fill="none" />
                    <circle cx="12" cy="12" r="1" fill="#ffff00" />
                  </svg>
                )}
                {sport.id === 'futsal' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="2" fill="none" />
                    <path d="M8 8L16 16" stroke="#ffff00" strokeWidth="2" />
                  </svg>
                )}
                {sport.id === 'handball' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="2" fill="none" />
                  </svg>
                )}
                {sport.id === 'table-tennis' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="2" fill="none" />
                  </svg>
                )}
              </div>
              <div className="text-white text-sm font-medium">{sport.name}</div>
            </Link>
          ))}
        </div>

        {/* Main Content - Stadium Background */}
        <div className="flex-grow relative">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: 'url(/stadium-background.jpg)',
              opacity: 0.2
            }}
          ></div>
          
          {/* Content Overlay - Will hold match data when available */}
          <div className="relative z-10 p-4 flex items-center justify-center h-full">
            <div className="text-gray-400 text-center">
              <p>Select a sport to view popular matches</p>
            </div>
          </div>
          
          {/* Timer at bottom (overlay) */}
          <div className="fixed bottom-20 right-4 bg-[#1e2b3f] text-white px-3 py-1 rounded-md border border-gray-600 text-sm">
            00:47:57
          </div>
        </div>
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