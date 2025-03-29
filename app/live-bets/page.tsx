"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';

// Sports tabs data
const sportsTabs = [
  { id: "football", name: "Football", count: 47, color: "#ffff00" },
  { id: "ice-hockey", name: "Ice Hockey", count: 4, color: "#ffffff" },
  { id: "basketball", name: "Basketball", count: 15, color: "#ffffff" },
  { id: "tennis", name: "Tennis", count: 2, color: "#ffffff" },
  { id: "volleyball", name: "Volleyball", count: 0, color: "#ffffff" }
];

// Live matches data
const liveMatches = [
  {
    id: 1,
    time: "87'",
    teams: ["Bombada", "Steve Biko FC"],
    scores: [1, 1],
    league: "First Division",
    hasTV: true,
    additionalBets: 46,
    marketType: "1x2"
  },
  {
    id: 2,
    time: "80'",
    teams: ["Tmt", "Brikama United"],
    scores: [1, 0],
    league: "First Division",
    hasTV: true,
    additionalBets: 23,
    marketType: "1x2",
    odds: [
      { name: "1", value: "1.12" },
      { name: "X", value: "4.50" },
      { name: "2", value: "20.00" }
    ]
  }
];

export default function LiveBetsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMarketTab, setActiveMarketTab] = useState("1x2");
  const [activeSport, setActiveSport] = useState("football");
  
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
        
        <div className="w-[80px]"></div>
      </header>

      <div className="flex flex-col flex-grow">
        {/* Live Bets Title */}
        <div className="p-3 flex items-center bg-[#1e2b3f] border-b border-[#2a3847]">
          <Link href="/" className="mr-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <h1 className="text-white text-lg font-medium">Live Bets</h1>
        </div>

        {/* Sports Tabs - Updated to match exactly as in screenshot */}
        <div className="overflow-x-auto whitespace-nowrap flex bg-[#133e14] border-b border-[#2a3847]">
          {sportsTabs.map((sport) => (
            <div 
              key={sport.id} 
              className={`inline-block text-center px-2 py-2 border-r border-[#1e2b3f] ${
                sport.id === activeSport ? 'bg-[#0f2e10]' : ''
              }`}
              style={{ minWidth: '110px' }}
              onClick={() => setActiveSport(sport.id)}
            >
              <div className="flex flex-col items-center justify-center">
                {sport.id === 'football' && (
                  <div className="relative">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="25" cy="25" r="24" stroke={sport.color} strokeWidth="2" fill="none" />
                      <circle cx="25" cy="25" r="22" fill={sport.color} />
                    </svg>
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#133e14]">
                      {sport.count}
                    </span>
                  </div>
                )}
                {sport.id === 'ice-hockey' && (
                  <div className="flex items-center justify-center">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 30C12 30 20 20 38 30" stroke={sport.color} strokeWidth="4" strokeLinecap="round" />
                      <path d="M20 12 L30 20" stroke={sport.color} strokeWidth="4" strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-2xl font-bold text-[#ffde00]">
                      {sport.count}
                    </span>
                  </div>
                )}
                {sport.id === 'basketball' && (
                  <div className="relative">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="25" cy="25" r="24" stroke={sport.color} strokeWidth="2" fill="none" />
                    </svg>
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#ffde00]">
                      {sport.count}
                    </span>
                  </div>
                )}
                {sport.id === 'tennis' && (
                  <div className="relative">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="25" cy="25" r="24" stroke={sport.color} strokeWidth="2" fill="none" />
                    </svg>
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#ffde00]">
                      {sport.count}
                    </span>
                  </div>
                )}
                {sport.id === 'volleyball' && (
                  <div className="relative">
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="25" cy="25" r="24" stroke={sport.color} strokeWidth="2" fill="none" />
                    </svg>
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#ffde00]">
                      {sport.count}
                    </span>
                  </div>
                )}
                <span className="text-xs mt-1 font-bold text-white">{sport.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-[#133e14] p-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-[#1c4a1d] text-white px-4 py-3 rounded-md pl-4 pr-10"
              style={{ border: 'none', outline: 'none' }}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="7" stroke="#666" strokeWidth="2" fill="none" />
                <path d="M16 16L20 20" stroke="#666" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Market tabs */}
        <div className="bg-white flex items-center px-3 py-2 overflow-x-auto whitespace-nowrap">
          <button className="flex items-center text-gray-500 mr-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="text-[#008EDD] font-bold border-b-2 border-[#008EDD] px-2 py-1">
            1x2
          </div>

          <div className="text-gray-600 px-2 py-1 mx-3">
            Which team wins the rest of the match
          </div>

          <button className="flex items-center text-gray-500 ml-auto">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Live Matches */}
        <div className="flex-grow pb-16">
          {liveMatches.map((match, index) => (
            <div key={match.id} className="border-b border-[#2a3847] bg-[#133e14] mb-1">
              {/* Match header with time and league */}
              <div className="flex items-center px-2 py-2 text-xs text-white">
                <span className="text-[#00ff00] font-bold">{match.time}</span>
                <img 
                  src="/images/flags/default.png" 
                  alt="Flag" 
                  className="w-5 h-3 mx-2" 
                  onError={(e) => e.currentTarget.src = "/images/flags/default.png"}
                />
                <span className="text-white">{match.league}</span>
                <div className="ml-auto flex items-center">
                  <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded mr-2">LIVE</span>
                  {match.hasTV && (
                    <span className="bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">TV</span>
                  )}
                </div>
              </div>

              {/* Teams and scores */}
              <div className="px-4 py-3">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-gray-600 rounded-full mr-2"></div>
                  <span className="text-white flex-grow">{match.teams[0]}</span>
                  <span className="text-[#00ff00] font-bold text-2xl">{match.scores[0]}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-600 rounded-full mr-2"></div>
                  <span className="text-white flex-grow">{match.teams[1]}</span>
                  <span className="text-[#00ff00] font-bold text-2xl">{match.scores[1]}</span>
                </div>
              </div>

              {/* Additional bets */}
              <div className="flex items-center justify-end p-2">
                <Link href={`/match/${match.id}`} className="text-white flex items-center">
                  <span className="text-[#ffde00] text-sm">+{match.additionalBets}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                    <path d="M9 6L15 12L9 18" stroke="#ffde00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>

              {/* Odds (if available) */}
              {match.odds && (
                <div className="grid grid-cols-3 gap-1 p-2 bg-[#1e2b3f]">
                  {match.odds.map((odd, i) => (
                    <div key={i} className="bg-[#2d3b4f] rounded p-4 text-center">
                      <span className="text-white text-lg font-bold">{odd.name}</span>
                      <div className="text-white text-xl font-bold">{odd.value}</div>
                    </div>
                  ))}
                </div>
              )}
              {!match.odds && (
                <div className="grid grid-cols-1 gap-1 p-2 bg-[#1e2b3f]">
                  <div className="bg-[#2d3b4f] rounded p-4 text-center">
                    <div className="text-white text-xl font-bold">1x2</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="flex justify-around py-3 bg-[#1e2b3f] border-t border-[#2a3847] fixed bottom-0 left-0 w-full z-30">
        <Link href="/" className="flex flex-col items-center text-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3,12 L5,10 L12,3 L19,10 L21,12 L21,21 L3,21 L3,12 Z" stroke="#7fc9ff" fill="none" />
          </svg>
          <span className="text-xs text-[#7fc9ff] mt-1">HOME PAGE</span>
        </Link>
        <div className="flex flex-col items-center text-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ff0000" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="5" stroke="#ff0000" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-xs text-[#ff0000] mt-1">LIVE</span>
        </div>
        <Link href="/sport-bets" className="flex flex-col items-center text-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
            <path d="M7,7 L17,17 M7,17 L17,7" stroke="white" strokeWidth="2" />
          </svg>
          <span className="text-xs text-white mt-1">SPORTS</span>
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