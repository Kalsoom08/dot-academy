'use client';

import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-transparent bg-opacity-50 backdrop-blur-[1px] z-50">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-[#7D287E] rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
