"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already authenticated, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error message when user types
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      // Use the login function from AuthContext
      const success = await login(credentials.username, credentials.password);
      
      if (success) {
        // Redirect is handled in the useEffect above
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
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="KurdBetDax Logo" 
              width={150} 
              height={40} 
              className="object-contain cursor-pointer"
            />
          </Link>
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
        <h1 className="text-white text-lg font-medium mx-auto">Login</h1>
      </div>

      {/* Form container */}
      <form onSubmit={handleSubmit} className="flex-1 p-4 pb-28">
        <p className="text-[#54c6ff] text-sm mb-4">
          Please enter your username and password to login to your account.
        </p>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 text-white rounded">
            {errorMessage}
          </div>
        )}

        {/* Login fields */}
        <div className="mb-10">
          <div className="mb-4">
            <label htmlFor="username" className="block text-white mb-1">Username *</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Username" 
              className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
              value={credentials.username}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-1">Password *</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Password" 
              className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <label className="flex items-center text-white">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-[#54c6ff]">
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Submit button */}
        <button 
          type="submit" 
          className="w-full bg-[#0095d8] text-white py-3 rounded font-medium mb-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'LOGGING IN...' : 'LOGIN'}
        </button>
        
        <div className="text-center text-white">
          Don't have an account? 
          <Link href="/register" className="text-[#54c6ff] ml-2">
            Register now
          </Link>
        </div>
      </form>

      {/* Bottom Navigation */}
      <nav className="bottom-nav fixed bottom-0 w-full bg-[#1a2538] flex justify-around py-3">
        <Link href="/" className="bottom-nav-item flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3,12 L5,10 L12,3 L19,10 L21,12 L21,21 L3,21 L3,12 Z" stroke="#7fc9ff" fill="none" />
          </svg>
          <span className="text-xs mt-1 text-white">HOME PAGE</span>
        </Link>
        <Link href="/live-bets" className="bottom-nav-item flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#ff0000" strokeWidth="2" fill="none" />
            <circle cx="12" cy="12" r="5" stroke="#ff0000" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-xs mt-1 text-white">LIVE</span>
        </Link>
        <Link href="/sport-bets" className="bottom-nav-item flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
            <path d="M7,7 L17,17 M7,17 L17,7" stroke="white" strokeWidth="2" />
          </svg>
          <span className="text-xs mt-1 text-white">SPORTS</span>
        </Link>
        <Link href="/coupon" className="bottom-nav-item flex flex-col items-center">
          <svg className="bottom-nav-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="3" width="14" height="18" stroke="white" strokeWidth="2" fill="none" />
            <line x1="8" y1="8" x2="16" y2="8" stroke="white" strokeWidth="1" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="white" strokeWidth="1" />
            <line x1="8" y1="16" x2="16" y2="16" stroke="white" strokeWidth="1" />
          </svg>
          <span className="text-xs mt-1 text-white">COUPON</span>
        </Link>
      </nav>
    </div>
  );
} 