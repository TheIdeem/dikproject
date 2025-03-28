"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Data structure for the live matches
const liveSportsData = [
  {
    id: 'football',
    name: 'Football',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="12" r="2" fill="#00B3E3"/>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" stroke="#00B3E3" fill="#00B3E3"/>
        <path d="M4 12L7 9M12 4L9 7M20 12L17 15M12 20L15 17" stroke="#00B3E3" strokeWidth="2"/>
      </svg>
    ),
    matches: [
      {
        id: 1,
        time: "22:30",
        teams: "BARCELONA FC U19 VS REAL MADRID U19",
        status: "Live",
        highlight: false,
        odds: { "1": "1.70", "X": "3.50", "2": "4.50" }
      },
      {
        id: 2,
        time: "2H 9:31",
        teams: "AL ARABI SC VS AL WAKRAH",
        status: "Live",
        highlight: true,
        odds: { "1": "2.13", "X": "3.00", "2": "3.80" }
      },
      {
        id: 3,
        time: "84:22",
        teams: "FC ALVERCA VS UD LEIRIA",
        status: "Live",
        highlight: false,
        odds: { "1": "1.55", "X": "3.83", "2": "5.10" }
      },
      {
        id: 4,
        time: "29:56",
        teams: "SD PORTMARNOCK VS LUCAN UNITED",
        status: "Live",
        highlight: false,
        odds: { "1": "1.62", "X": "3.75", "2": "4.90" }
      },
      {
        id: 5,
        time: "54:21",
        teams: "SANTOS LAGUNA VS ATLETICO SAN LUIS",
        status: "Live",
        highlight: false,
        odds: { "1": "1.95", "X": "3.30", "2": "4.10" }
      },
      {
        id: 6,
        time: "HT",
        teams: "PUEBLA VS GUADALAJARA CHIVAS",
        status: "Live",
        highlight: false,
        odds: { "1": "2.05", "X": "3.20", "2": "3.60" }
      },
      {
        id: 7,
        time: "6:15",
        teams: "PUMAS UNAM VS CF MONTERREY",
        status: "Live",
        highlight: false,
        odds: { "1": "2.35", "X": "3.10", "2": "3.00" }
      },
      {
        id: 8,
        time: "58:12",
        teams: "FK SILEKS VS FK STRUGA",
        status: "Live",
        highlight: false,
        odds: { "1": "1.88", "X": "3.40", "2": "4.30" }
      },
      {
        id: 9,
        time: "1H 12:45",
        teams: "RACING CLUB MONTEVIDEO VS DEFENSOR SPORTING",
        status: "Live",
        highlight: false,
        odds: { "1": "2.20", "X": "3.15", "2": "3.25" }
      },
      {
        id: 10,
        time: "76:32",
        teams: "CERRO VS RIVER PLATE MONTEVIDEO",
        status: "Live",
        highlight: false,
        odds: { "1": "1.75", "X": "3.60", "2": "4.80" }
      }
    ]
  },
  {
    id: 'basketball',
    name: 'Basketball',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z" stroke="#00B3E3" fill="none"/>
        <path d="M4.93 4.93L19.07 19.07M4.93 19.07L19.07 4.93" stroke="#00B3E3" strokeWidth="2"/>
      </svg>
    ),
    matches: [
      {
        id: 11,
        time: "3Q 5:23",
        teams: "MIAMI HEAT VS CHICAGO BULLS",
        status: "Live",
        highlight: false,
        odds: { "1": "1.87", "2": "1.95" }
      },
      {
        id: 12,
        time: "Q2 8:14",
        teams: "LOS ANGELES LAKERS VS PHOENIX SUNS",
        status: "Live",
        highlight: false,
        odds: { "1": "2.10", "2": "1.75" }
      }
    ]
  },
  {
    id: 'tennis',
    name: 'Tennis',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22" stroke="#00B3E3" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 6C16 8.2 14.2 10 12 10C9.8 10 8 8.2 8 6" stroke="#00B3E3" strokeWidth="2"/>
        <path d="M16 18C16 15.8 14.2 14 12 14C9.8 14 8 15.8 8 18" stroke="#00B3E3" strokeWidth="2"/>
      </svg>
    ),
    matches: [
      {
        id: 13,
        time: "Set 2",
        teams: "NOVAK DJOKOVIC VS RAFAEL NADAL",
        status: "Live",
        highlight: false,
        odds: { "1": "1.60", "2": "2.35" }
      }
    ]
  }
];

const LivePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    router.replace('/live-bets');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1e2b3f] text-white">
      <p>Redirecting to Live Bets...</p>
    </div>
  );
};

export default LivePage; 