"use client";

import React, { useState } from 'react';
import PageTemplate from '../components/PageTemplate';

export default function DepositPage() {
  const [activeMethod, setActiveMethod] = useState('bank');
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const paymentMethods = [
    { id: 'bank', name: 'Bank Transfer' },
    { id: 'card', name: 'Credit Card' },
    { id: 'crypto', name: 'Cryptocurrency' },
    { id: 'ewallet', name: 'E-Wallet' }
  ];

  return (
    <PageTemplate title="Deposit">
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
        <h3 className="text-[#54c6ff] font-medium mb-4">Select Payment Method</h3>
        
        <div className="grid grid-cols-2 gap-2 mb-6">
          {paymentMethods.map(method => (
            <button
              key={method.id}
              className={`p-3 rounded-md text-center ${
                activeMethod === method.id 
                  ? 'bg-[#0095d8] text-white' 
                  : 'bg-[#1a2538] text-gray-300'
              }`}
              onClick={() => setActiveMethod(method.id)}
            >
              {method.name}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="amount" className="block text-[#54c6ff] mb-1">Amount (USD)</label>
            <input
              type="number"
              id="amount"
              min="10"
              step="1"
              className="w-full p-3 bg-[#1a2538] border border-[#2c3e50] text-white rounded-md"
              placeholder="Enter amount"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Minimum deposit: $10</p>
          </div>
          
          {activeMethod === 'bank' && (
            <div className="border border-[#2c3e50] rounded-md p-4 bg-[#1a2538]">
              <h4 className="text-white mb-2">Bank Details</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-400">Bank Name:</span> <span className="text-white">Example Bank</span></p>
                <p><span className="text-gray-400">Account Name:</span> <span className="text-white">KurdBetDax Ltd</span></p>
                <p><span className="text-gray-400">Account Number:</span> <span className="text-white">123456789</span></p>
                <p><span className="text-gray-400">Swift Code:</span> <span className="text-white">EXBKTKRD</span></p>
              </div>
            </div>
          )}
          
          <button 
            className="w-full bg-[#0095d8] text-white py-3 rounded font-medium mt-6"
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </PageTemplate>
  );
} 