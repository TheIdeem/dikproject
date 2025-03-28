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
  const [activeTab, setActiveTab] = useState('football');
  
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
        <div className="p-3 flex items-center justify-center bg-[#1e2b3f] border-b border-[#2a3847]">
          <h1 className="text-white text-lg font-medium">Popular Matches</h1>
        </div>

        {/* Sports Tabs */}
        <div className="sports-tab-grid">
          {sportsTabs.map((sport) => (
            <div 
              key={sport.id} 
              className={`sports-tab-item ${activeTab === sport.id ? 'active' : ''}`}
              onClick={() => setActiveTab(sport.id)}
            >
              <div className="sports-tab-icon">
                {sport.id === 'football' && (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    <path d="M7 7L17 17M7 17L17 7" stroke="#ffff00" strokeWidth="1.5" />
                  </svg>
                )}
                {sport.id === 'ice-hockey' && (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 8H18V16H6V8Z" stroke="#ffff00" strokeWidth="1.5" />
                    <path d="M6 12H18" stroke="#ffff00" strokeWidth="1.5" />
                  </svg>
                )}
                {sport.id === 'basketball' && (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    <path d="M12 2V22" stroke="#ffff00" strokeWidth="1.5" />
                    <path d="M2 12H22" stroke="#ffff00" strokeWidth="1.5" />
                  </svg>
                )}
                {sport.id === 'tennis' && (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    <path d="M12 2C16.4183 2 20 5.58172 20 10C20 14.4183 16.4183 18 12 18C7.58172 18 4 14.4183 4 10C4 5.58172 7.58172 2 12 2Z" stroke="#ffff00" strokeWidth="1.5" />
                  </svg>
                )}
                {sport.id === 'volleyball' && (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    <path d="M12 2C8 5 6.5 9 7 13.5" stroke="#ffff00" strokeWidth="1.5" />
                  </svg>
                )}
                {sport.id === 'american-football' && (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12Z" stroke="#ffff00" strokeWidth="1.5" />
                    <path d="M6 12H18" stroke="#ffff00" strokeWidth="1.5" />
                  </svg>
                )}
                {sport.id === 'baseball' && (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    <path d="M5 5L19 19" stroke="#ffff00" strokeWidth="1.5" />
                  </svg>
                )}
                {sport.id === 'boxing' && (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 16C5 13.7909 7.23858 12 10 12H14C16.7614 12 19 13.7909 19 16V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V16Z" stroke="#ffff00" strokeWidth="1.5" />
                    <circle cx="12" cy="7" r="4" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                  </svg>
                )}
                {sport.id === 'darts' && (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    <circle cx="12" cy="12" r="6" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    <circle cx="12" cy="12" r="2" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                  </svg>
                )}
                {sport.id === 'futsal' && (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    <path d="M7 7L17 17" stroke="#ffff00" strokeWidth="1.5" />
                  </svg>
                )}
                {sport.id === 'handball' && (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    <circle cx="12" cy="8" r="3" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                  </svg>
                )}
                {sport.id === 'table-tennis' && (
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="5" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                    <path d="M14 10L20 16" stroke="#ffff00" strokeWidth="1.5" />
                    <circle cx="17" cy="17" r="2" stroke="#ffff00" strokeWidth="1.5" fill="none" />
                  </svg>
                )}
              </div>
              <div className="sports-tab-name">{sport.name}</div>
            </div>
          ))}
        </div>

        {/* Main Content - Stadium Background */}
        <div className="flex-grow relative">
          <div className="stadium-background"></div>
          
          {/* Content Overlay - Will hold match data when available */}
          <div className="relative z-10 p-4 flex items-center justify-center h-full">
            <div className="text-gray-400 text-center">
              <p>No popular matches available at the moment</p>
            </div>
          </div>
          
          {/* Timer at bottom (overlay) */}
          <div className="timer-overlay">
            03:42:34
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav flex justify-around py-3 bg-[#1e2b3f] border-t border-[#2a3847]">
        <Link href="/" className="bottom-nav-item text-center flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3,12 L5,10 L12,3 L19,10 L21,12 L21,21 L3,21 L3,12 Z" stroke="#ffffff" fill="none" strokeWidth="2" />
          </svg>
          <span className="text-xs text-white mt-1">HOME PAGE</span>
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
            <circle cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="2" fill="none" />
            <path d="M7,7 L17,17 M7,17 L17,7" stroke="#ffffff" strokeWidth="2" />
          </svg>
          <span className="text-xs text-white mt-1">SPORTS</span>
        </Link>
        <Link href="/coupon" className="bottom-nav-item text-center flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="3" width="14" height="18" stroke="#ffffff" strokeWidth="2" fill="none" />
            <line x1="8" y1="8" x2="16" y2="8" stroke="#ffffff" strokeWidth="1" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="#ffffff" strokeWidth="1" />
            <line x1="8" y1="16" x2="16" y2="16" stroke="#ffffff" strokeWidth="1" />
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