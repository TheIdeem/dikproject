"use client";

import React from 'react';
import PageTemplate from '../components/PageTemplate';

export default function CouponsPage() {
  return (
    <PageTemplate title="Coupons">
      <div className="bg-[#223152] rounded-lg p-4 shadow-md text-white">
        <p className="text-center text-lg">No coupons found</p>
      </div>
    </PageTemplate>
  );
} 