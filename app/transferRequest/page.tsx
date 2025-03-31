"use client";

import React from 'react';
import PageTemplate from '../components/PageTemplate';

export default function TransferRequestPage() {
  return (
    <PageTemplate title="Transfer Requests">
      <div className="bg-[#223152] rounded-lg p-4 shadow-md text-white">
        <p className="text-center text-lg mb-4">No transfer requests found</p>
        <p className="text-center text-sm text-gray-400">When you make a transfer request, it will appear here.</p>
      </div>
    </PageTemplate>
  );
} 