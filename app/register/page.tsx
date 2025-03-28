import Image from 'next/image';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';
import { IoFootball } from 'react-icons/io5';

export default function Register() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a2538] bg-opacity-80 bg-[url('/bg-pattern.jpg')] bg-cover overflow-y-auto pb-16">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-[#1a2538]">
        <button className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex-1 flex justify-center">
          <Image 
            src="/logo.png" 
            alt="KurdBetDax Logo" 
            width={150} 
            height={40} 
            className="object-contain"
          />
        </div>
        <button className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
      </header>

      {/* Back button and title */}
      <div className="flex items-center px-4 py-2">
        <Link href="/" className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-white text-lg font-medium mx-auto">Register</h1>
      </div>

      {/* Form container */}
      <div className="flex-1 p-4 pb-28">
        <p className="text-[#54c6ff] text-sm mb-4">
          Please fill in all fields with complete and accurate information. Payment and withdrawal transactions are made according to the information provided on the membership form.
        </p>

        {/* Personal Information section */}
        <div className="mb-8">
          <h2 className="text-[#54c6ff] font-semibold mb-3">Personal Information</h2>
          
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-white mb-1">First Name*</label>
            <input 
              type="text" 
              id="firstName" 
              placeholder="First Name" 
              className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-white mb-1">Last Name*</label>
            <input 
              type="text" 
              id="lastName" 
              placeholder="Last Name" 
              className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
            />
          </div>
        </div>

        {/* Contact Information section */}
        <div className="mb-8">
          <h2 className="text-[#54c6ff] font-semibold mb-3">Contact Information</h2>
          
          <div className="mb-4">
            <label htmlFor="cellPhone" className="block text-white mb-1">Cell Phone *</label>
            <div className="flex">
              <select className="p-3 rounded-l bg-[#1a2538] border border-[#2c3e50] text-white w-1/3">
                <option>+90 ( TR - Turkey )</option>
              </select>
              <input 
                type="tel" 
                id="cellPhone" 
                placeholder="Cell Phone" 
                className="w-2/3 p-3 rounded-r bg-[#1a2538] border border-[#2c3e50] border-l-0 text-white"
              />
            </div>
          </div>
        </div>

        {/* Account Info section */}
        <div className="mb-10">
          <h2 className="text-[#54c6ff] font-semibold mb-3">Account info</h2>
          
          <div className="mb-4">
            <label htmlFor="username" className="block text-white mb-1">User name (5-20 characters) *</label>
            <input 
              type="text" 
              id="username" 
              placeholder="User name (5-20 characters)" 
              className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-1">Password (4-20 characters)*</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Password (4-20 characters)" 
              className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="passwordRepeat" className="block text-white mb-1">Password (Repeat)*</label>
            <input 
              type="password" 
              id="passwordRepeat" 
              placeholder="Password (Repeat)" 
              className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
            />
          </div>
          
          {/* Captcha */}
          <div className="mb-4">
            <div className="w-full mb-2">
              <img 
                src="/images/captcha.gif" 
                alt="Captcha" 
                className="h-12 rounded" 
              />
            </div>
            <input 
              type="text" 
              placeholder="Security Code" 
              className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
            />
          </div>
        </div>

        {/* Submit button */}
        <button className="w-full bg-[#0095d8] text-white py-3 rounded font-medium mb-20">
          CREATE MY ACCOUNT
        </button>
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-0 w-full bg-[#1a2538] flex justify-around items-center p-3 z-10">
        <Link href="/" className="flex flex-col items-center text-white">
          <FaHome className="text-2xl" />
          <span className="text-xs mt-1">HOME PAGE</span>
        </Link>
        <Link href="/live" className="flex flex-col items-center text-[#ff2c54]">
          <div className="relative">
            <span className="absolute -top-2 -right-2 bg-[#ff2c54] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#ff2c54" strokeWidth="2"/>
            </svg>
          </div>
          <span className="text-xs mt-1">LIVE</span>
        </Link>
        <Link href="/sports" className="flex flex-col items-center text-white">
          <IoFootball className="text-2xl" />
          <span className="text-xs mt-1">SPORTS</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-white">
          <div className="relative">
            <img src="/profile-icon.png" alt="Profile" className="w-6 h-6" />
          </div>
          <span className="text-xs mt-1">GET PREMIUM</span>
        </Link>
      </div>
      
      {/* Timer overlay */}
      <div className="fixed bottom-16 right-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-xs">
        03:53:39
      </div>
    </div>
  );
} 