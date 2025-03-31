"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isLoggedIn?: boolean;
}

const menuItems = [
  {
    id: 'home',
    title: 'Home page',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#00B3E3" strokeWidth="2" fill="#00B3E3"/>
        <path d="M9 22V12H15V22" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      </svg>
    ),
    link: '/'
  },
  {
    id: 'sport',
    title: 'Sport Bets',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <path d="M7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12C16.5 14.4853 14.4853 16.5 12 16.5" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <path d="M4 9L6 7M4 15L8 11M12 4V7M20 9L18 7M20 15L16 11" stroke="#00B3E3" strokeWidth="2"/>
      </svg>
    ),
    link: '/sport-bets'
  },
  {
    id: 'live',
    title: 'Live Bets',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <path d="M5 12C5 8.13401 8.13401 5 12 5" stroke="#00B3E3" strokeWidth="2" strokeLinecap="round"/>
        <path d="M19 12C19 15.866 15.866 19 12 19" stroke="#00B3E3" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="2" fill="#00B3E3"/>
      </svg>
    ),
    link: '/live-bets'
  },
  {
    id: 'highlights',
    title: 'Popular Matches',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="5,18 10,7 14,12 19,5" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      </svg>
    ),
    link: '/highlights'
  },
  {
    id: 'soon',
    title: 'Soon Later',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <path d="M12 6V12L16 14" stroke="#00B3E3" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    link: '/upcomings'
  },
  {
    id: 'slot',
    title: 'Slot Games',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V19C17 20.1046 16.1046 21 15 21H9C7.89543 21 7 20.1046 7 19V5Z" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <circle cx="12" cy="7" r="1" fill="#00B3E3"/>
        <circle cx="12" cy="12" r="1" fill="#00B3E3"/>
        <circle cx="12" cy="17" r="1" fill="#00B3E3"/>
        <path d="M8 7H10M8 12H10M8 17H10M14 7H16M14 12H16M14 17H16" stroke="#00B3E3" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    link: '/casino'
  },
  {
    id: 'casino',
    title: 'Live Casino',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="6" width="18" height="15" rx="2" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <path d="M8 6V3M16 6V3" stroke="#00B3E3" strokeWidth="2" strokeLinecap="round"/>
        <rect x="7" y="11" width="4" height="4" rx="1" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <rect x="13" y="11" width="4" height="4" rx="1" stroke="#00B3E3" strokeWidth="2" fill="none"/>
      </svg>
    ),
    link: '/livecasino'
  },
  {
    id: 'bingo',
    title: 'Live Bingo',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <path d="M12 7V17M7 12H17" stroke="#00B3E3" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8 8L16 16M8 16L16 8" stroke="#00B3E3" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    link: '#'
  },
  {
    id: 'virtual',
    title: 'Virtual Games',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <path d="M8 10V14L11 12L8 10Z" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <path d="M13 10H16M13 14H16" stroke="#00B3E3" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    link: '/virtualgames'
  },
  {
    id: 'tv',
    title: 'TV Games',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="20" height="15" rx="2" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <path d="M12 20V22M8 22H16" stroke="#00B3E3" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 12V14L12 13L9 12Z" stroke="#00B3E3" strokeWidth="2" fill="#00B3E3"/>
      </svg>
    ),
    link: '/'
  },
  {
    id: 'promotions',
    title: 'Promotions',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 12V22H4V12" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <path d="M22 7H2V12H22V7Z" stroke="#00B3E3" strokeWidth="2" fill="none"/>
        <path d="M12 22V7" stroke="#00B3E3" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 7H16.5C17.8807 7 19 5.88071 19 4.5C19 3.11929 17.8807 2 16.5 2C15.1193 2 14 3.11929 14 4.5V7" stroke="#00B3E3" strokeWidth="2"/>
        <path d="M12 7H7.5C6.11929 7 5 5.88071 5 4.5C5 3.11929 6.11929 2 7.5 2C8.88071 2 10 3.11929 10 4.5V7" stroke="#00B3E3" strokeWidth="2"/>
      </svg>
    ),
    link: '/promotions'
  },
  {
    id: 'languages',
    title: 'Languages',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 5H22M2 5V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V5M2 5L12 14L22 5" stroke="#00B3E3" strokeWidth="2"/>
      </svg>
    ),
    link: '/languages',
    rightIcon: (
      <svg width="24" height="16" viewBox="0 0 24 16">
        <rect width="24" height="16" fill="#012169"/>
        <path d="M24 0L0 16V0H24Z" fill="#012169"/>
        <path d="M0 0L24 16H0V0Z" fill="#012169"/>
        <path d="M12 0V16M0 8H24" stroke="white" strokeWidth="3.2"/>
        <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="1.6"/>
        <path d="M0 0L24 16M24 0L0 16" stroke="white" strokeWidth="5.3"/>
        <path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" strokeWidth="3.2"/>
      </svg>
    )
  }
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose, isLoggedIn = false }) => {
  return (
    <div 
      className={`fixed top-0 left-0 h-full z-50 bg-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      style={{ width: '100%', maxWidth: '400px' }}
    >
      <div className="flex justify-between p-3 border-b border-gray-200">
        {isLoggedIn && (
          <div className="text-[#00B3E3] font-medium">
            0.00 USD
          </div>
        )}
        <button 
          onClick={onClose}
          className="text-black focus:outline-none p-1 ml-auto"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <nav className="overflow-y-auto h-[calc(100%-60px)]">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="border-b border-gray-100">
              <Link href={item.link} 
                className="flex items-center justify-between py-4 px-6 hover:bg-gray-50"
                onClick={onClose}
              >
                <div className="flex items-center">
                  <span className="mr-6 text-[#00B3E3]">{item.icon}</span>
                  <span className="text-black text-base">{item.title}</span>
                </div>
                {item.rightIcon ? (
                  <span>{item.rightIcon}</span>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="#AAAAAA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 