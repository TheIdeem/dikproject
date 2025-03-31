import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#1a2538]">
      <div className="w-12 h-12 border-4 border-[#0095d8] border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-3 text-white">Loading...</span>
    </div>
  );
};

export default LoadingSpinner; 