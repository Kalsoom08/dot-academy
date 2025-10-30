'use client';

import React, { useRef, useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses, getCourseEnrollmentInfo } from '../../../../slices/courseSlice';
import { fetchCategories } from '../../../../slices/categorySlice';
import SideShow from './SideShow';
import LoadingSpinner from '@/components/loadingSpinner';
import course1 from '../../../../public/Courses/1.png';

const Tabs = ({ activeTab, setActiveTab, onTabChange, tabs }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -200 : 200,
        behavior: "smooth"
      });
    }
  };

  let isDown = false;
  let startX;
  let scrollLeft;

  const onMouseDown = (e) => {
    isDown = true;
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
  };
  const onMouseLeave = () => (isDown = false);
  const onMouseUp = () => (isDown = false);
  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <div className="relative w-full flex items-center">
      <button onClick={() => scroll("left")} className="absolute left-0 z-10 bg-black text-white shadow p-2 rounded-full">
        <FiChevronLeft />
      </button>

      <motion.div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide mx-10 py-2 no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`whitespace-nowrap px-6 py-2 border rounded-md transition-all ${
              activeTab === tab.id
                ? "bg-gray-100 text-black border-black"
                : "bg-white text-gray-600 border-black"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      <button onClick={() => scroll("right")} className="absolute right-0 z-10 bg-black text-white shadow p-2 rounded-full">
        <FiChevronRight />
      </button>
    </div>
  );
};


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


const Courses = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);

  const { courses, loading, error, pagination } = useSelector(state => state.courses);
  const { categories, loading: catLoading } = useSelector(state => state.categories);


  useEffect(() => {
    dispatch(fetchCourses({ page: 1, limit: 12 }));
    dispatch(fetchCategories());
  }, [dispatch]);


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
            return { courseId: course._id, enrolled: false, pendingPayment: false, rejectedPayment: false };
          }
        }));
        setEnrollmentStatus(statuses);
        setEnrollmentLoading(false);
      };
      fetchAllEnrollmentStatus();
    }
  }, [courses, dispatch]);


const dynamicTabs = categories?.map(cat => ({ id: cat.name.toLowerCase(), label: cat.name })) || [];
const staticTabs = [
  { id: 'all', label: 'All Courses' },
  { id: 'premium', label: 'Premium' }
];
const tabs = [...staticTabs, ...dynamicTabs];


  useEffect(() => {
    setIsFiltering(true);
    if (courses && courses.length > 0) {
      let filtered = courses;
if (activeTab === 'premium') {
  filtered = courses.filter(course => course.priceType === 'premium');
} else if (activeTab !== 'all') {
  filtered = courses.filter(course => course.examCategory?.name?.toLowerCase() === activeTab);
}

      setFilteredCourses(filtered);
    } else setFilteredCourses([]);
    const timer = setTimeout(() => setIsFiltering(false), 300);
    return () => clearTimeout(timer);
  }, [courses, activeTab]);

  const handleTabChange = (tabId) => setActiveTab(tabId);

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

  return (
    <section className="grid lg:grid-cols-[70%_30%] grid-cols-1 gap-2">
      <div className='flex flex-col gap-6 py-6 w-[90%] mx-auto custom-scroll'>
        <h1 className='text-[22px] font-semibold text-center'>All Courses</h1>

        <Tabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onTabChange={handleTabChange} 
          tabs={tabs} 
        />

        {(loading || isFiltering || enrollmentLoading) && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error loading courses: {error.message || 'Unknown error'}
          </div>
        )}

        <div>
          {!loading && !isFiltering && !enrollmentLoading && filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseCard 
                key={course._id} 
                course={course} 
                onClick={handleCourseClick} 
                enrollmentStatus={enrollmentStatus} 
              />
            ))
          ) : (
            !loading && !isFiltering && !enrollmentLoading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No courses found for this category.</p>
              </div>
            )
          )}
        </div>

        {pagination && pagination.pages > 1 && activeTab === 'all' && !loading && !isFiltering && !enrollmentLoading && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => dispatch(fetchCourses({ page }))}
                className={`px-3 py-1 rounded ${page === pagination.page ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>

      <SideShow />
    </section>
  );
};

export default Courses;