"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../../slices/courseSlice";
import Pic from "../../../../public/dashboard/write.png";
import { FiBookOpen, FiArrowRight, FiClock } from "react-icons/fi";

const TopContentCard = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses({ sort: "popular", limit: 8 }));
  }, [dispatch]);

  const freeCourses = (courses || []).filter(
    (course) => course.priceType === "free"
  ).slice(0, 4);

  return (
    <motion.div
      className="bg-white rounded-2xl  sm:p-10 mx-4 sm:mx-8 mt-10 shadow-xl border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6 ">
        <h1 className="text-xl font-semibold text-gray-800">
          Free Courses of the Week
        </h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 text-sm font-medium text-[#661f69] hover:text-[#7b297a] transition"
        >
          View All <FiArrowRight />
        </motion.button>
      </div>

      {loading && (
        <p className="text-center text-gray-500 py-6">Loading courses...</p>
      )}
      {error && (
        <p className="text-center text-red-500 py-6">
          Failed to load content. {String(error)}
        </p>
      )}
      {!loading && freeCourses.length === 0 && (
        <p className="text-center text-gray-400 py-6">
          No free courses available right now
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
        {freeCourses.map((course, index) => (
          <motion.div
            key={course._id || index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="group flex gap-4 p-3 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white hover:shadow-md hover:border-[#661f69]/30 transition-all cursor-pointer"
          >
            <div className="relative flex-shrink-0 w-28 h-20 overflow-hidden rounded-lg">
              <Image
                src={course.image || Pic}
                alt={course.name || "Course"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 left-2 bg-[#661f69] text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">
                FREE
              </div>
            </div>

            <div className="flex flex-col justify-between w-full">
              <div>
                <p className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {course.name || "Untitled Course"}
                </p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                  {course.examCategory || "General"}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <FiClock className="w-3.5 h-3.5" />
                  {course.duration || "Self-paced"}
                </div>
                <div className="flex items-center gap-1 text-[#661f69] font-medium">
                  <FiBookOpen className="w-4 h-4" />
                  Learn Now
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopContentCard;
