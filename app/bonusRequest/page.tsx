"use client";

import React, { useState } from 'react';
import PageTemplate from '../components/PageTemplate';

export default function BonusRequestPage() {
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    bonusType: 'welcome',
    depositId: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setMessage({
        text: 'Your bonus request has been submitted successfully!',
        type: 'success'
      });
      setIsSubmitting(false);
      setFormData({
        bonusType: 'welcome',
        depositId: '',
        note: '',
      });
    }, 1000);
  };

  return (
    <PageTemplate title="Bonus Request">
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
            <label htmlFor="bonusType" className="block text-[#54c6ff] mb-1">Bonus Type</label>
            <select
              id="bonusType"
              value={formData.bonusType}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
              required
            >
              <option value="welcome">Welcome Bonus</option>
              <option value="deposit">Deposit Bonus</option>
              <option value="reload">Reload Bonus</option>
              <option value="referral">Referral Bonus</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="depositId" className="block text-[#54c6ff] mb-1">Deposit ID</label>
            <input
              type="text"
              id="depositId"
              value={formData.depositId}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
              placeholder="If applicable"
            />
          </div>
          
          <div>
            <label htmlFor="note" className="block text-[#54c6ff] mb-1">Additional Note</label>
            <textarea
              id="note"
              value={formData.note}
              onChange={handleInputChange}
              className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md min-h-[100px]"
              placeholder="Please provide any additional information"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#0095d8] text-white py-3 rounded font-medium mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'SUBMITTING...' : 'REQUEST BONUS'}
          </button>
        </form>
      </div>
    </PageTemplate>
  );
} 