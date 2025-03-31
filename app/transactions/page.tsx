"use client";

import React, { useState } from 'react';
import PageTemplate from '../components/PageTemplate';

export default function TransactionsPage() {
  const [transactions] = useState([
    { id: 1, type: 'deposit', amount: 100, status: 'completed', date: '2023-03-12', method: 'Bank Transfer' },
    { id: 2, type: 'withdrawal', amount: 50, status: 'completed', date: '2023-03-15', method: 'Bank Transfer' },
    { id: 3, type: 'bonus', amount: 25, status: 'completed', date: '2023-03-15', method: 'Welcome Bonus' },
    { id: 4, type: 'withdrawal', amount: 30, status: 'pending', date: '2023-03-18', method: 'Bank Transfer' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'rejected':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'text-green-400';
      case 'withdrawal':
        return 'text-red-400';
      case 'bonus':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getTypeSymbol = (type: string) => {
    switch (type) {
      case 'deposit':
        return '+';
      case 'withdrawal':
        return '-';
      case 'bonus':
        return '+';
      default:
        return '';
    }
  };

  return (
    <PageTemplate title="Process Print">
      <div className="bg-[#223152] rounded-lg p-4 shadow-md">
        <h3 className="text-[#54c6ff] font-medium mb-4">Recent Transactions</h3>
        
        {transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map(transaction => (
              <div key={transaction.id} className="bg-[#1a2538] rounded-md p-3 border border-[#2c3e50]">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-medium capitalize">{transaction.type}</p>
                    <p className="text-gray-400 text-sm">{transaction.date} • {transaction.method}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${getTypeColor(transaction.type)}`}>
                      {getTypeSymbol(transaction.type)}${transaction.amount.toFixed(2)}
                    </p>
                    <p className={`text-sm capitalize ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No transactions found</p>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <button className="w-full bg-[#1a2538] text-white py-3 rounded font-medium border border-[#2c3e50]">
          EXPORT TRANSACTIONS
        </button>
      </div>
    </PageTemplate>
  );
} 