'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function MatchError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a2634] text-white p-4">
      <div className="bg-[#1e2b3f] rounded-lg p-6 max-w-md w-full shadow-lg text-center">
        <div className="text-red-500 text-5xl font-bold mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-gray-400 mb-6">
          We encountered an error while loading this match data.
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={reset}
            className="bg-[#006600] hover:bg-[#008800] text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Try again
          </button>
          <Link href="/live-bets" className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition duration-300">
            View Other Matches
          </Link>
        </div>
      </div>
    </div>
  );
} 