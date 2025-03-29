"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Sidebar from '../../../components/Sidebar';

// Mock sport names - this would come from API/backend in a real app
const sportNames: Record<string, string> = {
  'football': 'Football',
  'ice-hockey': 'Ice Hockey',
  'basketball': 'Basketball',
  'tennis': 'Tennis',
  'volleyball': 'Volleyball',
  'american-football': 'American Football',
  'baseball': 'Baseball',
  'boxing': 'Boxing',
  'darts': 'Darts',
  'futsal': 'Futsal',
  'handball': 'Handball',
  'table-tennis': 'Table Tennis'
};

// Mock country names - this would come from API/backend in a real app
const countryNames: Record<string, string> = {
  'european-clubs': 'European Clubs',
  'germany': 'Germany',
  'england': 'England',
  'spain': 'Spain',
  'italy': 'Italy',
  'france': 'France',
  'turkey': 'Turkey',
  'austria': 'Austria',
  'netherlands': 'Netherlands',
  'portugal': 'Portugal',
  'belgium': 'Belgium',
  'scotland': 'Scotland',
  'sweden': 'Sweden',
  'norway': 'Norway',
  'denmark': 'Denmark',
  'greece': 'Greece'
};

// Mock matches data - this would come from API/backend in a real app
const generateMatches = (sportId: string, countryId: string, seed: number = 1) => {
  // For demonstration, generate matches based on sport and country
  const teamsByCountry: Record<string, string[]> = {
    'germany': ['Bayern Munich', 'Borussia Dortmund', 'RB Leipzig', 'Bayer Leverkusen', 'Eintracht Frankfurt'],
    'england': ['Manchester United', 'Liverpool', 'Chelsea', 'Arsenal', 'Manchester City', 'Tottenham'],
    'spain': ['Barcelona', 'Real Madrid', 'Atletico Madrid', 'Sevilla', 'Valencia'],
    'italy': ['Juventus', 'Inter Milan', 'AC Milan', 'Roma', 'Napoli'],
    'france': ['PSG', 'Marseille', 'Lyon', 'Monaco', 'Lille'],
    'european-clubs': ['Real Madrid', 'Bayern Munich', 'Manchester City', 'PSG', 'Liverpool', 'Juventus', 'Barcelona']
  };

  // Default teams if country not in the list
  const defaultTeams = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E', 'Team F'];
  const teams = teamsByCountry[countryId] || defaultTeams;
  
  // Use a deterministic approach for "random" generation
  // Based on sportId, countryId and a seed value
  const pseudoRandom = (max: number, offset: number = 0) => {
    // Create a simple hash from sportId and countryId and offset
    const hashStr = sportId + countryId + offset.toString() + seed.toString();
    let hash = 0;
    for (let i = 0; i < hashStr.length; i++) {
      hash = ((hash << 5) - hash) + hashStr.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    // Get a positive value between 0 and max-1
    return Math.abs(hash % max);
  };
  
  // Generate fixed number of matches for consistency - using a fixed number prevents hydration issues
  const matchCount = 5;
  const matches = [];
  
  for (let i = 0; i < matchCount; i++) {
    const homeIndex = pseudoRandom(teams.length, i);
    let awayIndex = pseudoRandom(teams.length, i + 1000);
    
    // Make sure home and away teams are different
    if (awayIndex === homeIndex) {
      awayIndex = (awayIndex + 1) % teams.length;
    }
    
    const homeTeam = teams[homeIndex];
    const awayTeam = teams[awayIndex];
    
    // Generate match date deterministically
    const day = 1 + pseudoRandom(28, i + 2000);
    const month = 1 + pseudoRandom(12, i + 3000);
    const dateStr = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}`;
    
    // Generate time deterministically
    const hours = pseudoRandom(24, i + 4000);
    const minutes = pseudoRandom(60, i + 5000);
    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    
    // Generate odds deterministically
    const homeOdds = (1 + (pseudoRandom(400, i + 6000) / 100)).toFixed(2);
    const drawOdds = (1 + (pseudoRandom(400, i + 7000) / 100)).toFixed(2);
    const awayOdds = (1 + (pseudoRandom(400, i + 8000) / 100)).toFixed(2);
    
    matches.push({
      id: `match-${i}`,
      homeTeam,
      awayTeam,
      date: dateStr,
      time: timeStr,
      odds: {
        home: homeOdds,
        draw: drawOdds,
        away: awayOdds
      }
    });
  }
  
  return matches;
};

export default function MatchesPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);
  
  const sportId = params.sportId as string || '';
  const countryId = params.countryId as string || '';
  
  const sportName = sportId && sportNames[sportId] ? sportNames[sportId] : 'Sport';
  const countryName = countryId && countryNames[countryId] ? countryNames[countryId] : 'Country';
  
  // Get URL query parameters
  const sid = searchParams.get('sid') || sportId;
  const today = searchParams.get('today') || '0';
  const activeTime = searchParams.get('activeTime') || 'All';
  
  useEffect(() => {
    // Generate matches with a fixed seed value to ensure consistent results
    // This avoids hydration errors by ensuring the content is consistent
    const seed = 42; // Fixed seed for consistency
    setMatches(generateMatches(sportId, countryId, seed));
  }, [sportId, countryId]);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
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
          <Image src="/logo/250x76.png" alt="KurdBetDax Logo" width={150} height={40} priority />
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
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 bg-[#152133] text-white rounded-lg pl-10"
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
      <div className="flex-grow">
        {matches.length === 0 ? (
          <div className="flex justify-center items-center h-32 text-gray-400">
            Loading matches...
          </div>
        ) : (
          <div className="matches-list">
            {matches.map((match) => (
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