import Link from 'next/link';
import React from 'react';

export default function MatchNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a2634] text-white p-4">
      <div className="bg-[#1e2b3f] rounded-lg p-6 max-w-md w-full shadow-lg text-center">
        <div className="text-red-500 text-5xl font-bold mb-4">404</div>
        <h1 className="text-2xl font-bold mb-4">Match Not Found</h1>
        <p className="text-gray-400 mb-6">
          The match you're looking for doesn't exist or may have been removed.
        </p>
        <div className="flex flex-col gap-4">
          <Link href="/live-bets" className="bg-[#006600] hover:bg-[#008800] text-white font-bold py-2 px-4 rounded transition duration-300">
            View Live Matches
          </Link>
          <Link href="/" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
} 