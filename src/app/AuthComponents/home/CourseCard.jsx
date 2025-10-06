'use client';

import { FiChevronLeft, FiChevronRight, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../../slices/courseSlice";
import LoadingSpinner from "@/components/loadingSpinner";

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState("All Courses");
  const [visibleCourses, setVisibleCourses] = useState(8);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const tabScrollRef = useRef(null);

  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);


  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const tabs = [
    "All Courses",
    "Main Subject",
    "Noun",
    "Science",
    "Math",
    "English",
    "History",
  ];

  const filteredCourses =
    activeTab === "All Courses"
      ? courses
      : courses.filter(course =>
          course.category?.toLowerCase().includes(activeTab.toLowerCase()) ||
          course.name?.toLowerCase().includes(activeTab.toLowerCase())
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

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const onTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 30) {
      tabScrollRef.current?.scrollBy({ left: 100, behavior: 'smooth' });
    } else if (distance < -30) {
      tabScrollRef.current?.scrollBy({ left: -100, behavior: 'smooth' });
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

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
          style={{ scrollBehavior: 'smooth' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <style jsx>{`
            .custom-scroll::-webkit-scrollbar {
              display: none;
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


      {loading && (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      )}
      {error && (
        <p className="text-center text-red-500 py-6">Failed to load courses. {String(error)}</p>
      )}

      {!loading && !error && (
        <motion.div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 transition-all duration-500">
          <AnimatePresence>
            {visibleCoursesToRender.map((course, index) => (
              <motion.div
                key={course._id || index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                className="border border-gray-600 rounded-lg p-4 pb-2 bg-white shadow-sm hover:shadow-md transition-transform duration-300"
              >
                {course.image && (
                  <Image
                    src={course.image}
                    alt={course.name}
                    width={200}
                    height={120}
                    className="w-full h-[120px] object-cover rounded-md mb-2"
                  />
                )}
                <div className="text-md font-semibold text-center mb-1 py-2">
                  {course.name}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

    
      {!loading && filteredCourses.length > 8 && (
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
