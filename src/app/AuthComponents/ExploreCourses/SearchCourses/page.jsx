'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CiSearch } from "react-icons/ci";
import { FiChevronRight, FiArrowLeft } from "react-icons/fi";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, getCourseEnrollmentInfo } from '../../../../../slices/courseSlice';
import LoadingSpinner from '@/components/loadingSpinner';
import course1 from '../../../../../public/Courses/1.png';

const CourseCard = ({ course, onClick, enrollmentStatus }) => {
  const isFree = course.priceType === 'free';
  const amount = course.effectivePrice ?? course.basePrice ?? course.price;
  
  const courseEnrollment = enrollmentStatus?.find(e => e.courseId === course._id);
  const hasPendingPayment = courseEnrollment?.pendingPayment;
  const isEnrolled = courseEnrollment?.enrolled;
  const hasRejectedPayment = courseEnrollment?.rejectedPayment;

  const getStatusText = () => {
    if (isFree) return "Free";
    if (isEnrolled) return "Enrolled";
    if (hasPendingPayment) return "Payment Pending";
    if (hasRejectedPayment) return "Payment Rejected";
    return "Premium";
  };

  const getStatusColor = () => {
    if (isFree) return "text-green-700 bg-green-50 border-green-200";
    if (isEnrolled) return "text-purple-700 bg-purple-50 border-purple-200";
    if (hasPendingPayment) return "text-amber-700 bg-amber-50 border-amber-200";
    if (hasRejectedPayment) return "text-red-700 bg-red-50 border-red-200";
    return "text-purple-700 bg-purple-50 border-purple-200";
  };

  const getStatusBadgeColor = () => {
    if (isFree) return "bg-green-100 text-green-800";
    if (isEnrolled) return "bg-purple-100 text-purple-800";
    if (hasPendingPayment) return "bg-amber-100 text-amber-800";
    if (hasRejectedPayment) return "bg-red-100 text-red-800";
    return "bg-purple-100 text-purple-800";
  };

  const handleClick = () => {
    onClick(course._id, isFree, course.name, hasPendingPayment, isEnrolled, hasRejectedPayment);
  };

  return (
    <motion.div
      className="border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4 mb-4 cursor-pointer hover:shadow-lg transition-all duration-300 bg-white group"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="w-20 h-20 relative flex-shrink-0">
          <Image 
            src={course.image || course1} 
            alt={course.name} 
            fill 
            className="object-cover rounded-lg" 
          />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-lg text-gray-900 mb-1">{course.name}</h2>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{course.description}</p>
          <div className="flex gap-2 flex-wrap items-center">
            <span className={`text-xs px-3 py-1.5 rounded-full font-semibold border ${getStatusBadgeColor()}`}>
              {getStatusText()}
            </span>
            {!isFree && !isEnrolled && !hasPendingPayment && !hasRejectedPayment && (
              <span className="text-sm font-semibold text-gray-800">PKR {amount}</span>
            )}
            {course.duration && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {course.duration}
              </span>
            )}
            {course.examCategory?.name && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {course.examCategory.name}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <div className={`text-sm font-semibold px-3 py-1.5 rounded-full border ${getStatusColor()}`}>
          {getStatusText()}
        </div>
        <div className="text-2xl text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-purple-600">
          <FiChevronRight />
        </div>
      </div>
    </motion.div>
  );
};

const SearchCoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState([]);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const { courses, loading, error, pagination } = useSelector((state) => state.courses);

  // Fetch courses on component mount
  useEffect(() => {
    dispatch(fetchCourses({ 
      page: 1, 
      limit: 50 
    }));
  }, [dispatch]);

  // Fetch enrollment status for all courses
  useEffect(() => {
    if (courses && courses.length > 0) {
      setEnrollmentLoading(true);
      const fetchAllEnrollmentStatus = async () => {
        const statuses = await Promise.all(courses.map(async (course) => {
          try {
            const result = await dispatch(getCourseEnrollmentInfo(course._id)).unwrap();
            return {
              courseId: course._id,
              enrolled: result.data.hasAccess,
              pendingPayment: result.data.pendingPayment !== null,
              rejectedPayment: result.data.rejectedPayment !== null,
            };
          } catch {
            return { 
              courseId: course._id, 
              enrolled: false, 
              pendingPayment: false, 
              rejectedPayment: false 
            };
          }
        }));
        setEnrollmentStatus(statuses);
        setEnrollmentLoading(false);
      };
      fetchAllEnrollmentStatus();
    }
  }, [courses, dispatch]);

  // Filter and rank courses based on search query
  const filteredCourses = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return courses;

    const matches = [];
    const rest = [];

    for (const course of courses) {
      const name = (course.name || '').toLowerCase();
      const desc = (course.description || '').toLowerCase();
      const category = (course.examCategory?.name || '').toLowerCase();

      const nameHit = name.includes(q);
      const descHit = desc.includes(q);
      const categoryHit = category.includes(q);

      if (nameHit || descHit || categoryHit) {
        const score = (nameHit ? 3 : 0) + (descHit ? 2 : 0) + (categoryHit ? 1 : 0);
        matches.push({ course, score });
      } else {
        rest.push(course);
      }
    }

    matches.sort((a, b) => b.score - a.score);
    return [...matches.map(m => m.course), ...rest];
  }, [courses, searchQuery]);

  // Local search indicator
  useEffect(() => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const t = setTimeout(() => setIsSearching(false), 150);
    return () => clearTimeout(t);
  }, [searchQuery]);

  // Handle course click
  const handleCourseClick = (courseId, isFree, courseName, hasPendingPayment, isEnrolled, hasRejectedPayment = false) => {
    if (isEnrolled || isFree) {
      router.push(`/AuthComponents/ExploreCourses/CourseDetail/${courseId}`);
    } else {
      const queryParams = new URLSearchParams({
        courseId,
        courseName: courseName || 'Premium Course',
        pending: hasPendingPayment ? 'true' : 'false',
        rejected: hasRejectedPayment ? 'true' : 'false'
      }).toString();
      router.push(`/AuthComponents/pricingPlan?${queryParams}`);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchCourses({
      search: searchQuery.trim(),
      page: 1,
      limit: 50
    }));
  };

  const handleGoBack = () => {
    router.back();
  };

  // Focus search input on mount
  useEffect(() => {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.focus();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stunning Header with Search */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-lg border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-6">
          {/* Back Button and Title */}
          <div className="flex items-center gap-4 mb-6">
            <motion.button
              onClick={handleGoBack}
              className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 border border-gray-300 group"
              aria-label="Go back"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            </motion.button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Search Courses</h1>
              <p className="text-gray-600 mt-1">Find the perfect course for your learning journey</p>
            </div>
          </div>

          {/* Enhanced Search Bar with Purple Theme */}
          <motion.form
            onSubmit={handleSearchSubmit}
            className="relative group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <input
                id="search-input"
                type="text"
                placeholder="Search by course name, description, or category..."
                className="w-full h-16 pl-16 pr-6 text-lg border-2 border-gray-300 rounded-2xl bg-white outline-none transition-all duration-300 focus:border-purple-500 focus:shadow-lg hover:border-gray-400 placeholder-gray-400 text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                <CiSearch className="w-6 h-6 text-gray-400 group-focus-within:text-purple-500 transition-colors duration-300" />
              </div>
              {searchQuery && (
                <motion.button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                >
                  ✕
                </motion.button>
              )}
              <motion.button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-purple-700 transition-colors duration-200 shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Search
              </motion.button>
            </div>
          </motion.form>

          {/* Results Count */}
          <motion.div 
            className="mt-4 flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-sm text-gray-600 font-medium">
              {searchQuery.trim() 
                ? `Found ${filteredCourses.length} course${filteredCourses.length !== 1 ? 's' : ''} for "${searchQuery}"`
                : `${filteredCourses.length} total courses available`
              }
            </span>
            {searchQuery.trim() && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200"
              >
                Clear search
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Loading States */}
        {(loading || isSearching || enrollmentLoading) && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <LoadingSpinner />
              <p className="text-gray-600 mt-4 text-lg">
                {loading ? 'Loading courses...' : isSearching ? 'Searching...' : 'Checking enrollments...'}
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <motion.div 
            className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-sm font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-red-800">Error loading courses</h3>
                <p className="text-red-700 text-sm mt-1">{error.message || 'Please try again later'}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Courses List */}
        {!loading && !isSearching && !enrollmentLoading && (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredCourses.length === 0 ? (
              <motion.div 
                className="text-center py-20 bg-white rounded-2xl border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CiSearch className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">No courses found</h3>
                <p className="text-gray-600 max-w-md mx-auto text-lg mb-6">
                  {searchQuery.trim() 
                    ? `We couldn't find any courses matching "${searchQuery}". Try different keywords.`
                    : 'No courses available at the moment. Please check back later.'
                  }
                </p>
                {searchQuery.trim() && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors duration-200"
                  >
                    Clear Search
                  </button>
                )}
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <CourseCard 
                      course={course} 
                      onClick={handleCourseClick} 
                      enrollmentStatus={enrollmentStatus} 
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Pagination */}
        {pagination && pagination.pages > 1 && !searchQuery.trim() && !loading && !isSearching && !enrollmentLoading && (
          <motion.div 
            className="flex justify-center mt-12 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => dispatch(fetchCourses({ page }))}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  page === pagination.page 
                    ? 'bg-purple-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-sm'
                }`}
              >
                {page}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SearchCoursesPage;