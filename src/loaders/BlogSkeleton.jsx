import React from "react";
import { Skeleton } from "../components/ui/skeleton";

const BlogCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-44 w-full bg-gray-200" />
      <div className="p-4">
        <div className="flex justify-between mb-3">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-5/6 mb-1" />
        <Skeleton className="h-3 w-4/5" />
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
