"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../../slices/courseSlice";
import Pic from "../../../../public/dashboard/write.png";

const TopContentCard = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses({ sort: "popular", limit: 4 }));
  }, [dispatch]);

  const topCourses = courses?.slice(0, 4) || [];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-lg font-semibold mb-4">Top Content This Week</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && (
        <p className="text-center text-red-500">
          Failed to load content. {String(error)}
        </p>
      )}

      {!loading && topCourses.length === 0 && (
        <p className="text-center text-gray-400">No top content available</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {topCourses.map((course, index) => (
          <motion.div
            key={course._id || index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="flex gap-4 border rounded-lg p-3 hover:shadow-md transition border-gray-300"
          >
            <Image
              src={course.image || Pic}
              alt={course.name || "Course"}
              width={150}
              height={100}
              className="w-36 h-24 object-cover rounded"
            />
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium">
                {course.name || "Untitled Course"}
              </p>
              <p className="text-xs text-gray-500">
                {course.views
                  ? `${course.views} views`
                  : "No views data available"}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopContentCard;
