import React from 'react';

export default function MatchLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1a2634]">
      {/* Header (skeleton) */}
      <header className="bg-[#1e2b3f] flex justify-between items-center p-3 border-b border-[#2a3847]">
        <div className="w-6 h-6 bg-gray-700 rounded"></div>
        <div className="w-32 h-10 bg-gray-700 rounded"></div>
        <div className="w-10 h-6 bg-gray-700 rounded"></div>
      </header>

      {/* League section (skeleton) */}
      <div className="bg-[#006600] p-3 flex items-center">
        <div className="w-6 h-6 bg-gray-600 rounded mr-3"></div>
        <div className="w-2/3 h-6 bg-gray-600 rounded"></div>
      </div>

      {/* Teams section (skeleton) */}
      <div className="bg-black p-3 flex justify-between items-center">
        <div className="w-1/3 h-6 bg-gray-800 rounded"></div>
        <div className="w-1/4 h-6 bg-gray-800 rounded"></div>
        <div className="w-1/3 h-6 bg-gray-800 rounded"></div>
      </div>

      {/* View mode selector (skeleton) */}
      <div className="bg-[#333] p-2 flex">
        <div className="w-1/2 h-10 bg-gray-700 rounded mr-1"></div>
        <div className="w-1/2 h-10 bg-gray-700 rounded"></div>
      </div>

      {/* Market tabs (skeleton) */}
      <div className="bg-[#333] p-2 overflow-x-auto">
        <div className="flex">
          <div className="w-20 h-8 bg-gray-700 rounded mx-1"></div>
          <div className="w-20 h-8 bg-gray-700 rounded mx-1"></div>
          <div className="w-20 h-8 bg-gray-700 rounded mx-1"></div>
          <div className="w-20 h-8 bg-gray-700 rounded mx-1"></div>
        </div>
      </div>

      {/* Betting sections (skeleton) */}
      <div className="flex-grow">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="mb-2">
            <div className="bg-[#006600] p-3 flex justify-between">
              <div className="w-20 h-6 bg-gray-600 rounded"></div>
              <div className="w-6 h-6 bg-gray-600 rounded"></div>
            </div>
            <div className="p-2 bg-[#1A2635] grid grid-cols-3 gap-1">
              <div className="bg-gray-700 p-4 rounded h-20"></div>
              <div className="bg-gray-700 p-4 rounded h-20"></div>
              <div className="bg-gray-700 p-4 rounded h-20"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom navigation (skeleton) */}
      <nav className="fixed bottom-0 left-0 right-0 flex justify-around py-3 bg-[#1e2b3f] border-t border-[#2a3847]">
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-gray-700 rounded"></div>
          <div className="w-16 h-4 bg-gray-700 rounded mt-1"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-gray-700 rounded"></div>
          <div className="w-16 h-4 bg-gray-700 rounded mt-1"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-gray-700 rounded"></div>
          <div className="w-16 h-4 bg-gray-700 rounded mt-1"></div>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-6 h-6 bg-gray-700 rounded"></div>
          <div className="w-16 h-4 bg-gray-700 rounded mt-1"></div>
        </div>
      </nav>
    </div>
  );
} 