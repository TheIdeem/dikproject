import React from 'react';

export default function SportLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1e2b3f]">
      {/* Header Skeleton */}
      <header className="sports-header flex justify-between items-center p-4">
        <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
        <div className="w-36 h-10 bg-gray-700 rounded animate-pulse"></div>
        <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
      </header>

      {/* Title Skeleton */}
      <div className="flex items-center p-4">
        <div className="w-8 h-8 mr-4 bg-gray-700 rounded animate-pulse"></div>
        <div className="w-1/3 h-8 bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* Tabs Skeleton */}
      <div className="overflow-x-auto whitespace-nowrap py-2 border-b border-gray-700">
        <div className="inline-flex p-2 space-x-2">
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="w-16 h-8 bg-gray-700 rounded animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Search Skeleton */}
      <div className="p-4">
        <div className="w-full h-12 bg-gray-700 rounded animate-pulse"></div>
      </div>

      {/* List Skeleton */}
      <div className="flex-grow">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="p-4 m-2 bg-gray-700 rounded animate-pulse h-16"></div>
        ))}
      </div>

      {/* Bottom Nav Skeleton */}
      <nav className="flex justify-around py-3 border-t border-gray-700">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-16 h-4 mt-1 bg-gray-700 rounded animate-pulse"></div>
          </div>
        ))}
      </nav>
    </div>
  );
} 