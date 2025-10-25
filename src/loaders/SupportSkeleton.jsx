import React from "react";

const SupportMessageSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 py-10 text-left border border-gray-100 animate-pulse">
      <div className="mb-4">
        <div className="h-4 w-24 bg-gray-300 rounded-md mb-2"></div>
        <div className="h-3 w-36 bg-gray-200 rounded-md"></div>
      </div>

      <div className="space-y-2">
        <div className="h-3 w-full bg-gray-200 rounded-md"></div>
        <div className="h-3 w-5/6 bg-gray-200 rounded-md"></div>
        <div className="h-3 w-3/4 bg-gray-200 rounded-md"></div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="h-3 w-20 bg-gray-200 rounded-md"></div>
        <div className="h-3 w-16 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default SupportMessageSkeleton;
