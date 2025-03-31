"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import PageTemplate from '../components/PageTemplate';
import { useAuth } from '../context/AuthContext';

export default function AffiliateBannerPage() {
  const { user } = useAuth();
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [selectedBanner, setSelectedBanner] = useState(0);
  
  const banners = [
    { id: 1, image: '/images/banners/affiliate_banner_1.jpg', width: 728, height: 90, title: 'Horizontal Banner (728x90)' },
    { id: 2, image: '/images/banners/affiliate_banner_2.jpg', width: 300, height: 250, title: 'Square Banner (300x250)' },
    { id: 3, image: '/images/banners/affiliate_banner_3.jpg', width: 160, height: 600, title: 'Vertical Banner (160x600)' },
  ];

  const generateBannerCode = (banner: typeof banners[0]) => {
    const username = user?.username || 'user';
    return `<a href="https://kurdbetdax.com/register?ref=${username}" target="_blank"><img src="https://kurdbetdax.com${banner.image}" width="${banner.width}" height="${banner.height}" alt="KurdBetDax" /></a>`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedText(text);
        setTimeout(() => setCopiedText(null), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <PageTemplate title="Affiliate Banners">
      <div className="bg-[#223152] rounded-lg p-4 shadow-md mb-4">
        <h3 className="text-[#54c6ff] font-medium mb-3">Promotional Banners</h3>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              className={`p-2 text-center rounded-md ${selectedBanner === index ? 'bg-[#0095d8] text-white' : 'bg-[#1a2538] text-gray-300'}`}
              onClick={() => setSelectedBanner(index)}
            >
              {banner.title}
            </button>
          ))}
        </div>
        
        <div className="bg-[#1a2538] rounded-md p-4 border border-[#2c3e50] flex items-center justify-center mb-4">
          <div className="relative" style={{ width: banners[selectedBanner].width / 2, height: banners[selectedBanner].height / 2 }}>
            <Image 
              src={banners[selectedBanner].image}
              alt={`Affiliate Banner ${selectedBanner + 1}`}
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="bannerCode" className="block text-[#54c6ff] mb-1">Banner Code</label>
          <div className="flex items-center">
            <textarea
              id="bannerCode"
              className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
              rows={3}
              readOnly
              value={generateBannerCode(banners[selectedBanner])}
            />
            <button 
              className="ml-2 bg-[#0095d8] text-white px-3 py-2 rounded-md whitespace-nowrap"
              onClick={() => handleCopy(generateBannerCode(banners[selectedBanner]))}
            >
              {copiedText === generateBannerCode(banners[selectedBanner]) ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          <p className="text-gray-400 text-xs mt-2">Copy and paste this code into your website to display the banner</p>
        </div>
      </div>
      
      <div className="mt-4">
        <button 
          className="w-full bg-[#0095d8] text-white py-3 rounded font-medium"
          onClick={() => window.location.href = '/affiliate'}
        >
          BACK TO AFFILIATE DASHBOARD
        </button>
      </div>
    </PageTemplate>
  );
} 