'use client';

import React, { useRef, useState, useEffect } from 'react';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Image from 'next/image';
import { motion } from 'framer-motion';
import course1 from '../../../../public/Courses/1.png';
import SideShow from './SideShow';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../../../slices/courseSlice';
import LoadingSpinner from '@/components/loadingSpinner';

const tabsData = [
  { id: 'all', label: 'All Courses' },
  { id: 'mock', label: 'Mock Tests' },
  { id: 'subjects', label: 'Main Subjects' },
  { id: 'practice', label: 'Practice' },
  { id: 'guidance', label: 'Guidance' },
  { id: 'cuet', label: 'CUET' },
  { id: 'revision', label: 'Revision' },
  { id: 'reference', label: 'Reference Books' },
];

const Tabs = ({ activeTab, setActiveTab, onTabChange }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -200 : 200,
        behavior: "smooth"
      });
    }
  };

  // Mouse drag scrolling
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
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 z-10 bg-black text-white shadow p-2 rounded-full"
      >
        <FiChevronLeft />
      </button>

      <motion.div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide mx-10 py-2 no-scrollbar"
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {tabsData.map((tab) => (
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

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 z-10 bg-black text-white shadow p-2 rounded-full"
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

const CourseCard = ({ course, onClick }) => {
  // derive price status + amount + weekly learners (non-breaking, tiny chips)
  const isFree = (course.priceType || '').toLowerCase() === 'free';
  const amount = course.effectivePrice ?? course.basePrice ?? course.price;
  const weeklyLearners = course.studentsThisWeek ?? course.weeklyLearners ?? course.students ?? 0;

  return (
    <motion.div
      className="border rounded-lg p-4 flex items-center justify-between gap-4 mb-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onClick(course._id, isFree)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 relative">
          <Image 
            src={course.image || course1} 
            alt={course.name} 
            fill 
            className="object-contain rounded" 
          />
        </div>
        <div className="flex-1">
          <h2 className="font-semibold text-lg">{course.name}</h2>
          <p className="text-sm text-gray-600 line-clamp-2">
            {course.description}
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {/* Price status (Free / Premium) */}
            <span className={`text-xs px-2 py-1 rounded ${
              isFree ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
            }`}>
              {isFree ? 'Free' : 'Premium'}
            </span>

            {/* Amount only if Premium */}
            {!isFree && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                PKR {amount}
              </span>
            )}

            {/* Weekly learners */}
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {weeklyLearners} learning this week
            </span>

            {/* keep the existing optional tags too */}
            {course.duration && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {course.duration}
              </span>
            )}
            {course.examCategory && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {course.examCategory}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="text-2xl"><FiChevronRight /></div>
    </motion.div>
  );
};

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  
  const { courses, loading, error, pagination } = useSelector((state) => state.courses);
  
  useEffect(() => {
    const filters = {
      search: '',
      priceType: '',
      tag: '',
      sort: 'newest',
      page: 1,
      limit: 12
    };
    dispatch(fetchCourses(filters));
  }, [dispatch]);

  useEffect(() => {
    setIsFiltering(true);
    if (courses && courses.length > 0) {
      let filtered = courses;
      if (activeTab !== 'all') {
        filtered = courses.filter(course => {
          const category = course.examCategory?.toLowerCase() || '';
          return category.includes(activeTab);
        });
      }
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses([]);
    }
    const timer = setTimeout(() => setIsFiltering(false), 300);
    return () => clearTimeout(timer);
  }, [courses, activeTab]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsFiltering(true);
    if (courses && courses.length > 0) {
      let filtered = courses;
      if (tabId !== 'all') {
        filtered = courses.filter(course => {
          const category = course.examCategory?.toLowerCase() || '';
          return category.includes(tabId);
        });
      }
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses([]);
    }
    setTimeout(() => setIsFiltering(false), 300);
  };

  const handleCourseClick = (courseId, isFree) => {
    if (isFree) {
      // Redirect free courses to detail page
      router.push(`/AuthComponents/ExploreCourses/CourseDetail/${courseId}`);
    } else {
      // Redirect premium courses to pricing plan
      router.push('/AuthComponents/pricingPlan');
    }
  };

  return (
    <section className="grid lg:grid-cols-[70%_30%] grid-cols-1 gap-2">
      <div className='flex flex-col gap-6 py-6 w-[90%] mx-auto'>
        <h1 className='text-[22px] font-semibold text-center'>All NEET Courses</h1>
        
        <Tabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onTabChange={handleTabChange} 
        />

        {(loading || isFiltering) && (
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
          {!loading && !isFiltering && filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard 
                key={course._id} 
                course={course} 
                onClick={handleCourseClick} 
              />
            ))
          ) : (
            !loading && !isFiltering && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No courses found for this category.</p>
                <p className="text-gray-400 text-sm mt-2">Try selecting a different category or check back later.</p>
              </div>
            )
          )}
        </div>

        {pagination && pagination.pages > 1 && activeTab === 'all' && !loading && !isFiltering && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => {
                  dispatch(fetchCourses({ page }));
                }}
                className={`px-3 py-1 rounded ${
                  page === pagination.page
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
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

export default Page;