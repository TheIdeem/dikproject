"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';

// Mock matches data
const matchesData = [
  {
    id: 'match-1',
    date: '08/04',
    time: '23:00',
    teams: ['Winner R16-4', 'Winner R16-3'],
    odds: { '1': '2.3', 'X': '3.25', '2': '3.2' },
    moreOptions: 156
  },
  {
    id: 'match-2',
    date: '08/04',
    time: '23:00',
    teams: ['Bayern Munich', 'Inter Milano'],
    odds: { '1': '1.8', 'X': '3.65', '2': '4.5' },
    moreOptions: 156
  },
  {
    id: 'match-3',
    date: '09/04',
    time: '23:00',
    teams: ['Paris Saint-Germain', 'Aston Villa'],
    odds: { '1': '1.5', 'X': '3.8', '2': '5.0' },
    moreOptions: 160
  }
];

export default function SportsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

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
        
        <div className="w-[24px]"></div>
      </header>

      {/* Sports Title */}
      <div className="p-3 flex items-center bg-[#1e2b3f] border-b border-[#2a3847]">
        <h1 className="text-white text-lg font-medium">Sports</h1>
      </div>

      {/* Tab navigation for days */}
      <div className="overflow-x-auto whitespace-nowrap py-2 border-b border-[#2a3847] bg-[#1e2b3f]">
        <div className="inline-flex">
          <button 
            onClick={() => setActiveTab('All')}
            className={`px-6 py-2 ${activeTab === 'All' ? 'text-white border-b-2 border-[#00b3e3] font-medium' : 'text-gray-400'}`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab('6Hour')}
            className={`px-6 py-2 ${activeTab === '6Hour' ? 'text-white border-b-2 border-[#00b3e3] font-medium' : 'text-gray-400'}`}
          >
            6 Hour
          </button>
          <button 
            onClick={() => setActiveTab('Today')}
            className={`px-6 py-2 ${activeTab === 'Today' ? 'text-white border-b-2 border-[#00b3e3] font-medium' : 'text-gray-400'}`}
          >
            Today
          </button>
          <button 
            onClick={() => setActiveTab('Saturday')}
            className={`px-6 py-2 ${activeTab === 'Saturday' ? 'text-white border-b-2 border-[#00b3e3] font-medium' : 'text-gray-400'}`}
          >
            Saturday
          </button>
          <button 
            onClick={() => setActiveTab('Sunday')}
            className={`px-6 py-2 ${activeTab === 'Sunday' ? 'text-white border-b-2 border-[#00b3e3] font-medium' : 'text-gray-400'}`}
          >
            Sunday
          </button>
          <button 
            onClick={() => setActiveTab('Monday')}
            className={`px-6 py-2 ${activeTab === 'Monday' ? 'text-white border-b-2 border-[#00b3e3] font-medium' : 'text-gray-400'}`}
          >
            Monday
          </button>
          <button 
            onClick={() => setActiveTab('Tuesday')}
            className={`px-6 py-2 ${activeTab === 'Tuesday' ? 'text-white border-b-2 border-[#00b3e3] font-medium' : 'text-gray-400'}`}
          >
            Tuesday
          </button>
          <button 
            onClick={() => setActiveTab('Wednesday')}
            className={`px-6 py-2 ${activeTab === 'Wednesday' ? 'text-white border-b-2 border-[#00b3e3] font-medium' : 'text-gray-400'}`}
          >
            Wednesday
          </button>
          <button 
            onClick={() => setActiveTab('Thursday')}
            className={`px-6 py-2 ${activeTab === 'Thursday' ? 'text-white border-b-2 border-[#00b3e3] font-medium' : 'text-gray-400'}`}
          >
            Thursday
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="p-4 bg-[#1e2b3f]">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 bg-[#182536] text-white rounded-lg pl-10"
          />
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="7" stroke="#6e7d92" strokeWidth="2"/>
            <path d="M16 16L20 20" stroke="#6e7d92" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Matches List */}
      <div className="flex-grow bg-[#1a2634]">
        {matchesData.map((match, index) => (
          <div key={match.id} className="match-container">
            {/* Match date and time */}
            <div className="bg-[#263244] text-[#00ff00] px-4 py-2 font-medium">
              {match.date} {match.time}
            </div>
            
            {/* Teams */}
            <div className="bg-[#263244] text-white px-4 py-3 flex flex-col border-b border-[#1a2634]">
              <div className="flex">
                <svg className="text-gray-500 mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>{match.teams[0]}</span>
              </div>
              <div className="flex mt-2">
                <svg className="text-gray-500 mr-2" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>{match.teams[1]}</span>
              </div>
            </div>
            
            {/* Total */}
            <div className="bg-[#9aa7b8] text-[#3b4c66] text-center py-1 font-medium">
              Total
            </div>
            
            {/* Odds */}
            <div className="flex bg-[#263244] text-white py-2 border-b border-[#1a2634] justify-between">
              <div className="flex-1 text-center border-r border-[#1a2634] py-2">
                <div className="flex flex-col items-center">
                  <span className="text-lg">1</span>
                  <span className="text-lg font-medium">{match.odds['1']}</span>
                </div>
              </div>
              <div className="flex-1 text-center border-r border-[#1a2634] py-2">
                <div className="flex flex-col items-center">
                  <span className="text-lg">X</span>
                  <span className="text-lg font-medium">{match.odds['X']}</span>
                </div>
              </div>
              <div className="flex-1 text-center py-2">
                <div className="flex flex-col items-center">
                  <span className="text-lg">2</span>
                  <span className="text-lg font-medium">{match.odds['2']}</span>
                </div>
              </div>
            </div>
            
            {/* More options */}
            <Link href={`/match/${match.id}`} className="bg-[#263244] text-[#b9babc] flex justify-end items-center px-4 py-2">
              <span>+{match.moreOptions}</span>
              <svg className="ml-1" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        ))}
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
        <Link href="/sports" className="flex flex-col items-center text-center">
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