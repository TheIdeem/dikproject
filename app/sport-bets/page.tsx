"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';

const sportsData = [
  { id: 'football', name: 'Football', count: 1692, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="2" fill="#00B3E3"/>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" stroke="#00B3E3" fill="#00B3E3"/>
      <path d="M4 12L7 9M12 4L9 7M20 12L17 15M12 20L15 17" stroke="#00B3E3" strokeWidth="2"/>
    </svg>
  ) },
  { id: 'ice-hockey', name: 'Ice Hockey', count: 84, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 14L9 7L18 14" stroke="#00B3E3" strokeWidth="2" strokeLinecap="round"/>
      <path d="M5 17H19" stroke="#00B3E3" strokeWidth="2" strokeLinecap="round"/>
      <path d="M2 20H22" stroke="#00B3E3" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 7L15 4L20 7" stroke="#00B3E3" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ) },
  { id: 'basketball', name: 'Basketball', count: 139, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" stroke="#00B3E3" fill="none"/>
      <path d="M4.93 4.93L19.07 19.07M4.93 19.07L19.07 4.93" stroke="#00B3E3" strokeWidth="2"/>
    </svg>
  ) },
  { id: 'tennis', name: 'Tennis', count: 13, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22" stroke="#00B3E3" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16 6C16 8.2 14.2 10 12 10C9.8 10 8 8.2 8 6" stroke="#00B3E3" strokeWidth="2"/>
      <path d="M16 18C16 15.8 14.2 14 12 14C9.8 14 8 15.8 8 18" stroke="#00B3E3" strokeWidth="2"/>
    </svg>
  ) },
  { id: 'volleyball', name: 'Volleyball', count: 55, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      <path d="M12 2C15 5 15 9 12 12C9 15 5 15 2 12" stroke="#00B3E3" strokeWidth="2"/>
      <path d="M12 2C9 5 9 9 12 12C15 15 19 15 22 12" stroke="#00B3E3" strokeWidth="2"/>
      <path d="M12 12C9 9 5 9 2 12C5 15 9 15 12 12" stroke="#00B3E3" strokeWidth="2"/>
      <path d="M12 12C15 9 19 9 22 12C19 15 15 15 12 12" stroke="#00B3E3" strokeWidth="2"/>
    </svg>
  ) },
  { id: 'american-football', name: 'American Football', count: 1, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12Z" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      <path d="M16 8L8 16" stroke="#00B3E3" strokeWidth="2"/>
      <path d="M3 3L21 21" stroke="#00B3E3" strokeWidth="2"/>
      <path d="M3 21L21 3" stroke="#00B3E3" strokeWidth="2"/>
    </svg>
  ) },
  { id: 'baseball', name: 'Baseball', count: 23, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      <path d="M5 5C7.5 7.5 7.5 16.5 5 19" stroke="#00B3E3" strokeWidth="2"/>
      <path d="M19 5C16.5 7.5 16.5 16.5 19 19" stroke="#00B3E3" strokeWidth="2"/>
      <path d="M8 8C9.5 9.5 9.5 14.5 8 16" stroke="#00B3E3" strokeWidth="1.5"/>
      <path d="M16 8C14.5 9.5 14.5 14.5 16 16" stroke="#00B3E3" strokeWidth="1.5"/>
    </svg>
  ) },
  { id: 'boxing', name: 'Boxing', count: 7, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 16L5 9C5 7.34315 6.34315 6 8 6L11 6C12.6569 6 14 7.34315 14 9L14 10" stroke="#00B3E3" strokeWidth="2"/>
      <path d="M8 16L19 16C20.6569 16 22 14.6569 22 13L22 12C22 10.3431 20.6569 9 19 9L12 9" stroke="#00B3E3" strokeWidth="2"/>
      <path d="M5 16L8 16" stroke="#00B3E3" strokeWidth="2"/>
      <path d="M5 12L5 13C5 14.6569 3.65685 16 2 16" stroke="#00B3E3" strokeWidth="2"/>
    </svg>
  ) },
  { id: 'darts', name: 'Darts', count: 4, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="7" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="3" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      <circle cx="12" cy="12" r="1" fill="#00B3E3"/>
    </svg>
  ) },
  { id: 'futsal', name: 'Futsal', count: 6, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      <path d="M12 8L15 12L12 16L9 12L12 8Z" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      <path d="M3 12H6" stroke="#00B3E3" strokeWidth="2"/>
      <path d="M18 12H21" stroke="#00B3E3" strokeWidth="2"/>
    </svg>
  ) },
  { id: 'handball', name: 'Handball', count: 98, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      <path d="M10 14L22 20" stroke="#00B3E3" strokeWidth="2"/>
      <path d="M17.5 8C17.5 8 16 12 13 15" stroke="#00B3E3" strokeWidth="2"/>
    </svg>
  ) },
  { id: 'table-tennis', name: 'Table Tennis', count: 276, icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="8" r="6" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      <path d="M14 10L21 17" stroke="#00B3E3" strokeWidth="2"/>
      <path d="M10 14L17 21" stroke="#00B3E3" strokeWidth="2"/>
    </svg>
  ) }
];

export default function SportBetsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1e2b3f]">
      {/* Top Header */}
      <header className="bg-[#1e2b3f] flex justify-between items-center p-3 border-b border-[#2a3847]">
        <button className="text-white" onClick={openSidebar} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <div className="flex justify-center">
          <Image src="/logo/250x76.png" alt="KurdBetDax Logo" width={150} height={40} priority />
        </div>
        
        {isLoggedIn && (
          <div className="text-white font-medium bg-black rounded px-2 py-1">
            0.00 USD
          </div>
        )}
        {!isLoggedIn && (
          <div className="w-[80px]"></div>
        )}
      </header>

      {/* Sports Title */}
      <div className="p-3 flex items-center bg-[#1e2b3f] border-b border-[#2a3847]">
        <h1 className="text-white text-lg font-medium">Sports</h1>
      </div>

      {/* Sports List */}
      <div className="flex-grow overflow-y-auto bg-[#1a2634]">
        <ul>
          {sportsData.map((sport) => (
            <li key={sport.id} className="border-b border-[#2a3847]">
              <Link href={`/sport-bets/${sport.id}?sid=${sport.id}&today=0&activeTime=All`} className="flex items-center justify-between p-4 text-white">
                <div className="flex items-center">
                  <span className="mr-4 text-[#00B3E3]">{sport.icon}</span>
                  <span className="text-base">{sport.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-4 text-white text-sm">{sport.count}</span>
                  <svg className="text-[#6e7d92]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="#6e7d92" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Navigation */}
      <nav className="flex justify-around py-3 bg-[#1e2b3f] border-t border-[#2a3847]">
        <Link href="/" className="flex flex-col items-center text-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3,12 L5,10 L12,3 L19,10 L21,12 L21,21 L3,21 L3,12 Z" stroke="#7fc9ff" fill="none" />
          </svg>
          <span className="text-xs text-[#7fc9ff] mt-1">HOME PAGE</span>
        </Link>
        <Link href="/live-bets" className="flex flex-col items-center text-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ff0000" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="5" stroke="#ff0000" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-xs text-[#ff0000] mt-1">LIVE</span>
        </Link>
        <Link href="/sport-bets" className="flex flex-col items-center text-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#00B3E3" strokeWidth="2" fill="none" />
            <path d="M7,7 L17,17 M7,17 L17,7" stroke="#00B3E3" strokeWidth="2" />
          </svg>
          <span className="text-xs text-[#00B3E3] mt-1">SPORTS</span>
        </Link>
        <Link href="/coupon" className="flex flex-col items-center text-center">
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