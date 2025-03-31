"use client";

import React, { useState } from 'react';
import PageTemplate from '../components/PageTemplate';
import { useAuth } from '../context/AuthContext';

export default function AffiliatePage() {
  const { user } = useAuth();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  
  const affiliateStats = {
    referralCount: 12,
    pendingCommission: 45.20,
    totalEarned: 156.75,
    affiliateLink: `https://kurdbetdax.com/register?ref=${user?.username || 'user'}`
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedText(type);
        setTimeout(() => setCopiedText(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <PageTemplate title="Affiliate Management">
      <div className="bg-[#223152] rounded-lg p-4 shadow-md mb-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#1a2538] rounded-md p-3 border border-[#2c3e50]">
            <p className="text-gray-400 text-sm">Total Referrals</p>
            <p className="text-white text-xl font-bold">{affiliateStats.referralCount}</p>
          </div>
          <div className="bg-[#1a2538] rounded-md p-3 border border-[#2c3e50]">
            <p className="text-gray-400 text-sm">Pending Commission</p>
            <p className="text-[#54c6ff] text-xl font-bold">${affiliateStats.pendingCommission.toFixed(2)}</p>
          </div>
          <div className="bg-[#1a2538] rounded-md p-3 border border-[#2c3e50] col-span-2">
            <p className="text-gray-400 text-sm">Total Earned</p>
            <p className="text-green-400 text-xl font-bold">${affiliateStats.totalEarned.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-[#223152] rounded-lg p-4 shadow-md mb-4">
        <h3 className="text-[#54c6ff] font-medium mb-3">Your Affiliate Link</h3>
        <div className="bg-[#1a2538] rounded-md p-3 border border-[#2c3e50] flex items-center justify-between">
          <p className="text-white text-sm truncate">{affiliateStats.affiliateLink}</p>
          <button 
            className="ml-2 bg-[#0095d8] text-white px-3 py-1 rounded-md text-sm"
            onClick={() => handleCopy(affiliateStats.affiliateLink, 'link')}
          >
            {copiedText === 'link' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <p className="text-gray-400 text-xs mt-2">Share this link with friends to earn commission on their bets</p>
      </div>
      
      <div className="bg-[#223152] rounded-lg p-4 shadow-md">
        <h3 className="text-[#54c6ff] font-medium mb-3">Commission Rates</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-white">
            <span>Sports Betting</span>
            <span>5%</span>
          </div>
          <div className="flex justify-between text-white">
            <span>Casino Games</span>
            <span>3%</span>
          </div>
          <div className="flex justify-between text-white">
            <span>Live Casino</span>
            <span>2%</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <button 
          className="w-full bg-[#0095d8] text-white py-3 rounded font-medium"
          onClick={() => window.location.href = '/affiliateBanner'}
        >
          VIEW PROMOTIONAL MATERIALS
        </button>
      </div>
    </PageTemplate>
  );
} 