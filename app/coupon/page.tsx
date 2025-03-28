"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';

// Mock bet data
const mockBet = {
  id: '123456',
  match: {
    teams: ['Bayer Leverkusen', 'VfL Bochum'],
    date: '28/03',
    time: '23:30',
    bet: '1x2 | Bayer Leve.',
    odds: 1.25
  },
  options: ['System', '1li Combine']
};

export default function CouponPage() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [acceptRateChanges, setAcceptRateChanges] = useState(true);
  const [betAmount, setBetAmount] = useState('1.00');
  
  // Pre-defined bet amounts
  const betAmounts = ['C', '5', '10', '20', '50', '...'];
  
  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Calculate total based on bet amount and odds
  const totalAmount = parseFloat(betAmount) * mockBet.match.odds;
  
  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
      {/* Top Header */}
      <header className="bg-[#1a2b43] flex justify-between items-center p-4">
        <button 
          onClick={() => router.back()} 
          className="text-white"
          aria-label="Go back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <h1 className="text-white text-lg font-medium">Betting Coupon</h1>
        
        <button className="text-white opacity-0">
          {/* Empty button for layout balance */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </header>

      {/* Coupon Options */}
      <div className="flex justify-between items-center px-4 py-3 bg-white border-b border-gray-200">
        <div className="text-sm text-[#333333] font-medium">1OPTIONS</div>
        <button className="text-sm text-[#0073e6] font-medium uppercase">Delete All</button>
      </div>

      {/* Bet Card */}
      <div className="p-4 bg-white mb-2 border-b border-gray-200">
        <div className="flex items-start">
          <div className="w-10 h-10 bg-gray-200 flex justify-center items-center rounded-full mr-3 mt-1">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="11" stroke="#333" strokeWidth="1.5" fill="none"/>
              <path d="M12 2C14.5 5 14.5 9 12 12M12 2C9.5 5 9.5 9 12 12M12 22C14.5 19 14.5 15 12 12M12 22C9.5 19 9.5 15 12 12M2 12C5 14.5 9 14.5 12 12M2 12C5 9.5 9 9.5 12 12M22 12C19 14.5 15 14.5 12 12M22 12C19 9.5 15 9.5 12 12" 
                stroke="#333" strokeWidth="1.5"/>
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-2 items-center">
                <div className="text-sm font-medium">{mockBet.match.date}</div>
                <div className="text-sm font-medium">{mockBet.match.time}</div>
              </div>
              <button className="text-gray-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#999" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <div className="text-base font-bold text-[#111111]">{mockBet.match.teams[0]}</div>
            <div className="text-base font-bold text-[#111111] mb-2">{mockBet.match.teams[1]}</div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-[#666666]">{mockBet.match.bet}</div>
              <div className="text-base font-bold text-[#111111]">{mockBet.match.odds.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bet Options */}
      <div className="bg-white p-4">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {mockBet.options.map((option, index) => (
            <button 
              key={index} 
              className={`px-4 py-2 text-sm ${index === 0 ? 'bg-gray-200 text-black font-medium' : 'bg-white text-gray-700 border border-gray-300 font-medium'} rounded-md`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Bet Amount Selectors */}
        <div className="grid grid-cols-6 gap-2 mb-6">
          {betAmounts.map((amount, index) => (
            <button 
              key={index} 
              className="py-3 border border-gray-300 rounded-md text-center font-medium text-[#333333]"
              onClick={() => amount !== '...' && amount !== 'C' ? setBetAmount(amount) : null}
            >
              {amount}
            </button>
          ))}
        </div>

        {/* Total Calculations */}
        <div className="space-y-4 text-[#333333] pt-1 pb-6">
          <div className="flex justify-between">
            <div className="text-sm font-medium">Total amount</div>
            <div className="flex items-center space-x-2">
              <div className="text-sm font-bold">1 X {betAmount} = {parseFloat(betAmount).toFixed(2)}</div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <div className="text-sm font-medium">Maximum Gain</div>
            <div className="text-sm font-bold">{mockBet.match.odds.toFixed(2)}</div>
          </div>
          
          <div className="flex justify-between">
            <div className="text-sm font-medium">Total</div>
            <div className="text-sm font-bold">{mockBet.match.odds.toFixed(2)}</div>
          </div>
          
          {/* Rate Changes Checkbox */}
          <div className="flex justify-end items-center pt-2">
            <div className="text-sm mr-2 text-[#333333]">I accept rate changes</div>
            <button 
              className={`w-6 h-6 rounded-sm ${acceptRateChanges ? 'bg-[#22b573]' : 'bg-gray-300'} flex items-center justify-center`}
              onClick={() => setAcceptRateChanges(!acceptRateChanges)}
            >
              {acceptRateChanges && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L10 17L19 8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Create Coupon Button */}
      <div className="mt-auto">
        <button className="w-full py-4 bg-[#95be00] text-white font-bold text-lg uppercase">
          CREATE COUPON
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="flex justify-around py-3 bg-[#1a2b43] border-t border-[#2a3847]">
        <Link href="/" className="flex flex-col items-center text-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3,12 L5,10 L12,3 L19,10 L21,12 L21,21 L3,21 L3,12 Z" stroke="#7fc9ff" fill="none" />
          </svg>
          <span className="text-xs text-[#7fc9ff] mt-1">HOME PAGE</span>
        </Link>
        <Link href="/live-bets" className="flex flex-col items-center text-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ff0000" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="5" stroke="#ff0000" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-xs text-[#ff0000] mt-1">LIVE</span>
        </Link>
        <Link href="/sport-bets" className="flex flex-col items-center text-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#00B3E3" strokeWidth="2" fill="none" />
            <path d="M7,7 L17,17 M7,17 L17,7" stroke="#00B3E3" strokeWidth="2" />
          </svg>
          <span className="text-xs text-[#00B3E3] mt-1">SPORTS</span>
        </Link>
        <Link href="/coupon" className="flex flex-col items-center text-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="3" width="14" height="18" stroke="white" strokeWidth="2" fill="none" />
            <line x1="8" y1="8" x2="16" y2="8" stroke="white" strokeWidth="1" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="1" />
            <line x1="8" y1="16" x2="16" y2="16" stroke="white" strokeWidth="1" />
          </svg>
          <span className="text-xs text-white font-bold mt-1">COUPON</span>
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