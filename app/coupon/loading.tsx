import React from 'react';

export default function CouponLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Skeleton */}
      <header className="bg-[#1a2b43] flex justify-between items-center p-4">
        <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
        <div className="w-40 h-6 bg-gray-700 rounded animate-pulse"></div>
        <div className="w-8 h-8 bg-gray-700 rounded animate-pulse opacity-0"></div>
      </header>

      {/* Coupon Options Skeleton */}
      <div className="flex justify-between items-center p-3 bg-white border-b border-gray-200">
        <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
        <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Bet Card Skeleton */}
      <div className="p-3 bg-white mb-2 border-b border-gray-200">
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse mr-3"></div>
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
            </div>
            <div className="w-full h-5 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="w-full h-5 bg-gray-300 rounded animate-pulse mb-2"></div>
            <div className="flex justify-between">
              <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-12 h-5 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bet Options Skeleton */}
      <div className="bg-white p-3">
        <div className="flex space-x-1 mb-4">
          <div className="w-24 h-10 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-24 h-10 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Bet Amount Selectors Skeleton */}
        <div className="grid grid-cols-6 gap-2 mb-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-300 rounded animate-pulse"></div>
          ))}
        </div>

        {/* Totals Skeleton */}
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="w-32 h-5 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ))}
          
          {/* Checkbox Skeleton */}
          <div className="flex justify-end items-center">
            <div className="w-36 h-4 bg-gray-300 rounded animate-pulse mr-2"></div>
            <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Create Coupon Button Skeleton */}
      <div className="mt-auto">
        <div className="w-full h-14 bg-gray-300 rounded animate-pulse"></div>
      </div>

      {/* Bottom Nav Skeleton */}
      <nav className="flex justify-around py-3 bg-[#1a2b43]">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-16 h-4 mt-1 bg-gray-700 rounded animate-pulse"></div>
          </div>
        ))}
      </nav>
    </div>
  );
} 