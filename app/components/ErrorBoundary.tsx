'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error('Caught error:', error);
      setError(error.error || new Error('Unknown error occurred'));
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#1e2b3f] text-white p-6">
        <div className="bg-[#152133] p-8 rounded-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4 text-red-500">Something went wrong</h2>
          <p className="mb-4 text-gray-300">
            We apologize, but there was an error loading this page. Please try again or navigate back to the home page.
          </p>
          <details className="mb-6 text-sm bg-[#1a2634] p-3 rounded">
            <summary className="cursor-pointer font-medium">Error details</summary>
            <p className="mt-2 text-gray-400">{error?.message || 'No error message available'}</p>
            <p className="mt-2 text-gray-400">{error?.stack || 'No stack trace available'}</p>
          </details>
          <div className="flex flex-col space-y-2">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[#00B3E3] hover:bg-[#0096c0] text-white py-2 px-4 rounded"
            >
              Reload Page
            </button>
            <Link 
              href="/" 
              className="bg-transparent border border-[#00B3E3] hover:bg-[#0096c0] text-white py-2 px-4 rounded text-center"
            >
              Go to Home Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 