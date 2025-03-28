"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';

// Sample promotions data
const promotionsList = [
  {
    id: 1,
    title: "Welcome Bonus",
    description: "Get 100% up to $100 on your first deposit",
    image: "/logo/250x76.png",
  },
  {
    id: 2,
    title: "Free Bet",
    description: "Bet $50 and get a $20 free bet",
    image: "/logo/250x76.png",
  },
  {
    id: 3,
    title: "Casino Bonus",
    description: "100 free spins on selected slots",
    image: "/logo/250x76.png",
  },
  {
    id: 4,
    title: "Loyalty Rewards",
    description: "Earn points with every bet you make",
    image: "/logo/250x76.png",
  },
];

export default function PromotionsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black">
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

      {/* Back Button and Search */}
      <div className="bg-[#0f172a] p-3 flex items-center">
        <Link href="/" className="mr-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Home page"
            className="w-full p-2 pl-8 bg-[#1e293b] text-white rounded-md focus:outline-none"
            readOnly
          />
          <svg 
            className="absolute left-2 top-1/2 transform -translate-y-1/2" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3,12 L5,10 L12,3 L19,10 L21,12 L21,21 L3,21 L3,12 Z" stroke="#6e7d92" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      {/* Promotions Title */}
      <div className="bg-[#0f172a] p-4 text-center">
        <h1 className="text-xl font-bold text-white">Promotions</h1>
      </div>

      {/* Promotions List */}
      <div className="flex-grow bg-black p-4">
        <div className="space-y-4">
          {promotionsList.map((promo) => (
            <div key={promo.id} className="bg-[#1e2b3f] rounded-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-white text-lg font-semibold mb-2">{promo.title}</h2>
                <p className="text-gray-300 text-sm">{promo.description}</p>
                <button className="mt-3 bg-[#00B3E3] text-white px-4 py-2 rounded-md text-sm font-medium">
                  Claim Now
                </button>
              </div>
            </div>
          ))}
        </div>
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