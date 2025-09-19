'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { CiSearch } from "react-icons/ci";
import { FiChevronRight } from "react-icons/fi";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../../slices/courseSlice';
import LoadingSpinner from '@/components/loadingSpinner';
import course1 from '../../../public/Courses/1.png';

const SearchCourses = () => {
  const [filter, setFilter] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const { courses, loading, error } = useSelector((state) => state.courses);

  // initial fetch
  useEffect(() => {
    dispatch(fetchCourses({
      search: '',
      priceType: '',
      tag: '',
      sort: 'newest',
      page: 1,
      limit: 50
    }));
  }, [dispatch]);

  // derived lists
  const filteredBaseList = useMemo(() => {
    if (filter === 'courses') {
      // keep both free & premium (explicit, but same as all courses here)
      return courses.filter(c =>
        c.priceType === 'free' || c.priceType === 'premium'
      );
    }
    return courses;
  }, [courses, filter]);

  const rankedList = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return filteredBaseList;

    // rank: matches first (name > description > examCategory), then the rest
    const matches = [];
    const rest = [];

    for (const c of filteredBaseList) {
      const name = (c.name || '').toLowerCase();
      const desc = (c.description || '').toLowerCase();
      const cat  = (c.examCategory || '').toLowerCase();

      const nameHit = name.includes(q);
      const descHit = desc.includes(q);
      const catHit  = cat.includes(q);

      if (nameHit || descHit || catHit) {
        // score matches to sort inside “matches”
        const score = (nameHit ? 3 : 0) + (descHit ? 2 : 0) + (catHit ? 1 : 0);
        matches.push({ course: c, score });
      } else {
        rest.push(c);
      }
    }

    // sort matches best first, then append non-matches
    matches.sort((a, b) => b.score - a.score);

    return [...matches.map(m => m.course), ...rest];
  }, [filteredBaseList, searchQuery]);

  // local search indicator (nice UX)
  useEffect(() => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const t = setTimeout(() => setIsSearching(false), 150);
    return () => clearTimeout(t);
  }, [searchQuery]);

  const handleCourseClick = (courseId) => {
    router.push(`/AuthComponents/ExploreCourses/CourseDetail/${courseId}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Optional: also ping server-side search (kept client-rank regardless)
    dispatch(fetchCourses({
      search: searchQuery.trim(),
      priceType: '',
      tag: '',
      sort: 'newest',
      page: 1,
      limit: 50
    }));
  };

  return (
    <section className='flex flex-col gap-4 py-4'>
      {/* Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className='bg-gray-300 lg:w-[80%] md:w-[80%] w-[95%] m-auto rounded-full px-4 flex justify-between items-center py-2'
      >
        <input
          type="text"
          placeholder='Search courses...'
          className='text-gray-600 outline-none w-[90%] bg-transparent'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" aria-label="Search">
          <CiSearch className="w-5 h-5 text-gray-700" />
        </button>
      </form>

      {/* Filter Buttons */}
      <div className='bg-gray-300 m-auto rounded-full flex my-6 py-1 px-2 gap-2 lg:w-[30%] md:w-[60%] w-[80%]'>
        <button
          onClick={() => setFilter('courses')}
          className={`transition-all duration-300 rounded-full flex-1 cursor-pointer px-6 py-2 ${
            filter === 'courses' ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
          }`}
        >
          Courses
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`transition-all duration-300 rounded-full flex-1 cursor-pointer px-6 py-2 ${
            filter === 'all' ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
          }`}
        >
          All
        </button>
      </div>

      {/* Loading */}
      {(loading || isSearching) && (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-4">
          Error loading courses: {error.message || 'Unknown error'}
        </div>
      )}

      {/* Courses List */}
      <div className='w-[90%] mx-auto'>
        <h1 className='text-xl font-bold mb-4'>
          {searchQuery.trim() ? 'Results (matches first)' : filter === 'courses' ? 'Courses' : 'All Content'}
        </h1>

        {!loading && !isSearching && rankedList.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {searchQuery.trim() ? 'No courses match your search.' : 'No courses available.'}
            </p>
          </div>
        ) : (
          rankedList.map((course, index) => {
            const detail = [
              course.duration && `${course.duration}`,
              (course.students || course.students === 0) && `${course.students} students`,
            ].filter(Boolean).join(' | ');

            return (
              <div
                key={course._id || index}
                className='border rounded-lg p-4 flex items-center justify-between gap-4 mb-4 cursor-pointer hover:shadow-md transition-shadow'
                onClick={() => handleCourseClick(course._id)}
              >
                <div className='flex items-center gap-4'>
                  <div className='w-20 h-20 relative'>
                    <Image
                      src={course.image || course1}
                      alt={course.name}
                      fill
                      className='object-contain rounded'
                    />
                  </div>
                  <div>
                    <h2 className='font-semibold'>{course.name}</h2>
                    {course.description && (
                      <p className='text-sm text-gray-600 line-clamp-2'>{course.description}</p>
                    )}
                    {detail && (
                      <p className='text-sm text-gray-500 mt-1'>{detail}</p>
                    )}
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {course.priceType === 'free' ? 'Free' : 'Premium'}
                      </span>
                      {course.examCategory && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {course.examCategory}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className='text-2xl'><FiChevronRight /></div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default SearchCourses;
