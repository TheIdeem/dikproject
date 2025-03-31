"use client";

import React, { useState } from 'react';
import PageTemplate from '../components/PageTemplate';
import { useAuth } from '../context/AuthContext';

export default function WithdrawPage() {
  const { user } = useAuth();
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    amount: '',
    method: 'bank',
    accountName: '',
    accountNumber: '',
    bankName: '',
    swiftCode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate amount
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      setMessage({
        text: 'Please enter a valid amount.',
        type: 'error'
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setMessage({
        text: 'Your withdrawal request has been submitted and is awaiting approval.',
        type: 'success'
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <PageTemplate title="Withdraw Money">
      {/* User balance */}
      <div className="mb-4 p-3 bg-[#1a2538] rounded-lg text-white border border-[#2c3e50]">
        <p className="text-gray-400">Current Balance</p>
        <p className="text-xl font-bold text-[#54c6ff]">${user?.balance || '0.00'}</p>
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

      <div className="bg-[#223152] rounded-lg p-4 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-[#54c6ff] mb-1">Amount (USD)</label>
            <input
              type="number"
              id="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
              placeholder="Enter amount"
              min="10"
              step="1"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Minimum withdrawal: $10</p>
          </div>
          
          <div>
            <label htmlFor="method" className="block text-[#54c6ff] mb-1">Withdrawal Method</label>
            <select
              id="method"
              value={formData.method}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
              required
            >
              <option value="bank">Bank Transfer</option>
              <option value="crypto">Cryptocurrency</option>
              <option value="ewallet">E-Wallet</option>
            </select>
          </div>
          
          {formData.method === 'bank' && (
            <>
              <div>
                <label htmlFor="accountName" className="block text-[#54c6ff] mb-1">Account Holder Name</label>
                <input
                  type="text"
                  id="accountName"
                  value={formData.accountName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="accountNumber" className="block text-[#54c6ff] mb-1">Account Number</label>
                <input
                  type="text"
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="bankName" className="block text-[#54c6ff] mb-1">Bank Name</label>
                <input
                  type="text"
                  id="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="swiftCode" className="block text-[#54c6ff] mb-1">Swift Code</label>
                <input
                  type="text"
                  id="swiftCode"
                  value={formData.swiftCode}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
                  required
                />
              </div>
            </>
          )}
          
          <button 
            type="submit" 
            className="w-full bg-[#0095d8] text-white py-3 rounded font-medium mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'PROCESSING...' : 'REQUEST WITHDRAWAL'}
          </button>
        </form>
      </div>
    </PageTemplate>
  );
} 