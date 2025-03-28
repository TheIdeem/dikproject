"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';

// Sports data
const sportsData = [
  { id: 'football', name: 'Football', icon: '/images/sports/football.svg' },
  { id: 'hockey', name: 'Ice Hockey', icon: '/images/sports/hockey.svg' },
  { id: 'basketball', name: 'Basketball', icon: '/images/sports/basketball.svg' },
  { id: 'tennis', name: 'Tennis', icon: '/images/sports/tennis.svg' },
  { id: 'volleyball', name: 'Volleyball', icon: '/images/sports/volleyball.svg' },
  { id: 'american-football', name: 'American Football', icon: '/images/sports/american-football.svg' },
  { id: 'baseball', name: 'Baseball', icon: '/images/sports/baseball.svg' },
  { id: 'boxing', name: 'Boxing', icon: '/images/sports/boxing.svg' },
  { id: 'darts', name: 'Darts', icon: '/images/sports/darts.svg' },
  { id: 'futsal', name: 'Futsal', icon: '/images/sports/futsal.svg' },
  { id: 'handball', name: 'Handball', icon: '/images/sports/handball.svg' },
  { id: 'table-tennis', name: 'Table Tennis', icon: '/images/sports/table-tennis.svg' },
];

export default function UpcomingsPage() {
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
          Soon Later
        </div>
      </div>

      {/* Sports Selection Menu */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="grid grid-flow-col auto-cols-max">
          {sportsData.map((sport) => (
            <Link 
              key={sport.id} 
              href={`/upcomings?sport=${sport.id}`}
              className="flex flex-col items-center justify-center p-2 w-[130px] border-r border-[#1e2b3f]"
            >
              <div className="w-[60px] h-[60px] bg-[#1e3a28] rounded-full flex items-center justify-center">
                <div className="w-[24px] h-[24px]">
                  {/* Sport icon fallback with text */}
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    {sport.id === 'football' && (
                      <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    )}
                    {sport.id === 'hockey' && (
                      <path d="M5 7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7V10C19 11.1046 18.1046 12 17 12H7C5.89543 12 5 11.1046 5 10V7Z" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    )}
                    {sport.id === 'basketball' && (
                      <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    )}
                    {sport.id === 'tennis' && (
                      <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    )}
                    {sport.id === 'volleyball' && (
                      <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    )}
                    {sport.id === 'american-football' && (
                      <path d="M5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12Z" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    )}
                    {sport.id === 'baseball' && (
                      <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    )}
                    {sport.id === 'boxing' && (
                      <rect x="6" y="6" width="12" height="12" rx="2" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    )}
                    {sport.id === 'darts' && (
                      <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    )}
                    {sport.id === 'futsal' && (
                      <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    )}
                    {sport.id === 'handball' && (
                      <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    )}
                    {sport.id === 'table-tennis' && (
                      <rect x="4" y="8" width="16" height="8" rx="1" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    )}
                  </svg>
                </div>
              </div>
              <span className="text-white text-xs mt-1 text-center">{sport.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center p-4 bg-[#0f1826]">
        <div className="text-[#607D8B] text-center p-4">
          <p>Select a sport to view upcoming matches</p>
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