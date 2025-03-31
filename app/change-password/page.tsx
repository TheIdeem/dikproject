"use client";

import React, { useState } from 'react';
import PageTemplate from '../components/PageTemplate';
import { useAuth } from '../context/AuthContext';

export default function ChangePasswordPage() {
  const { changePassword } = useAuth();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [id]: value
    }));
    setMessage({ text: '', type: '' });
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

  return (
    <PageTemplate title="Change Password">
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

      <div className="bg-[#223152] rounded-lg p-4 shadow-md">
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-[#54c6ff] mb-1">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
              required
            />
          </div>
          
          <div>
            <label htmlFor="newPassword" className="block text-[#54c6ff] mb-1">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
              required
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-[#54c6ff] mb-1">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#0095d8] text-white py-3 rounded font-medium mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'CHANGING PASSWORD...' : 'CHANGE PASSWORD'}
          </button>
        </form>
      </div>
    </PageTemplate>
  );
} 