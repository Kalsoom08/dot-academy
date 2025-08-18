'use client';

import React, { useRef, useState } from 'react';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Image from 'next/image';
import { motion } from 'framer-motion';
import course1 from '../../../../../public/Courses/1.png';
import course2 from '../../../../../public/Courses/2.png';
import SideShow from '../SideShow';
import { useRouter } from 'next/navigation';

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

const courseData = [
  {
    id: 'crash-course-10',
    image: course1,
    title: 'Crash Course: 10',
    detail: '192 Videos',
    category: 'subjects'
  },
  {
    id: 'english-grammar-basic',
    image: course2,
    title: 'English Grammar Basic',
    detail: '199 Docs | 37 Videos | 9 Test | 8 Flashcard',
    category: 'practice'
  },
  {
    id: 'the-complete-sta-course',
    image: course1,
    title: 'The Complete STA Course',
    detail: '217 Docs | 406 Videos | 164 Test',
    category: 'mock'
  },
  {
    id: 'english-language-course',
    image: course1,
    title: 'English Language Course',
    detail: '140 Docs | 226 Videos | 92 Test',
    category: 'revision'
  }
];

const Tabs = ({ activeTab, setActiveTab }) => {
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

  return (
    <div className="relative w-full flex items-center">
      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 z-10 bg-black text-white shadow p-2 rounded-full"
      >
        <FiChevronLeft />
      </button>

      {/* Tabs */}
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
            onClick={() => setActiveTab(tab.id)}
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

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 z-10 bg-black text-white shadow p-2 rounded-full"
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

const CourseCard = ({ course, onClick }) => (
  <motion.div
    className="border rounded-lg p-4 flex items-center justify-between gap-4 mb-4 cursor-pointer hover:shadow-md transition-shadow"
    onClick={() => onClick(course.id)}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 relative">
        <Image src={course.image} alt={course.title} fill className="object-contain rounded" />
      </div>
      <div>
        <h2 className="font-semibold">{course.title}</h2>
        <p className="text-sm text-gray-600">{course.detail}</p>
      </div>
    </div>
    <div className="text-2xl"><FiChevronRight /></div>
  </motion.div>
);


const Page = () => {
    const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  const filteredCourses =
    activeTab === 'all'
      ? courseData
      : courseData.filter((course) => course.category === activeTab);

  const handleCourseClick = (id) => {
    router.push('/AuthComponents/ExploreCourses/CourseDetail');
  };

  return (
    <section className="grid lg:grid-cols-[70%_30%] grid-cols-1 gap-2">
        <div className='flex flex-col gap-6 py-6 w-[90%] mx-auto'>
            <h1 className='text-[22px] font-semibold text-center'>All NEET Courses</h1>
               <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} onClick={handleCourseClick} />
          ))
        ) : (
          <p className="text-gray-500">No courses available.</p>
        )}
      </div>
        </div>
        <SideShow />
    </section>
  );
};

export default Page;
