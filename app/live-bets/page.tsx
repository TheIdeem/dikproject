"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';

// Live matches data
const liveSportsData = [
  {
    id: 1,
    time: "76'",
    league: "Liga Bet",
    teams: ["Hakoach Amidar Ramat Gan", "MS Bnei Jaffo Ortodoxim"],
    scores: [1, 1],
    odds: [
      { name: "1", value: "2.50" },
      { name: "X", value: "1.65" },
      { name: "2", value: "8.50" }
    ]
  },
  {
    id: 2,
    time: "55'",
    league: "Copa Costa Rica",
    teams: ["Khoromkhon FC", "Khovd FC"],
    scores: [1, 0],
    odds: [
      { name: "1", value: "1.18" },
      { name: "X", value: "5.50" },
      { name: "2", value: "11.50" }
    ]
  },
  {
    id: 3,
    time: "HT",
    league: "A-League",
    teams: ["Macarthur FC", "Newcastle United Jets"],
    scores: [0, 0],
    highlighted: true,
    odds: [
      { name: "1", value: "11.75" },
      { name: "X", value: "5.50" },
      { name: "2", value: "1.18" }
    ]
  },
  {
    id: 4,
    time: "25'",
    league: "NPL NSW 2",
    teams: ["Hawkesbury City SC", "Gladesville Ryde Magic"],
    scores: [1, 0],
    odds: [
      { name: "1", value: "1.30" },
      { name: "X", value: "4.70" },
      { name: "2", value: "7.25" }
    ]
  },
  {
    id: 5,
    time: "25'",
    league: "FFA Cup",
    teams: ["FK Beograd", "Adelaide Blue Eagles"],
    scores: [0, 0],
    odds: [
      { name: "1", value: "2.50" },
      { name: "X", value: "3.20" },
      { name: "2", value: "2.45" }
    ]
  }
];

// Sports tabs data
const sportsTabs = [
  { id: "football", name: "Football", count: 6 },
  { id: "ice-hockey", name: "Ice Hockey", count: 1 },
  { id: "basketball", name: "Basketball", count: 0 },
  { id: "tennis", name: "Tennis", count: 0 },
  { id: "volleyball", name: "Volleyball", count: 0 },
  { id: "baseball", name: "Baseball", count: 0 },
  { id: "darts", name: "Darts", count: 0 },
  { id: "handball", name: "Handball", count: 0 },
  { id: "table-tennis", name: "Table Tennis", count: 0 }
];

// Market tabs data
const marketTabs = [
  { id: "1x2", name: "1x2" },
  { id: "match-winner", name: "Which team wins the rest of the match" },
  { id: "goal", name: "0. goal" },
  { id: "total", name: "Total" },
  { id: "1st-half-winner", name: "1st half - which team wins the rest" },
  { id: "1st-half-1x2", name: "1st half - 1x2" },
  { id: "1st-half-0-goal", name: "1st half - 0. goal" },
  { id: "1st-half-total", name: "1st half - total" }
];

export default function LiveBetsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMarketTab, setActiveMarketTab] = useState("1x2");
  
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
        {/* Live Bets Title */}
        <div className="p-3 flex items-center bg-[#1e2b3f] border-b border-[#2a3847]">
          <Link href="/" className="mr-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <h1 className="text-white text-lg font-medium">Live Bets</h1>
        </div>

        {/* Sports Tabs - Updated to match reference */}
        <div className="overflow-x-auto flex bg-[#133e14]">
          {sportsTabs.map((sport, index) => (
            <div 
              key={sport.id} 
              className={`flex-shrink-0 py-2 text-center flex flex-col items-center justify-center border-r border-opacity-30 border-[#2a3847]`}
              style={{ width: '11.11%' }}
            >
              <div className="w-10 h-10 flex items-center justify-center mb-1">
                {sport.id === 'football' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" stroke="#ffff00" strokeWidth="2" fill="none" />
                    <path d="M6 6L18 18M6 18L18 6" stroke="#ffff00" strokeWidth="1" strokeOpacity="0.3" />
                  </svg>
                )}
                {sport.id === 'ice-hockey' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12L12 8L16 12" stroke="#ffff00" strokeWidth="2" />
                    <path d="M6 16H18" stroke="#ffff00" strokeWidth="2" />
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
                {sport.id === 'baseball' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 16L18 8" stroke="#ffff00" strokeWidth="2" />
                  </svg>
                )}
                {sport.id === 'darts' && (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#ffff00" strokeWidth="2" fill="none" />
                    <circle cx="12" cy="12" r="5" stroke="#ffff00" strokeWidth="2" fill="none" />
                    <circle cx="12" cy="12" r="1" fill="#ffff00" />
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
              <div className="text-[#ffff00] text-xs font-medium">{sport.count}</div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="p-2 bg-[#133e14]">
          <div className="relative rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-3 bg-[#1a2634] text-white focus:outline-none text-sm pl-4 pr-10"
            />
            <svg 
              className="absolute right-3 top-1/2 transform -translate-y-1/2" 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="7" stroke="#6e7d92" strokeWidth="2"/>
              <path d="M16 16L20 20" stroke="#6e7d92" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Market Tabs - Horizontal scrollable menu */}
        <div className="overflow-x-auto whitespace-nowrap bg-[#1e2b3f] border-b border-[#2a3847] relative">
          <div className="flex">
            {marketTabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-3 py-3 ${tab.id === activeMarketTab ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'} text-sm font-medium`}
                onClick={() => setActiveMarketTab(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Match List */}
        <div className="flex-grow bg-[#1a2634]">
          {liveSportsData.map((match, index) => (
            <div 
              key={match.id} 
              className={`border-b border-[#2a3847]`}
            >
              {/* Match Header */}
              <div className={`flex items-center p-2 text-sm ${match.highlighted ? 'bg-[#967a10]' : ''}`}>
                <div className="min-w-[30px] text-center">
                  <span className={`${match.time === "HT" ? 'text-yellow-400' : 'text-[#00ff00]'} font-medium text-sm`}>{match.time}</span>
                </div>
                <div className="flex items-center ml-2">
                  {match.league === "Liga Bet" && <span className="flag mr-1 text-sm">🇮🇱</span>}
                  {match.league === "Copa Costa Rica" && <span className="flag mr-1 text-sm">🇨🇷</span>}
                  {match.league === "A-League" && <span className="flag mr-1 text-sm">🇦🇺</span>}
                  {match.league === "NPL NSW 2" && <span className="flag mr-1 text-sm">🇦🇺</span>}
                  {match.league === "FFA Cup" && <span className="flag mr-1 text-sm">🇦🇺</span>}
                  <span className="text-gray-400 text-xs">{match.league}</span>
                </div>
                <div className="ml-auto flex items-center">
                  {index === 0 && <span className="text-gray-400 text-xs">+48</span>}
                  {index === 1 && <span className="text-gray-400 text-xs">+17</span>}
                  {index === 2 && <span className="text-gray-400 text-xs">+359</span>}
                  {index === 3 && <span className="text-gray-400 text-xs">+67</span>}
                  {index === 4 && <span className="text-gray-400 text-xs">+57</span>}
                  <button className="ml-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FFD700" strokeWidth="1.5" fill="none"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Teams & Scores */}
              <div className={`px-2 py-1 ${match.highlighted ? 'bg-[#967a10]' : ''}`}>
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="flex justify-center items-center w-5 h-5 bg-green-600 rounded-full text-xs text-white font-bold">
                      {match.scores[0]}
                    </div>
                  </div>
                  <div className="text-white text-sm ml-1">{match.teams[0]}</div>
                  <div className="ml-auto text-[#00ff00] text-sm font-bold">
                    {index === 0 || index === 1 || index === 3 ? '1' : '0'}
                  </div>
                </div>
                <div className="flex items-center mt-1">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="flex justify-center items-center w-5 h-5 bg-green-600 rounded-full text-xs text-white font-bold">
                      {match.scores[1]}
                    </div>
                  </div>
                  <div className="text-white text-sm ml-1">{match.teams[1]}</div>
                  <div className="ml-auto text-[#00ff00] text-sm font-bold">
                    {index === 0 ? '1' : '0'}
                  </div>
                </div>
              </div>
              
              {/* Betting Odds - 1X2 section */}
              <div className={`p-2 ${match.highlighted ? 'bg-[#967a10]' : ''}`}>
                <div className="flex justify-between text-center">
                  <div className="flex-1 py-2 px-1 mx-0.5 bg-[#1e2b3f] rounded">
                    <div className="text-white text-xs">1</div>
                    <div className="text-white font-bold text-sm">{match.odds[0].value}</div>
                  </div>
                  <div className="flex-1 py-2 px-1 mx-0.5 bg-[#1e2b3f] rounded">
                    <div className="text-white text-xs">X</div>
                    <div className="text-white font-bold text-sm">{match.odds[1].value}</div>
                  </div>
                  <div className="flex-1 py-2 px-1 mx-0.5 bg-[#1e2b3f] rounded">
                    <div className="text-white text-xs">2</div>
                    <div className="text-white font-bold text-sm">{match.odds[2].value}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Timer at bottom (overlay) */}
          <div className="fixed bottom-20 right-4 bg-[#1e2b3f] text-white px-3 py-1 rounded-md border border-gray-600 text-sm">
            02:26:59
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
        <Link href="/live-bets" className="bottom-nav-item live text-center flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ff0000" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="5" stroke="#ff0000" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-xs text-[#ff0000] mt-1">LIVE</span>
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