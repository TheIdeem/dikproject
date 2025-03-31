"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '../../../../components/Sidebar';
import SearchBar from '../../../../components/SearchBar';

// Import mock data from parent file
import { sportNames, countryNames, leaguesByCountry, generateMatches } from '../mockData';

export default function LeagueMatchesPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<any[]>([]);
  
  const sportId = params.sportId as string || '';
  const countryId = params.countryId as string || '';
  const leagueId = params.leagueId as string || '';
  
  const sportName = sportId && sportNames[sportId] ? sportNames[sportId] : 'Sport';
  const countryName = countryId && countryNames[countryId] ? countryNames[countryId] : 'Country';
  
  // Find the league name
  const leagues = leaguesByCountry[sportId]?.[countryId] || [];
  const leagueName = decodeURIComponent(leagueId).replace(/-/g, ' ');
  
  // Get URL query parameters
  const sid = searchParams.get('sid') || sportId;
  const today = searchParams.get('today') || '0';
  const activeTime = searchParams.get('activeTime') || 'All';
  
  useEffect(() => {
    // Generate matches with a fixed seed value to ensure consistent results
    // This avoids hydration errors by ensuring the content is consistent
    const seed = 42; // Fixed seed for consistency
    const allMatches = generateMatches(sportId, countryId, seed);
    
    // For demonstration purposes, we're using the same match generator
    // In a real app, you would filter matches by the specific league
    setMatches(allMatches);
    setFilteredMatches(allMatches);
  }, [sportId, countryId, leagueId]);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredMatches(matches);
      return;
    }
    
    const normalizedQuery = query.toLowerCase();
    const filtered = matches.filter(match => 
      match.homeTeam.toLowerCase().includes(normalizedQuery) || 
      match.awayTeam.toLowerCase().includes(normalizedQuery)
    );
    
    setFilteredMatches(filtered);
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
          <h1 className="text-xl font-medium text-white">{leagueName}</h1>
          <p className="text-gray-400">{sportName} - {countryName}</p>
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
      <SearchBar onSearch={handleSearch} placeholder="Search teams" />

      {/* Matches List */}
      <div className="flex-grow">
        {matches.length === 0 ? (
          <div className="flex justify-center items-center h-32 text-gray-400">
            Loading matches...
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="flex justify-center items-center h-32 text-gray-400">
            No matches found
          </div>
        ) : (
          <div className="matches-list">
            {filteredMatches.map((match) => (
              <Link href={`/match/${match.id}`} key={match.id} className="block match-card bg-[#152133] rounded-lg m-4 p-4 hover:bg-[#1a2940] transition-colors">
                <div className="match-header flex justify-between text-gray-400 text-sm mb-2">
                  <span>{match.date} | {match.time}</span>
                  <span>ID: {match.id}</span>
                </div>
                
                <div className="match-teams mb-4">
                  <div className="home-team text-white font-medium mb-1">{match.homeTeam}</div>
                  <div className="away-team text-white font-medium">{match.awayTeam}</div>
                </div>
                
                <div className="match-odds flex justify-between">
                  <button 
                    className="odds-button bg-[#1e2b3f] text-white px-4 py-2 rounded flex-1 mx-1 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    1<br/>{match.odds.home}
                  </button>
                  <button 
                    className="odds-button bg-[#1e2b3f] text-white px-4 py-2 rounded flex-1 mx-1 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    X<br/>{match.odds.draw}
                  </button>
                  <button 
                    className="odds-button bg-[#1e2b3f] text-white px-4 py-2 rounded flex-1 mx-1 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    2<br/>{match.odds.away}
                  </button>
                  <button 
                    className="more-options-button bg-[#1e2b3f] text-white px-3 py-2 rounded mx-1 flex items-center justify-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5V5.01M12 12V12.01M12 19V19.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </Link>
            ))}
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