"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Link from "next/link";

// Banner slider data
const bannerData = [
  {
    id: 1,
    title: "لەکاتی هەبوونی هەر پرسیارێک یاخوود هەر کێشەیەک",
    subtitle: "دەتوانن پەیوەندی بکەن بە : 0750 556 0557",
    bgColor: "#1e2b3f",
    image: "/images/banners/img_banner_1.jpeg"
  },
  {
    id: 2,
    title: "Welcome Bonus",
    subtitle: "Get 100% up to $100 on your first deposit",
    bgColor: "#133246",
    image: "/images/banners/img_banner_2.jpeg"
  },
  {
    id: 3,
    title: "Sports Betting",
    subtitle: "Bet on your favorite sports events",
    bgColor: "#1f3a28",
    image: "/images/banners/img_banner_3.jpeg"
  },
  {
    id: 4,
    title: "Casino Games",
    subtitle: "Try your luck with our wide variety of games",
    bgColor: "#2d2a3b",
    image: "/images/banners/img_banner_4.jpeg"
  }
];

// Provider logos data
const providers = [
  {
    id: 'relax',
    name: 'Relax',
    logo: '/images/partners/PartnerLogo1.png',
    link: '/casino?provider=apex'
  },
  {
    id: 'pragmatic',
    name: 'Pragmatic',
    logo: '/images/partners/PartnerLogo2.png',
    link: '/casino?provider=pragmatic'
  },
  {
    id: 'evolution',
    name: 'Evolution',
    logo: '/images/partners/PartnerLogo3.png',
    link: '/livecasino?provider=evolution'
  }
];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("sports");
  const [loginVisible, setLoginVisible] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(0);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleLogin = () => {
    setLoginVisible(!loginVisible);
  };

  // Auto rotate banner
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % bannerData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Manual banner navigation
  const goToBanner = (index: number) => {
    setCurrentBanner(index);
  };

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Header */}
      <header className="header z-10">
        <button className="menu-button" onClick={openSidebar} aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
        
        <div className="logo">
          <Image src="/logo/250x76.png" alt="KurdBetDax Logo" width={150} height={40} priority />
        </div>
        
        <button className="user-button" onClick={toggleLogin}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/>
            <path d="M4 20C4 17.7909 6.79086 16 10 16H14C17.2091 16 20 17.7909 20 20" stroke="white" strokeWidth="2"/>
          </svg>
        </button>
      </header>
      
      {/* Login Panel */}
      {loginVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
            <div className="bg-[#00B3E3] py-4 px-6 relative">
              <button onClick={toggleLogin} className="absolute top-4 left-4 text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <h2 className="text-xl text-white text-center font-semibold">Login</h2>
            </div>
            <div className="p-6">
              <p className="text-[#00B3E3] mb-4">Do you have a membership?</p>
              
              <div className="mb-4">
                <input 
                  type="text" 
                  placeholder="User name" 
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="mb-6">
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              
              <button className="w-full bg-[#00B3E3] text-white py-2 rounded-md font-semibold uppercase">
                LOGIN
              </button>
              
              <p className="mt-4 text-left text-[#00B3E3]">Forgot Password!</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Register Bar */}
      <div className="register-bar">
        <div>FREE REGISTER NOW</div>
        <Link href="/register">
          <button className="register-button">Register</button>
        </Link>
      </div>
      
      {/* Banner Slider */}
      <div className="banner-slider relative overflow-hidden" style={{ background: bannerData[currentBanner].bgColor }}>
        <div 
          className="transition-all duration-500 ease-in-out flex h-full"
          style={{ transform: `translateX(-${currentBanner * 100}%)` }}
        >
          {bannerData.map((banner) => (
            <div key={banner.id} className="w-full flex-shrink-0 banner relative">
              <div className="absolute inset-0 z-0 bg-black flex items-center justify-center">
                {/* Background image */}
                <Image
                  src={banner.image}
                  alt={`Banner ${banner.id}`}
                  width={800}
                  height={300}
                  style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
                  priority
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Banner navigation dots */}
        <div className="banner-dots absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {bannerData.map((_, index) => (
            <button 
              key={index}
              onClick={() => goToBanner(index)}
              className={`w-3 h-3 rounded-full ${index === currentBanner ? 'bg-white' : 'bg-gray-400'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Tabs */}
      <div className="tabs">
        <div 
          className={`tab ${activeTab === "sports" ? "active" : ""}`}
          onClick={() => setActiveTab("sports")}
        >
          SPORTS
        </div>
        <div 
          className={`tab ${activeTab === "casino" ? "active" : ""}`}
          onClick={() => setActiveTab("casino")}
        >
          CASINO
        </div>
      </div>
      
      {/* Grid Sections */}
      {activeTab === "sports" && (
        <div className="grid-container grid grid-cols-2 gap-0 p-0">
          {/* Live Matches */}
          <Link href="/live-bets" className="grid-item">
            <div className="icon-container">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <circle cx="42" cy="50" r="40" fill="#00ff00" />
                <circle cx="42" cy="50" r="30" fill="#1a2538" />
                <circle cx="42" cy="50" r="20" fill="#00ff00" />
                <circle cx="42" cy="50" r="10" fill="#1a2538" />
              </svg>
            </div>
            <div className="mt-4 text-center text-lg font-semibold">LIVE MATCHES</div>
          </Link>
          
          {/* Sports */}
          <Link href="/sport-bets" className="grid-item">
            <div className="icon-container">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <circle cx="42" cy="50" r="40" fill="#00ff00" />
                <path d="M18,38 L40,21 L66,38 L55,70 L25,70 Z" fill="#1a2538" />
                <path d="M25,30 L48,50 L40,75 M55,30 L60,55 M33,25 L65,33" stroke="#1a2538" strokeWidth="2" />
              </svg>
            </div>
            <div className="mt-4 text-center text-lg font-semibold">SPORTS</div>
          </Link>
          
          {/* Soon Later */}
          <Link href="/upcomings" className="grid-item">
            <div className="icon-container">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <rect x="10" y="15" width="60" height="70" rx="5" fill="#00ff00" />
                <rect x="20" y="25" width="40" height="50" rx="3" fill="#1a2538" />
                <line x1="25" y1="40" x2="55" y2="40" stroke="#00ff00" strokeWidth="4" strokeLinecap="round" />
                <line x1="25" y1="50" x2="55" y2="50" stroke="#00ff00" strokeWidth="4" strokeLinecap="round" />
                <line x1="25" y1="60" x2="55" y2="60" stroke="#00ff00" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <div className="mt-4 text-center text-lg font-semibold">SOON LATER</div>
          </Link>
          
          {/* Popular Matches */}
          <Link href="/popular-matches" className="grid-item">
            <div className="icon-container">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <path d="M15,70 L30,20 L50,80 L70,30 L85,50" stroke="#00ff00" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="mt-4 text-center text-lg font-semibold">POPULAR MATCHES</div>
          </Link>
        </div>
      )}
      
      {activeTab === "casino" && (
        <div className="grid-container grid grid-cols-2 gap-0 p-0">
          {/* Live Casino */}
          <Link href="/livecasino" className="grid-item">
            <div className="icon-container">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <circle cx="42" cy="50" r="40" fill="#00ff00" />
                <circle cx="42" cy="50" r="30" fill="#1a2538" />
                <circle cx="42" cy="50" r="20" fill="#00ff00" />
                <circle cx="42" cy="50" r="10" fill="#1a2538" />
              </svg>
            </div>
            <div className="mt-4 text-center text-lg font-semibold">LIVE CASINO</div>
          </Link>
          
          {/* Slot Games */}
          <Link href="/casino" className="grid-item">
            <div className="icon-container">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <rect x="10" y="15" width="60" height="70" rx="5" fill="#00ff00" />
                <rect x="20" y="25" width="40" height="50" rx="3" fill="#1a2538" />
                <circle cx="40" cy="40" r="10" fill="#00ff00" />
                <circle cx="40" cy="60" r="10" fill="#00ff00" />
              </svg>
            </div>
            <div className="mt-4 text-center text-lg font-semibold">SLOT GAMES</div>
          </Link>
          
          {/* Live Bingo */}
          <div className="grid-item">
            <div className="icon-container">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <circle cx="42" cy="50" r="40" fill="#00ff00" />
                <path d="M22,30 L62,70 M22,70 L62,30" stroke="#1a2538" strokeWidth="10" strokeLinecap="round" />
              </svg>
            </div>
            <div className="mt-4 text-center text-lg font-semibold">LIVE BINGO</div>
          </div>
          
          {/* Virtual Games */}
          <div className="grid-item">
            <div className="icon-container">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <path d="M15,70 L30,20 L50,80 L70,30 L85,50" stroke="#00ff00" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="mt-4 text-center text-lg font-semibold">VIRTUAL GAMES</div>
          </div>
        </div>
      )}
      
      {/* WhatsApp Link */}
      <div className="flex justify-center my-8">
        <a href="#" className="whatsapp-link">
          <Image src="/whatsapp.svg" alt="WhatsApp" width={40} height={40} />
        </a>
      </div>
      
      {/* Footer */}
      <footer className="footer mt-auto z-10">
        <div className="mb-4">
          <Image src="/logo/250x76.png" alt="KurdBetDax Logo" width={150} height={40} />
        </div>
        <div className="text-sm text-gray-400">
          Copyright © 2023 Kurdbetdax. All Rights Reserved.
        </div>
      </footer>
      
      {/* Bottom Navigation */}
      <nav className="bottom-nav z-10">
        <div className="bottom-nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3,12 L5,10 L12,3 L19,10 L21,12 L21,21 L3,21 L3,12 Z" stroke="#7fc9ff" fill="#7fc9ff" />
          </svg>
          <span>HOME PAGE</span>
        </div>
        <Link href="/live-bets" className="bottom-nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="8" stroke="#ff0000" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" fill="#ff0000" />
          </svg>
          <span>LIVE</span>
        </Link>
        <Link href="/sport-bets" className="bottom-nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
            <path d="M7,7 L17,17 M7,17 L17,7" stroke="white" strokeWidth="2" />
          </svg>
          <span>SPORTS</span>
        </Link>
        <Link href="/coupon" className="bottom-nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="3" width="14" height="18" stroke="#ffffff" strokeWidth="2" />
            <line x1="8" y1="8" x2="16" y2="8" stroke="#ffffff" strokeWidth="1" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="#ffffff" strokeWidth="1" />
            <line x1="8" y1="16" x2="16" y2="16" stroke="#ffffff" strokeWidth="1" />
          </svg>
          <span>COUPON</span>
        </Link>
      </nav>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} isLoggedIn={false} />
      
      {/* Overlay */}
      {(sidebarOpen || loginVisible) && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => {
            closeSidebar();
            setLoginVisible(false);
          }}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}
