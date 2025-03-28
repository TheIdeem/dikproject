import React from 'react';

export default function MatchesLoading() {
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
        <div className="flex flex-col space-y-2">
          <div className="w-32 h-6 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-24 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
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

      {/* Match Cards Skeleton */}
      <div className="flex-grow p-4">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="bg-[#152133] rounded-lg mb-4 p-4">
            <div className="flex justify-between mb-2">
              <div className="w-1/3 h-4 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-1/4 h-4 bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="mb-4 space-y-2">
              <div className="w-3/4 h-5 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-3/4 h-5 bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="flex justify-between">
              {Array(4).fill(0).map((_, j) => (
                <div key={j} className="w-1/5 h-12 bg-gray-700 rounded animate-pulse mx-1"></div>
              ))}
            </div>
          </div>
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