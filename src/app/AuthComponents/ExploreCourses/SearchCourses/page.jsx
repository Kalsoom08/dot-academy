'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CiSearch } from "react-icons/ci";
import { FiChevronRight, FiArrowLeft, FiBook, FiUsers, FiClock, FiStar } from "react-icons/fi";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, getCourseEnrollmentInfo } from '../../../../../slices/courseSlice';
import LoadingSpinner from '@/components/loadingSpinner';
import course1 from '../../../../../public/Courses/1.png';

const SearchCoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [enrollmentStatus, setEnrollmentStatus] = useState([]);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const { courses, loading, error, pagination } = useSelector((state) => state.courses);

  // Fetch courses on component mount - same as Courses component
  useEffect(() => {
    dispatch(fetchCourses({ 
      page: 1, 
      limit: 50 
    }));
  }, [dispatch]);

  // Fetch enrollment status for all courses - same as Courses component
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

    // Rank: matches first (name > description > examCategory), then the rest
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
        // Score matches to sort inside "matches"
        const score = (nameHit ? 3 : 0) + (descHit ? 2 : 0) + (categoryHit ? 1 : 0);
        matches.push({ course, score });
      } else {
        rest.push(course);
      }
    }

    // Sort matches best first, then append non-matches
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

  // Handle course click - same as Courses component
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

  // Get enrollment status for a course - same as Courses component
  const getCourseEnrollment = (courseId) => {
    return enrollmentStatus.find(e => e.courseId === courseId) || {
      enrolled: false,
      pendingPayment: false,
      rejectedPayment: false
    };
  };

  // Get status badge info - updated with purple color scheme
  const getStatusInfo = (isFree, enrollment) => {
    if (isFree) return { text: "Free", color: "bg-green-100 text-green-800" };
    if (enrollment.enrolled) return { text: "Enrolled", color: "bg-purple-100 text-purple-800" };
    if (enrollment.pendingPayment) return { text: "Pending", color: "bg-yellow-100 text-yellow-800" };
    if (enrollment.rejectedPayment) return { text: "Rejected", color: "bg-red-100 text-red-800" };
    return { text: "Premium", color: "bg-purple-100 text-purple-800" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-lg border-b border-purple-100 p-6 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={handleGoBack}
              className="p-3 hover:bg-purple-50 rounded-xl transition-all duration-200 group border border-purple-200"
              aria-label="Go back"
            >
              <FiArrowLeft className="w-5 h-5 text-purple-600 group-hover:text-purple-800" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-purple-900">Discover Courses</h1>
              <p className="text-purple-600 mt-1">Find the perfect course for your learning journey</p>
            </div>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className='bg-white border-2 border-purple-200 w-full rounded-2xl px-6 flex justify-between items-center py-4 shadow-sm hover:shadow-md transition-all duration-300 focus-within:border-purple-500 focus-within:shadow-lg'
          >
            <input
              id="search-input"
              type="text"
              placeholder='Search by course name, description, or category...'
              className='text-purple-900 outline-none w-[90%] bg-transparent placeholder-purple-400 text-lg'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button 
              type="submit" 
              aria-label="Search"
              className="p-2 hover:bg-purple-50 rounded-xl transition-colors"
            >
              <CiSearch className="w-6 h-6 text-purple-500" />
            </button>
          </form>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-purple-600">
              {searchQuery.trim() ? `Found ${filteredCourses.length} courses` : `${filteredCourses.length} total courses`}
            </span>
            {searchQuery.trim() && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Loading States */}
          {(loading || isSearching || enrollmentLoading) && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <LoadingSpinner />
                <p className="text-purple-600 mt-4">
                  {loading ? 'Loading courses...' : isSearching ? 'Searching...' : 'Checking enrollments...'}
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-500 text-sm">!</span>
                </div>
                <div>
                  <h3 className="font-semibold text-red-800">Error loading courses</h3>
                  <p className="text-red-700 text-sm mt-1">{error.message || 'Please try again later'}</p>
                </div>
              </div>
            </div>
          )}

          {/* Courses Grid */}
          {!loading && !isSearching && !enrollmentLoading && (
            <div className="grid gap-6">
              {filteredCourses.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CiSearch className="w-10 h-10 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">No courses found</h3>
                  <p className="text-purple-600 max-w-md mx-auto">
                    {searchQuery.trim() 
                      ? `No courses match "${searchQuery}". Try different keywords.`
                      : 'No courses available at the moment.'
                    }
                  </p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => {
                    const isFree = course.priceType === 'free';
                    const enrollment = getCourseEnrollment(course._id);
                    const statusInfo = getStatusInfo(isFree, enrollment);
                    const amount = course.effectivePrice ?? course.basePrice ?? course.price;

                    return (
                      <div
                        key={course._id}
                        className="bg-white rounded-2xl border border-purple-200 p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:border-purple-300 group"
                        onClick={() => handleCourseClick(
                          course._id, 
                          isFree, 
                          course.name, 
                          enrollment.pendingPayment, 
                          enrollment.enrolled, 
                          enrollment.rejectedPayment
                        )}
                      >
                        {/* Course Image */}
                        <div className="relative h-48 mb-4 rounded-xl overflow-hidden bg-purple-50">
                          <Image
                            src={course.image || course1}
                            alt={course.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* Status Badge */}
                          <div className="absolute top-3 left-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                              {statusInfo.text}
                            </span>
                          </div>
                          {/* Price Badge for Premium */}
                          {!isFree && !enrollment.enrolled && (
                            <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full border border-purple-200">
                              <span className="text-sm font-bold text-purple-900">PKR {amount}</span>
                            </div>
                          )}
                        </div>

                        {/* Course Info */}
                        <div className="space-y-3">
                          <h3 className="font-bold text-lg text-purple-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                            {course.name}
                          </h3>
                          
                          {course.description && (
                            <p className="text-purple-700 text-sm line-clamp-2">
                              {course.description}
                            </p>
                          )}

                          {/* Course Meta */}
                          <div className="flex items-center gap-4 text-sm text-purple-600">
                            {course.duration && (
                              <div className="flex items-center gap-1">
                                <FiClock className="w-4 h-4" />
                                <span>{course.duration}</span>
                              </div>
                            )}
                            {(course.students || course.students === 0) && (
                              <div className="flex items-center gap-1">
                                <FiUsers className="w-4 h-4" />
                                <span>{course.students} students</span>
                              </div>
                            )}
                            {course.rating && (
                              <div className="flex items-center gap-1">
                                <FiStar className="w-4 h-4 text-yellow-400" />
                                <span>{course.rating}</span>
                              </div>
                            )}
                          </div>

                          {/* Category */}
                          {course.examCategory?.name && (
                            <div className="flex items-center gap-2 pt-2 border-t border-purple-100">
                              <FiBook className="w-4 h-4 text-purple-400" />
                              <span className="text-sm text-purple-600">{course.examCategory.name}</span>
                            </div>
                          )}

                          {/* CTA Arrow */}
                          <div className="flex justify-between items-center pt-3">
                            <span className="text-sm font-medium text-purple-600 group-hover:text-purple-700">
                              {enrollment.enrolled ? 'Continue Learning' : 'View Details'}
                            </span>
                            <FiChevronRight className="w-5 h-5 text-purple-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Pagination - same as Courses component */}
          {pagination && pagination.pages > 1 && !searchQuery.trim() && !loading && !isSearching && !enrollmentLoading && (
            <div className="flex justify-center mt-12 gap-2">
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => dispatch(fetchCourses({ page }))}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    page === pagination.page 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white text-purple-600 border border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchCoursesPage;