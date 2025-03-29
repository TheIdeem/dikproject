"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Sidebar from '../../components/Sidebar';

export default function MatchDetailPage() {
  const params = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Mock match data
  const match = {
    id: params.matchId,
    league: "European Clubs / UEFA Champions League",
    homeTeam: "Arsenal FC",
    awayTeam: "Real Madrid",
    date: "08/04",
    time: "23:00",
    allMarketsCount: 85,
    mainOddsCount: 18,
    overUnderCount: 13
  };

  // Mock betting options
  const bettingOptions = [
    {
      id: "1x2",
      name: "1x2",
      options: [
        { id: "1", name: "1", odds: "2.30" },
        { id: "x", name: "X", odds: "3.25" },
        { id: "2", name: "2", odds: "3.20" }
      ]
    },
    {
      id: "1st-goal",
      name: "1. goal",
      options: [
        { id: "1", name: "1 (1)", odds: "1.80" },
        { id: "none", name: "none (1)", odds: "10.50" },
        { id: "2", name: "2 (1)", odds: "2.10" }
      ]
    },
    {
      id: "last-goal",
      name: "Last goal",
      options: [
        { id: "1", name: "1", odds: "1.75" },
        { id: "none", name: "none", odds: "10.50" },
        { id: "2", name: "2", odds: "2.15" }
      ]
    },
    {
      id: "double-chance",
      name: "Double chance",
      options: [
        { id: "1x", name: "1 or X", odds: "1.35" },
        { id: "12", name: "1 or 2", odds: "1.30" },
        { id: "x2", name: "X or 2", odds: "1.65" }
      ]
    },
    {
      id: "handicap",
      name: "Handicap",
      options: [
        { id: "1", name: "1", odds: "39", handicap: "0:3" },
        { id: "x", name: "X", odds: "17.50", handicap: "0:3" },
        { id: "2", name: "2", odds: "1.01", handicap: "0:3" }
      ]
    }
  ];

  // Available bet amounts
  const betAmounts = [5, 10, 20, 50, 100, 200, 500, 1000];

  // Define interfaces
  interface BetOptionBase {
    id: string;
    name: string;
    odds: string;
  }

  interface HandicapBetOption extends BetOptionBase {
    handicap: string;
  }

  type BetOptionType = BetOptionBase | HandicapBetOption;

  // Define the BetOption interface for selected bets
  interface BetOption {
    section: string;
    option: string;
    name: string;
    odds: string;
  }

  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("detailed"); // 'detailed' or 'list'
  const [selectedBets, setSelectedBets] = useState<Record<string, BetOption>>({});
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showBetSlip, setShowBetSlip] = useState(false);

  const totalSelectedBets = Object.keys(selectedBets).length;
  const totalBetAmount = selectedAmount ? (selectedAmount * totalSelectedBets) : 0;
  const potentialWinnings = Object.entries(selectedBets).reduce((total, [_, bet]) => {
    return total + (selectedAmount ? selectedAmount * parseFloat(bet.odds) : 0);
  }, 0);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleBetSelection = (sectionId: string, optionId: string, optionName: string, odds: string) => {
    const betKey = `${sectionId}-${optionId}`;
    
    setSelectedBets(prev => {
      const newSelectedBets = { ...prev };
      
      if (newSelectedBets[betKey]) {
        delete newSelectedBets[betKey];
      } else {
        newSelectedBets[betKey] = { 
          section: sectionId,
          option: optionId,
          name: optionName,
          odds: odds
        };
      }
      
      return newSelectedBets;
    });
  };

  const handleAmountSelection = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handlePlaceBet = () => {
    // In a real app, this would submit the bet to the server
    alert(`Bet placed successfully!\nAmount: $${totalBetAmount}\nPotential winnings: $${potentialWinnings.toFixed(2)}`);
    setSelectedBets({});
    setSelectedAmount(null);
    setShowBetSlip(false);
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

      {/* League and Back Button */}
      <div className="bg-[#006600] text-white p-3 flex items-center">
        <Link href="/sport-bets" className="mr-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
        <div className="text-lg font-medium">{match.league}</div>
      </div>

      {/* Match Teams and Time */}
      <div className="bg-black text-white p-3 flex justify-between items-center">
        <div className="text-xl font-bold">{match.homeTeam}</div>
        <div className="text-lg font-medium">{match.date} {match.time}</div>
        <div className="text-xl font-bold">{match.awayTeam}</div>
      </div>

      {/* View Mode Selector */}
      <div className="bg-[#333] p-2 flex">
        <button 
          className={`w-1/2 p-2 rounded ${viewMode === 'detailed' ? 'bg-[#444]' : ''}`} 
          onClick={() => setViewMode('detailed')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <path d="M3 4H21V8H3V4Z" stroke="white" strokeWidth="2"/>
            <path d="M3 10H21V14H3V10Z" stroke="white" strokeWidth="2"/>
            <path d="M3 16H21V20H3V16Z" stroke="white" strokeWidth="2"/>
          </svg>
        </button>
        <button 
          className={`w-1/2 p-2 rounded ${viewMode === 'list' ? 'bg-[#444]' : ''}`} 
          onClick={() => setViewMode('list')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Market Tabs */}
      <div className="bg-[#333] text-white overflow-x-auto whitespace-nowrap">
        <div className="flex border-b border-[#444]">
          <button 
            className={`px-4 py-2 ${activeTab === 'all' ? 'border-b-2 border-[#00B3E3] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('all')}
          >
            All ({match.allMarketsCount})
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'main' ? 'border-b-2 border-[#00B3E3] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('main')}
          >
            Main odds ({match.mainOddsCount})
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'over' ? 'border-b-2 border-[#00B3E3] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('over')}
          >
            Over / Under ({match.overUnderCount})
          </button>
          <button 
            className={`px-4 py-2 ${activeTab === 'handicap' ? 'border-b-2 border-[#00B3E3] text-white' : 'text-gray-400'}`}
            onClick={() => setActiveTab('handicap')}
          >
            Handicap
          </button>
        </div>
      </div>

      {/* Betting Options */}
      <div className="flex-grow pb-32">
        {bettingOptions.map((section) => (
          <div key={section.id} className="mb-1">
            {/* Section Header with Toggle */}
            <div className="bg-[#006600] text-white p-3 flex justify-between items-center">
              <div className="text-lg font-medium">{section.name}</div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            
            {/* Betting Options Grid */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-[#1A2635]">
              {section.options.map((option) => {
                let bgColor = '#006600'; // Default green for most buttons
                let textColor = 'white';
                
                // Check if this option is selected
                const isSelected = !!selectedBets[`${section.id}-${option.id}`];
                
                if (isSelected) {
                  bgColor = '#00B3E3'; // Blue when selected
                } else if (option.id === '1') {
                  bgColor = '#ffcc00'; // Yellow for "1" options
                  textColor = 'black';
                }
                
                return (
                  <button 
                    key={option.id} 
                    className={`p-4 rounded text-center relative bet-option ${isSelected ? 'selected' : ''}`}
                    style={{
                      backgroundColor: bgColor,
                      color: textColor,
                    }}
                    onClick={() => toggleBetSelection(section.id, option.id, option.name, option.odds)}
                  >
                    {section.id === 'handicap' && 'handicap' in option && (
                      <div className="absolute top-2 left-2 text-white text-sm">
                        {option.handicap}
                      </div>
                    )}
                    <div className="text-lg font-bold">{option.name}</div>
                    <div className="text-xl font-bold mt-1">{option.odds}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bet Slip - Fixed at bottom */}
      {totalSelectedBets > 0 && (
        <div className="fixed bottom-16 left-0 right-0 bg-[#1e2b3f] border-t border-[#2a3847] p-3 text-white bet-slip-container">
          <div className="flex justify-between items-center mb-2">
            <button 
              className="text-[#00B3E3]"
              onClick={() => setShowBetSlip(!showBetSlip)}
            >
              {showBetSlip ? 'Hide bet slip' : 'Show bet slip'} ({totalSelectedBets})
            </button>
            <button 
              className="bg-[#ff5555] text-white px-2 py-1 rounded text-sm"
              onClick={() => setSelectedBets({})}
            >
              Clear all
            </button>
          </div>
          
          {showBetSlip && (
            <div className="p-2 bg-[#263244] rounded mb-2">
              {Object.entries(selectedBets).map(([key, bet]) => (
                <div key={key} className="flex justify-between items-center mb-2 p-2 bg-[#1a2634] rounded">
                  <div>
                    <div className="font-medium">{bet.section}: {bet.name}</div>
                    <div className="text-sm text-gray-400">Odds: {bet.odds}</div>
                  </div>
                  <button 
                    className="text-red-500"
                    onClick={() => toggleBetSelection(bet.section, bet.option, bet.name, bet.odds)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              {/* Bet Amount Selector */}
              <div className="mt-4">
                <div className="text-sm text-gray-400 mb-2">Select bet amount:</div>
                <div className="grid grid-cols-4 gap-2">
                  {betAmounts.map(amount => (
                    <button
                      key={amount}
                      className={`p-2 text-center rounded bet-amount-button ${selectedAmount === amount ? 'selected' : 'bg-[#1a2634] text-white'}`}
                      onClick={() => handleAmountSelection(amount)}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Bet Summary */}
              {selectedAmount && (
                <div className="mt-4 bg-[#1a2634] p-3 rounded">
                  <div className="flex justify-between mb-2">
                    <span>Total bets:</span>
                    <span>{totalSelectedBets}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Bet amount:</span>
                    <span>${selectedAmount} per bet</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Total amount:</span>
                    <span>${totalBetAmount}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Potential winnings:</span>
                    <span>${potentialWinnings.toFixed(2)}</span>
                  </div>
                </div>
              )}
              
              {/* Place Bet Button */}
              <button
                className={`w-full p-3 rounded font-bold mt-4 place-bet-button ${selectedAmount ? 'bg-[#006600] text-white' : 'bg-gray-600 text-gray-300'}`}
                onClick={handlePlaceBet}
                disabled={!selectedAmount}
              >
                Place Bet
              </button>
            </div>
          )}
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 flex justify-around py-3 bg-[#1e2b3f] border-t border-[#2a3847]">
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
        <Link href="/sport-bets" className="flex flex-col items-center text-center">
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
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} isLoggedIn={false} />
      
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