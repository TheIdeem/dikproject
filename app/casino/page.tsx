"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';

// Casino game providers data
const providers = [
  { id: "apex", name: "Apex" },
  { id: "pragmatic", name: "Pragmatic" },
  { id: "wazdan", name: "Wazdan" },
  { id: "egt", name: "Egt" },
  { id: "amatic", name: "Amatic" },
  { id: "kajot", name: "Kajot" },
  { id: "platipus", name: "Platipus" },
  { id: "playngo", name: "Playngo" },
  { id: "playson", name: "Playson" },
  { id: "ainsworth", name: "Ainsworth" },
];

// Casino games data with images from the images/games folder
const casinoGames = [
  {
    id: 1,
    title: "Sinbad",
    image: "/images/games/101bd5cd1ea08e4f9fafc84f2ba39000.jpg",
    colors: ["#1e3a8a", "#2563eb"],
    provider: "egt"
  },
  {
    id: 2,
    title: "Dynasty of Ra",
    image: "/images/games/1021a70869ec4c40479944059fdb5400.jpg",
    colors: ["#7c2d12", "#b45309"],
    provider: "amatic"
  },
  {
    id: 3,
    title: "Leonardo's Code",
    image: "/images/games/1080c70640049d40a4ba23f84f8d3900.jpg",
    colors: ["#4b5563", "#6b7280"],
    provider: "amatic"
  },
  {
    id: 4,
    title: "Ocean Tale",
    image: "/images/games/10d944059fdb544cfe9419d317d14300.jpg",
    colors: ["#0c4a6e", "#0369a1"],
    provider: "amatic"
  },
  {
    id: 5,
    title: "Hippo & Hippo",
    image: "/images/games/104c8047d944054fdb94ccfe1419d300.jpg",
    colors: ["#4338ca", "#6366f1"],
    provider: "playson"
  },
  {
    id: 6,
    title: "Lord of the Ocean",
    image: "/images/games/1017d143f4c0f94fa78c24d2ef80c700.jpg",
    colors: ["#1e3a8a", "#3b82f6"],
    provider: "pragmatic"
  },
  {
    id: 7,
    title: "Eye of the Dragon",
    image: "/images/games/109fdb54ccfe1449d397d143f4c0f900.jpg",
    colors: ["#064e3b", "#059669"],
    provider: "playson"
  },
  {
    id: 8,
    title: "Bank Raid",
    image: "/images/games/10db54ccfe141943179143f4c0f94f00.jpg",
    colors: ["#3f3f46", "#52525b"],
    provider: "pragmatic"
  },
  {
    id: 9,
    title: "Legend of Sphinx",
    image: "/images/games/1043f4c0f94fa74c2492ef80c7064000.jpg",
    colors: ["#78350f", "#d97706"],
    provider: "playson"
  },
  {
    id: 10,
    title: "Bars and Sevens",
    image: "/images/games/101419d317d14344c0b94fa78c24d200.jpg",
    colors: ["#4c1d95", "#7c3aed"],
    provider: "amatic"
  },
  {
    id: 11,
    title: "Cash Runner",
    image: "/images/games/10f4c0f94fa78c44d2af80c706400400.jpg",
    colors: ["#065f46", "#10b981"],
    provider: "playson"
  },
  {
    id: 12,
    title: "Lucky 01",
    image: "/images/games/1044059fdb54cc4e1499d317d143f400.jpg",
    colors: ["#b91c1c", "#ef4444"],
    provider: "playson"
  },
  {
    id: 13,
    title: "Red Hot Burning",
    image: "/images/games/100869ec4c80474944859fdb54ccfe00.jpg",
    colors: ["#7f1d1d", "#dc2626"],
    provider: "pragmatic"
  },
  {
    id: 14,
    title: "Red Hot 20",
    image: "/images/games/10ef80c70640044d30a47a23f84f8d00.jpg",
    colors: ["#1e40af", "#1d4ed8"],
    provider: "pragmatic"
  },
  {
    id: 15,
    title: "Red Hot 40",
    image: "/images/games/1023f84f8d3908427d852df3e9bb0b00.jpg",
    colors: ["#7f1d1d", "#b91c1c"],
    provider: "pragmatic"
  },
  {
    id: 16,
    title: "Red Hot Fruits",
    image: "/images/games/10d143f4c0f94f478ca4d2ef80c70600.jpg",
    colors: ["#7f1d1d", "#ef4444"],
    provider: "egt"
  },
  {
    id: 17,
    title: "Fruit Mania",
    image: "/images/games/1054ccfe1419d347d183f4c0f94fa700.jpg",
    colors: ["#3f6212", "#65a30d"],
    provider: "playson"
  }
];

export default function CasinoPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeProvider, setActiveProvider] = useState<string | null>(null);
  const isLoggedIn = false; // You can replace this with actual login state
  
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Filter games based on active provider
  const filteredGames = casinoGames.filter(game => {
    return activeProvider ? game.provider === activeProvider : true;
  });

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
        
        {isLoggedIn && (
          <div className="text-white font-medium bg-black rounded px-2 py-1">
            0.00 USD
          </div>
        )}
        {!isLoggedIn && <div className="w-[73px]"></div>}
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

      {/* Provider Notification Bar */}
      <div className="provider-bar overflow-x-auto">
        <div className="flex items-center">
          <div className="flex-shrink-0 p-2">
            <Link href="/" className="text-white flex items-center px-4">
              <svg className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="white" strokeWidth="2" fill="none"/>
                <path d="M9 22V12H15V22" stroke="white" strokeWidth="2" fill="none"/>
              </svg>
              Home page
            </Link>
          </div>
          {/* Partner logos */}
          <div className="flex-shrink-0">
            <Link href="/casino?provider=apex" className="flex items-center px-4 py-3">
              <Image 
                src="/images/partners/PartnerLogo1.png" 
                alt="Relax" 
                width={150} 
                height={40} 
                className="object-contain"
              />
            </Link>
          </div>
          <div className="flex-shrink-0">
            <Link href="/casino?provider=pragmatic" className="flex items-center px-4 py-3">
              <Image 
                src="/images/partners/PartnerLogo2.png" 
                alt="Pragmatic" 
                width={80} 
                height={30} 
                className="object-contain"
              />
            </Link>
          </div>
          <div className="flex-shrink-0">
            <Link href="/livecasino?provider=evolution" className="flex items-center px-4 py-3">
              <Image 
                src="/images/partners/PartnerLogo3.png" 
                alt="Evolution" 
                width={80} 
                height={30} 
                className="object-contain"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Provider Navigation */}
      <div className="bg-[#0f172a] overflow-x-auto">
        <div className="flex py-2 px-1">
          {providers.map((provider) => (
            <button 
              key={provider.id}
              className={`px-4 py-1 mx-1 ${activeProvider === provider.id ? 'bg-[#00B3E3] text-white' : 'text-gray-300 hover:bg-gray-800'} text-sm whitespace-nowrap rounded transition duration-200`}
              onClick={() => setActiveProvider(provider.id === activeProvider ? null : provider.id)}
            >
              {provider.name}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      <div className="flex-grow bg-black p-2">
        <div className="grid grid-cols-3 gap-2">
          {filteredGames.map((game) => (
            <div key={game.id} className="game-card overflow-hidden rounded">
              <div className="relative aspect-[4/3]">
                {/* Fallback gradient background if image fails to load */}
                <div 
                  className="absolute inset-0 z-0"
                  style={{ 
                    background: `linear-gradient(to bottom right, ${game.colors[0]}, ${game.colors[1]})` 
                  }}
                ></div>
                
                {/* Game image */}
                <div className="relative z-10 w-full h-full">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // If image fails to load, hide it to show the gradient background
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                
                {/* Game title overlay */}
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <span className="text-white text-xs font-medium">{game.title}</span>
                </div>
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
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} isLoggedIn={isLoggedIn} />
      
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