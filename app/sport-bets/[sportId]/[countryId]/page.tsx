"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';
import SearchBar from '../../../components/SearchBar';

// Import mock data
import { sportNames, countryNames, leaguesByCountry } from './mockData';

export default function MatchesPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const sportId = params.sportId as string || '';
  const countryId = params.countryId as string || '';
  
  const sportName = sportId && sportNames[sportId] ? sportNames[sportId] : 'Sport';
  const countryName = countryId && countryNames[countryId] ? countryNames[countryId] : 'Country';
  
  // Get leagues for the current country and sport
  const leagues = leaguesByCountry[sportId]?.[countryId] || [];
  const [filteredLeagues, setFilteredLeagues] = useState(leagues);
  
  // Get URL query parameters
  const sid = searchParams.get('sid') || sportId;
  const today = searchParams.get('today') || '0';
  const activeTime = searchParams.get('activeTime') || 'All';

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredLeagues(leagues);
      return;
    }
    
    const normalizedQuery = query.toLowerCase();
    const filtered = leagues.filter(league => 
      league.name.toLowerCase().includes(normalizedQuery)
    );
    
    setFilteredLeagues(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#1e2b3f]">
      {/* Top Header */}
      <header className="sports-header flex justify-between items-center">
        <button className="text-white" onClick={openSidebar} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <div className="logo flex justify-center">
          <Link href="/">
            <Image src="/logo/250x76.png" alt="KurdBetDax Logo" width={150} height={40} priority className="cursor-pointer" />
          </Link>
        </div>
        
        <button className="text-white">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/>
            <path d="M4 20C4 17.7909 6.79086 16 10 16H14C17.2091 16 20 17.7909 20 20" stroke="white" strokeWidth="2"/>
          </svg>
        </button>
      </header>

      {/* Back button and Match Title */}
      <div className="flex items-center p-4">
        <button 
          onClick={() => router.back()} 
          className="text-white mr-4"
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div>
          <h1 className="text-xl font-medium text-white">{sportName}</h1>
          <p className="text-gray-400">{countryName}</p>
        </div>
      </div>

      {/* Tab navigation for days (similar to the screenshot) */}
      <div className="overflow-x-auto whitespace-nowrap py-2 border-b border-gray-700">
        <div className="inline-flex">
          <button className={`px-6 py-2 ${activeTime === 'All' ? 'text-white border-b-2 border-blue-500 font-medium' : 'text-gray-400'}`}>All</button>
          <button className={`px-6 py-2 ${activeTime === '6Hour' ? 'text-white border-b-2 border-blue-500 font-medium' : 'text-gray-400'}`}>6 Hour</button>
          <button className={`px-6 py-2 ${activeTime === 'Today' ? 'text-white border-b-2 border-blue-500 font-medium' : 'text-gray-400'}`}>Today</button>
          <button className="px-6 py-2 text-gray-400">Saturday</button>
          <button className="px-6 py-2 text-gray-400">Sunday</button>
          <button className="px-6 py-2 text-gray-400">Monday</button>
          <button className="px-6 py-2 text-gray-400">Tuesday</button>
          <button className="px-6 py-2 text-gray-400">Wednesday</button>
          <button className="px-6 py-2 text-gray-400">Thursday</button>
        </div>
      </div>

      {/* Search bar */}
      <SearchBar onSearch={handleSearch} placeholder="Search" />

      {/* Leagues List */}
      <div className="flex-grow">
        {filteredLeagues.length > 0 ? (
          <div className="leagues-list">
            {filteredLeagues.map((league, index) => (
              <Link 
                href={`/sport-bets/${sportId}/${countryId}/${encodeURIComponent(league.name.replace(/ /g, '-').toLowerCase())}`}
                key={league.name}
                className="flex justify-between items-center p-4 hover:bg-[#1a2940] transition-colors border-b border-[#1a2940] text-white"
              >
                <span>{league.name}</span>
                <span className="text-gray-400">{league.matchCount}</span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-32 text-gray-400">
            No leagues available
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav flex justify-around py-3">
        <Link href="/" className="bottom-nav-item">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3,12 L5,10 L12,3 L19,10 L21,12 L21,21 L3,21 L3,12 Z" stroke="#7fc9ff" fill="none" />
          </svg>
          <span>HOME PAGE</span>
        </Link>
        <Link href="/live-bets" className="bottom-nav-item live">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ff0000" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="5" stroke="#ff0000" strokeWidth="2" fill="none" />
          </svg>
          <span>LIVE</span>
        </Link>
        <Link href="/sport-bets" className="bottom-nav-item active">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
            <path d="M7,7 L17,17 M7,17 L17,7" stroke="white" strokeWidth="2" />
          </svg>
          <span>SPORTS</span>
        </Link>
        <Link href="/coupon" className="bottom-nav-item">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="3" width="14" height="18" stroke="white" strokeWidth="2" fill="none" />
            <line x1="8" y1="8" x2="16" y2="8" stroke="white" strokeWidth="1" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="1" />
            <line x1="8" y1="16" x2="16" y2="16" stroke="white" strokeWidth="1" />
          </svg>
          <span>COUPON</span>
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