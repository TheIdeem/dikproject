"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Link from "next/link";
import { useAuth } from './context/AuthContext';
import AccountButton from './components/AccountButton';
import { useRouter } from 'next/navigation';

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
  const [loginVisible, setLoginVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("sports");
  const [currentBanner, setCurrentBanner] = useState(0);
  const { isAuthenticated, login } = useAuth();
  const router = useRouter();
  const [loginCredentials, setLoginCredentials] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleLogin = () => {
    if (!isAuthenticated) {
      setLoginVisible(!loginVisible);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginCredentials(prev => ({
      ...prev,
      [id]: value
    }));
    setErrorMessage('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const success = await login(loginCredentials.username, loginCredentials.password);
      
      if (success) {
        setLoginVisible(false);
        setLoginCredentials({ username: '', password: '' });
      } else {
        setErrorMessage('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('An error occurred during login. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
      {/* Header with Banner Integrated */}
      <div className="bg-[#1e2b3f] relative">
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
            <Link href="/">
              <Image src="/logo/250x76.png" alt="KurdBetDax Logo" width={150} height={40} priority className="cursor-pointer" />
            </Link>
          </div>
          
          <AccountButton className="user-button" />
        </header>
        
        {/* Register Bar - Only show if not authenticated */}
        {!isAuthenticated && (
          <div className="register-bar">
            <div>FREE REGISTER NOW</div>
            <Link href="/register">
              <button className="register-button">Register</button>
            </Link>
          </div>
        )}
      
        {/* Banner image with kurdish text and contact info */}
        <div className="flex justify-center p-4 pb-8 overflow-hidden bg-[#1e2b3f]">
          <div className="relative w-full max-w-md rounded-lg overflow-hidden" style={{ height: "200px" }}>
            {/* Static banner image */}
            <Image 
              src="/images/banners/img_banner_1.jpeg" 
              alt="Support Banner" 
              fill
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Login Panel */}
      {loginVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={toggleLogin}></div>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden relative z-10">
            <div className="bg-[#00B3E3] py-4 px-6 relative">
              <button onClick={toggleLogin} className="absolute top-4 left-4 text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <h2 className="text-xl text-white text-center font-semibold">Login</h2>
            </div>
            <form onSubmit={handleLogin} className="p-6">
              <p className="text-[#00B3E3] mb-4">Do you have a membership?</p>
              
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                  {errorMessage}
                </div>
              )}
              
              <div className="mb-4">
                <input 
                  type="text" 
                  id="username"
                  value={loginCredentials.username}
                  onChange={handleInputChange}
                  placeholder="User name" 
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-700"
                />
              </div>
              
              <div className="mb-6">
                <input 
                  type="password" 
                  id="password"
                  value={loginCredentials.password}
                  onChange={handleInputChange}
                  placeholder="Password" 
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-700"
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#00B3E3] text-white py-2 rounded-md font-semibold uppercase"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'LOGGING IN...' : 'LOGIN'}
              </button>
              
              <div className="mt-4 flex justify-between">
                <span className="text-[#00B3E3] cursor-pointer">Forgot Password!</span>
                <Link href="/register" className="text-[#00B3E3]" onClick={toggleLogin}>
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Tabs */}
      <div className="tabs" style={{ backgroundColor: '#000', borderTop: '3px solid #ffde00' }}>
        <div 
          className={`tab ${activeTab === "sports" ? "active" : ""}`}
          onClick={() => setActiveTab("sports")}
          style={{ 
            flex: 1,
            textAlign: 'center',
            padding: '15px',
            color: activeTab === "sports" ? '#ffde00' : 'white',
            borderBottom: activeTab === "sports" ? '2px solid #ffde00' : 'none',
            fontWeight: 'bold',
            letterSpacing: '1px',
            fontSize: '1rem'
          }}
        >
          SPORTS
        </div>
        <div 
          className={`tab ${activeTab === "casino" ? "active" : ""}`}
          onClick={() => setActiveTab("casino")}
          style={{ 
            flex: 1,
            textAlign: 'center',
            padding: '15px',
            color: activeTab === "casino" ? '#ffde00' : 'white',
            borderBottom: activeTab === "casino" ? '2px solid #ffde00' : 'none',
            fontWeight: 'bold',
            letterSpacing: '1px',
            fontSize: '1rem'
          }}
        >
          CASINO
        </div>
      </div>
      
      {/* Grid Sections */}
      {activeTab === "sports" && (
        <div className="grid-container grid grid-cols-2 gap-0 p-0" style={{ backgroundColor: '#1a2538' }}>
          {/* Live Matches */}
          <Link href="/live-bets" className="grid-item custom-icon-cell" style={{ borderBottom: '1px solid #2d3b4f', borderRight: '1px solid #2d3b4f' }}>
            <div className="custom-icon live-icon"></div>
            <div className="mt-4 text-center text-lg font-semibold z-10 relative">LIVE MATCHES</div>
          </Link>
          
          {/* Sports */}
          <Link href="/sport-bets" className="grid-item" style={{
            position: 'relative',
            overflow: 'hidden',
            borderBottom: '1px solid #2d3b4f'
          }}>
            {/* Custom icon for Sports matching the ls2:before selector */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '-50px',
              fontSize: '170px',
              color: '#0f0',
              transform: 'rotate(20deg)',
              margin: 0,
              fontWeight: 400,
              zIndex: 0,
              opacity: 0.7
            }}>
              ⚽
            </div>
            <div className="mt-4 text-center text-lg font-semibold text-white" style={{ position: 'relative', zIndex: 1 }}>SPORTS</div>
          </Link>
          
          {/* Soon Later */}
          <Link href="/upcomings" className="grid-item" style={{ borderRight: '1px solid #2d3b4f' }}>
            <div className="icon-container">
              <svg width="120" height="120" viewBox="0 0 100 100">
                <rect x="10" y="15" width="60" height="70" rx="5" fill="#00ff00" />
                <rect x="20" y="25" width="40" height="50" rx="3" fill="#1a2538" />
                <line x1="25" y1="40" x2="55" y2="40" stroke="#00ff00" strokeWidth="4" strokeLinecap="round" />
                <line x1="25" y1="50" x2="55" y2="50" stroke="#00ff00" strokeWidth="4" strokeLinecap="round" />
                <line x1="25" y1="60" x2="55" y2="60" stroke="#00ff00" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <div className="mt-4 text-center text-lg font-semibold text-white">SOON LATER</div>
          </Link>
          
          {/* Popular Matches */}
          <Link href="/popular-matches" className="grid-item custom-icon-cell">
            <div className="custom-icon popular-icon"></div>
            <div className="mt-4 text-center text-lg font-semibold z-10 relative text-white">POPULAR MATCHES</div>
          </Link>
        </div>
      )}
      
      {activeTab === "casino" && (
        <div className="grid-container grid grid-cols-2 gap-0 p-0" style={{ backgroundColor: '#1a2538' }}>
          {/* Live Casino */}
          <Link href="/livecasino" className="grid-item relative" style={{ borderBottom: '1px solid #2d3b4f', borderRight: '1px solid #2d3b4f' }}>
            <div className="absolute left-0 top-0 transform -translate-y-1/4 -translate-x-1/4">
              <svg width="120" height="120" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 5 C20 5 5 20 5 50" stroke="#00ff00" strokeWidth="10" fill="none" />
                <path d="M50 5 C80 5 95 20 95 50" stroke="#00ff00" strokeWidth="10" fill="none" />
                <circle cx="50" cy="50" r="20" stroke="#00ff00" strokeWidth="10" fill="none" />
              </svg>
            </div>
            <div className="mt-4 text-center text-xl font-bold text-white z-10 relative">LIVE CASINO</div>
          </Link>
          
          {/* Slot Games */}
          <Link href="/casino" className="grid-item relative" style={{ borderBottom: '1px solid #2d3b4f' }}>
            <div className="absolute right-0 top-0 transform -translate-y-1/4 translate-x-1/4">
              <svg width="120" height="120" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="10" width="60" height="80" rx="8" stroke="#00ff00" strokeWidth="10" fill="none" />
                <path d="M20 40 L80 40" stroke="#00ff00" strokeWidth="5" />
                <circle cx="40" cy="65" r="10" fill="#00ff00" />
                <circle cx="60" cy="65" r="10" fill="#00ff00" />
              </svg>
            </div>
            <div className="mt-4 text-center text-xl font-bold text-white z-10 relative">SLOT GAMES</div>
          </Link>
          
          {/* Live Bingo */}
          <Link href="/bingo" className="grid-item relative" style={{ borderRight: '1px solid #2d3b4f' }}>
            <div className="absolute left-0 bottom-0 transform translate-y-1/4 -translate-x-1/4">
              <svg width="120" height="120" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="40" stroke="#00ff00" strokeWidth="10" fill="none" />
                <path d="M20 20 L80 80" stroke="#00ff00" strokeWidth="10" />
                <path d="M80 20 L20 80" stroke="#00ff00" strokeWidth="10" />
              </svg>
            </div>
            <div className="mt-4 text-center text-xl font-bold text-white z-10 relative">LIVE BINGO</div>
          </Link>
          
          {/* Virtual Games */}
          <Link href="/virtualgames" className="grid-item relative">
            <div className="absolute right-0 bottom-0 transform translate-y-1/4 translate-x-1/4">
              <svg width="120" height="120" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 50 C20 10, 40 10, 50 50 C60 90, 80 90, 90 50" stroke="#00ff00" strokeWidth="10" fill="none" />
              </svg>
            </div>
            <div className="mt-4 text-center text-xl font-bold text-white z-10 relative">VIRTUAL GAMES</div>
          </Link>
        </div>
      )}
      
      {/* Footer */}
      <footer className="footer mt-auto z-10">
        <div className="mb-4">
          <Image src="/logo/250x76.png" alt="KurdBetDax Logo" width={150} height={40} />
        </div>
        <div className="text-sm text-gray-400">
          Copyright © 2025 Kurdbetdax. All Rights Reserved.
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

      {/* Timer in bottom right corner */}
      <div className="fixed bottom-20 right-4 bg-[#1e2b3f] text-white px-3 py-1 rounded-md border border-gray-700 text-sm z-20 shadow-lg">
        02:00:29
      </div>
      
      {/* Get Premium button */}
      <div className="fixed bottom-32 right-4 z-20">
        <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center">
          <button className="flex items-center justify-center bg-gradient-to-r from-gray-100 to-white rounded-full w-8 h-8 mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" fill="#f59e0b" />
            </svg>
          </button>
          <div className="text-xs text-gray-700 font-semibold">Get Premium</div>
        </div>
      </div>
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
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
