'use client';

import React from 'react';
import Link from 'next/link';

export default function CouponError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1e2b3f] text-white p-6">
      <div className="bg-[#152133] p-8 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-red-500">Something went wrong</h2>
        <p className="mb-4 text-gray-300">
          We apologize, but there was an error loading your betting coupon. Please try again or navigate back to the sports page.
        </p>
        <details className="mb-6 text-sm bg-[#1a2634] p-3 rounded">
          <summary className="cursor-pointer font-medium">Error details</summary>
          <p className="mt-2 text-gray-400">{error?.message || 'No error message available'}</p>
        </details>
        <div className="flex flex-col space-y-2">
          <button 
            onClick={reset} 
            className="bg-[#00B3E3] hover:bg-[#0096c0] text-white py-2 px-4 rounded"
          >
            Try Again
          </button>
          <Link 
            href="/sport-bets" 
            className="bg-transparent border border-[#00B3E3] hover:bg-[#0096c0] text-white py-2 px-4 rounded text-center"
          >
            Go to Sports
          </Link>
        </div>
      </div>
    </div>
  );
} 