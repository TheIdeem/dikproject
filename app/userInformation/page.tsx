"use client";

import React, { useState, useEffect } from 'react';
import PageTemplate from '../components/PageTemplate';
import { useAuth } from '../context/AuthContext';

export default function UserInformationPage() {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    cellPhone: '',
    countryCode: '+90 ( TR - Turkey )',
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

  return (
    <PageTemplate title="Personal Information">
      {/* User info banner */}
      <div className="bg-[#223152] p-4 rounded-lg mb-4 shadow-md">
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

      {/* Message display */}
      {message.text && (
        <div className={`p-3 rounded mb-4 ${
          message.type === 'success' 
            ? 'bg-green-500 bg-opacity-20 border border-green-500' 
            : 'bg-red-500 bg-opacity-20 border border-red-500'
        } text-white`}>
          {message.text}
        </div>
      )}

      {/* Profile Edit Form */}
      <div className="bg-[#223152] rounded-lg p-4 shadow-md">
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-[#54c6ff] mb-1">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-[#54c6ff] mb-1">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="countryCode" className="block text-[#54c6ff] mb-1">Country Code</label>
            <select
              id="countryCode"
              value={formData.countryCode}
              onChange={handleSelectChange}
              className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
            >
              <option value="+90 ( TR - Turkey )">+90 ( TR - Turkey )</option>
              <option value="+233 ( GH - Ghana )">+233 ( GH - Ghana )</option>
            </select>
          </div>
          
          <div className="mb-6">
            <label htmlFor="cellPhone" className="block text-[#54c6ff] mb-1">Cell Phone</label>
            <input 
              type="tel" 
              id="cellPhone" 
              value={formData.cellPhone}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#0095d8] text-white py-3 rounded font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'UPDATING...' : 'UPDATE PROFILE'}
          </button>
        </form>
      </div>
    </PageTemplate>
  );
} 