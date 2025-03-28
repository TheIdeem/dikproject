"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SportsRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/sport-bets');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1e2b3f] text-white">
      <p>Redirecting to Sports...</p>
    </div>
  );
} 