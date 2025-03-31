"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import AccountButton from '../components/AccountButton';

export default function Profile() {
  const router = useRouter();
  const { user, logout, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cellPhone: '',
    countryCode: '+90 ( TR - Turkey )',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        cellPhone: user.cellPhone || '',
        countryCode: user.countryCode || '+90 ( TR - Turkey )',
      });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setMessage({ text: '', type: '' });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [id]: value
    }));
    setMessage({ text: '', type: '' });
  };

  // Handle select change for country code
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      countryCode: e.target.value
    }));
    setMessage({ text: '', type: '' });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const success = await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        cellPhone: formData.cellPhone,
        countryCode: formData.countryCode,
      });

      if (success) {
        setMessage({ 
          text: 'Profile updated successfully!',
          type: 'success'
        });
      } else {
        setMessage({ 
          text: 'Failed to update profile. Please try again.',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage({ 
        text: 'An error occurred. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password confirmation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ 
        text: 'New passwords do not match.',
        type: 'error'
      });
      return;
    }

    // Validate minimum password length
    if (passwordData.newPassword.length < 4) {
      setMessage({ 
        text: 'Password must be at least 4 characters long.',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const success = await changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (success) {
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
        setMessage({ 
          text: 'Password changed successfully!',
          type: 'success'
        });
      } else {
        setMessage({ 
          text: 'Current password is incorrect.',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Password change error:', error);
      setMessage({ 
        text: 'An error occurred. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <ProtectedRoute>
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
          <AccountButton />
        </header>

        {/* Back button and title */}
        <div className="flex items-center px-4 py-2">
          <Link href="/" className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-white text-lg font-medium mx-auto">My Profile</h1>
        </div>

        {/* User info banner */}
        <div className="bg-[#223152] p-4 mx-4 rounded-lg mb-4 shadow-md">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-[#0095d8] flex items-center justify-center text-white text-2xl font-bold">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="ml-4">
              <h2 className="text-white text-lg font-semibold">{user?.username}</h2>
              <p className="text-[#54c6ff]">
                Balance: <span className="font-semibold">${user?.balance || '0.00'}</span>
              </p>
              <p className="text-gray-400 text-sm">
                Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Tab navigation */}
        <div className="flex border-b border-[#2c3e50] mx-4 mb-4">
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'profile' ? 'text-[#54c6ff] border-b-2 border-[#54c6ff]' : 'text-gray-400'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`py-2 px-4 font-medium ${activeTab === 'security' ? 'text-[#54c6ff] border-b-2 border-[#54c6ff]' : 'text-gray-400'}`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>

        {/* Message display */}
        {message.text && (
          <div className={`mx-4 p-3 rounded mb-4 ${
            message.type === 'success' 
              ? 'bg-green-500 bg-opacity-20 border border-green-500' 
              : 'bg-red-500 bg-opacity-20 border border-red-500'
          } text-white`}>
            {message.text}
          </div>
        )}

        {/* Content area */}
        <div className="flex-1 p-4 pb-28">
          {/* Profile Edit Form */}
          {activeTab === 'profile' && (
            <form onSubmit={handleUpdateProfile}>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-white mb-1">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  placeholder="First Name" 
                  className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-white mb-1">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  placeholder="Last Name" 
                  className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="cellPhone" className="block text-white mb-1">Cell Phone</label>
                <div className="flex">
                  <select 
                    className="p-3 rounded-l bg-[#1a2538] border border-[#2c3e50] text-white w-1/3 overflow-y-auto"
                    value={formData.countryCode}
                    onChange={handleSelectChange}
                  >
                    <option>+90 ( TR - Turkey )</option>
                    <option>+233 ( GH - Ghana )</option>
                    <option>+350 ( GI - Gibraltar )</option>
                    <option>+30 ( GR - Greece )</option>
                    <option>+299 ( GL - Greenland )</option>
                    <option>+1473 ( GD - Grenada )</option>
                    <option>+590 ( GP - Guadeloupe )</option>
                    <option>+1671 ( GU - Guam )</option>
                    <option>+502 ( GT - Guatemala )</option>
                    <option>+224 ( GN - Guinea )</option>
                    <option>+245 ( GW - Guinea-Bissau )</option>
                    <option>+592 ( GY - Guyana )</option>
                    <option>+509 ( HT - Haiti )</option>
                    <option>+0 ( HM - Heard Island and Mcdonald Islands )</option>
                    <option>+39 ( VA - Holy See (Vatican City State) )</option>
                    <option>+504 ( HN - Honduras )</option>
                    <option>+852 ( HK - Hong Kong )</option>
                    <option>+36 ( HU - Hungary )</option>
                    <option>+354 ( IS - Iceland )</option>
                    <option>+91 ( IN - India )</option>
                    <option>+62 ( ID - Indonesia )</option>
                    <option>+98 ( IR - Iran, Islamic Republic of )</option>
                    <option>+964 ( IQ - Iraq )</option>
                    <option>+353 ( IE - Ireland )</option>
                    <option>+972 ( IL - Israel )</option>
                    <option>+39 ( IT - Italy )</option>
                    <option>+1876 ( JM - Jamaica )</option>
                    <option>+81 ( JP - Japan )</option>
                    <option>+962 ( JO - Jordan )</option>
                    <option>+7 ( KZ - Kazakhstan )</option>
                    <option>+254 ( KE - Kenya )</option>
                  </select>
                  <input 
                    type="tel" 
                    id="cellPhone" 
                    placeholder="Cell Phone" 
                    className="w-2/3 p-3 rounded-r bg-[#1a2538] border border-[#2c3e50] border-l-0 text-white"
                    value={formData.cellPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#0095d8] text-white py-3 rounded font-medium mb-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'UPDATING...' : 'UPDATE PROFILE'}
              </button>
            </form>
          )}
          
          {/* Security Form */}
          {activeTab === 'security' && (
            <form onSubmit={handleChangePassword}>
              <div className="mb-4">
                <label htmlFor="currentPassword" className="block text-white mb-1">Current Password</label>
                <input 
                  type="password" 
                  id="currentPassword" 
                  placeholder="Current Password" 
                  className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-white mb-1">New Password (4-20 characters)</label>
                <input 
                  type="password" 
                  id="newPassword" 
                  placeholder="New Password" 
                  className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  minLength={4}
                  maxLength={20}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-white mb-1">Confirm New Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  placeholder="Confirm New Password" 
                  className="w-full p-3 rounded bg-[#1a2538] border border-[#2c3e50] text-white"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  minLength={4}
                  maxLength={20}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#0095d8] text-white py-3 rounded font-medium mb-4"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'CHANGING PASSWORD...' : 'CHANGE PASSWORD'}
              </button>
              
              <div className="mt-6 pt-6 border-t border-[#2c3e50]">
                <h3 className="text-white font-medium mb-3">Account Actions</h3>
                <button 
                  type="button" 
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white py-3 rounded font-medium"
                >
                  LOGOUT
                </button>
              </div>
            </form>
          )}
        </div>

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
    </ProtectedRoute>
  );
} 