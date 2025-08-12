'use client';

import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState, useRef } from "react";
import Image from 'next/image';
import Icon from '../../../../public/CourseCard/img.png';
import { motion, AnimatePresence } from "framer-motion";

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState("All Courses");
  const [visibleCourses, setVisibleCourses] = useState(8);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const tabScrollRef = useRef(null);

  const tabs = [
    "All Courses",
    "Main Subject",
    "Mock Test",
    "Science",
    "Math",
    "English",
    "History",
  ];

  const allCourses = [
    { type: "Science", icon: Icon },
    { type: "Math", icon: Icon },
    { type: "English", icon: Icon },
    { type: "History", icon: Icon },
    { type: "Mock Test", icon: Icon },
    { type: "Main Subject", icon: Icon },
    { type: "PMS test practice", icon: Icon },
    { type: "PMS test practice", icon: Icon },
    { type: "Math", icon: Icon },
    { type: "Science", icon: Icon },
    { type: "English", icon: Icon },
  ];

  const filteredCourses =
    activeTab === "All Courses"
      ? allCourses
      : allCourses.filter(course =>
          course.type.toLowerCase().includes(activeTab.toLowerCase())
        );

  const coursesPerPage = 8;
  const totalSlides = Math.ceil(Math.min(filteredCourses.length, visibleCourses) / coursesPerPage);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  const toggleCourseView = () => {
    if (!isExpanded) {
      setVisibleCourses(filteredCourses.length);
    } else {
      setVisibleCourses(8);
      setCurrentSlide(0);
      document.getElementById("courses-section")?.scrollIntoView({ behavior: "smooth" });
    }
    setIsExpanded(!isExpanded);
  };

  const visibleCoursesToRender = isExpanded
    ? filteredCourses
    : filteredCourses.slice(currentSlide * coursesPerPage, (currentSlide + 1) * coursesPerPage);

  return (
    <motion.div
      id="courses-section"
      className="p-6 max-w-7xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Your Courses</h2>
      </div>

      {/* Tab menu with smooth scroll */}
      <div className="relative mb-6">
        <button
          onClick={() => tabScrollRef.current?.scrollBy({ left: -150, behavior: 'smooth' })}
          className="absolute left-0 z-10 p-2 bg-gray-200 hover:bg-gray-300 rounded-full top-1/2 -translate-y-1/2"
        >
          <FiChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => tabScrollRef.current?.scrollBy({ left: 150, behavior: 'smooth' })}
          className="absolute right-0 z-10 p-2 bg-gray-200 hover:bg-gray-300 rounded-full top-1/2 -translate-y-1/2"
        >
          <FiChevronRight className="w-5 h-5" />
        </button>

        <motion.div
          ref={tabScrollRef}
          className="flex items-center overflow-x-auto px-10 space-x-2 custom-scroll"
          style={{
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none' // IE/Edge
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <style jsx>{`
            .custom-scroll::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera */
            }
          `}</style>

          {tabs.map((tab) => (
            <motion.button
              key={tab}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setActiveTab(tab);
                setVisibleCourses(8);
                setCurrentSlide(0);
                setIsExpanded(false);
              }}
              className={`px-4 py-2 rounded-sm whitespace-nowrap text-sm font-medium transition-colors duration-200 border ${
                activeTab === tab
                  ? "bg-blue-600 text-white"
                  : "bg-white text-black hover:bg-gray-300"
              }`}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Courses Grid */}
      <motion.div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 transition-all duration-500">
        <AnimatePresence>
          {visibleCoursesToRender.map((course, index) => (
            <motion.div
              key={`${currentSlide}-${index}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className={`border border-gray-600 rounded-lg p-4 pb-2 shadow-sm transition-transform duration-300 hover:shadow-md ${
                course.type === "GUIDE" ? "bg-blue-50" : "bg-white"
              }`}
            >
              <Image src={course.icon} alt="Icon" />
              <div className="text-md font-semibold text-center mb-1 py-2">
                {course.type}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* View more button */}
      {filteredCourses.length > 8 && (
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleCourseView}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D6D6D6] rounded-full hover:bg-blue-50 transition"
          >
            {isExpanded ? (
              <>
                View Less <FiChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View More Courses <FiChevronDown className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
