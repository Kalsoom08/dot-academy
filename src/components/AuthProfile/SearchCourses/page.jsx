'use client';

import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { FiChevronRight } from "react-icons/fi";
import Image from 'next/image';
import course1 from '../../../../../public/Courses/1.png';
import course2 from '../../../../../public/Courses/2.png';

const courseData = [
  {
    id: 'crash-course-10',
    image: course1,
    title: 'Crash Course: 10',
    detail: '192 Videos'
  },
  {
    id: 'english-grammar-basic',
    image: course2,
    title: 'English Grammar Basic',
    detail: '199 Docs | 37 Videos | 9 Test | 8 Flashcard'
  },
  {
    id: 'crash-course-10-v2',
    image: course1,
    title: 'Crash Course: 10',
    detail: '192 Videos'
  },
  {
    id: 'the-complete-sta-course',
    image: course1,
    title: 'The Complete STA Course',
    detail: '217 Docs | 406 Videos | 164 Test'
  },
  {
    id: 'english-language-course',
    image: course1,
    title: 'English Language Course',
    detail: '140 Docs | 226 Videos | 92 Test'
  }
];

const Page = () => {
  const [filter, setFilter] = useState('courses');

  const filteredCourses =
    filter === 'courses'
      ? courseData.filter((item) =>
          item.title.toLowerCase().includes('course')
        )
      : courseData;

  const handleCourseClick = () => {
    router.push(`/AuthComponents/ExploreCourses/CourseDetail`);
  };

  return (
    <section className='flex flex-col gap-4 py-4'>
      <div className='bg-gray-100 lg:w-[80%] md:w-[80%] w-[95%] m-auto rounded-full px-4 flex justify-between items-center py-2'>
        <input type="text" placeholder='Search' className='text-gray-600 outline-none w-[90%]' />
        <CiSearch className="w-4 h-4 text-gray-600" />
      </div>
      <div className='bg-gray-100 m-auto rounded-full flex my-6 py-1 px-2 gap-2 lg:w-[30%] md:w-[60%] w-[80%]'>
        <button
          onClick={() => setFilter('courses')}
          className={`transition-all duration-300 rounded-full flex-1 cursor-pointer px-6 py-2 ${
            filter === 'courses'
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          Courses
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`transition-all duration-300 rounded-full flex-1 cursor-pointer px-6 py-2 ${
            filter === 'all'
              ? 'bg-black text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          All
        </button>
      </div>
      <div className='w-[90%] mx-auto'>
        <h1 className='text-xl font-bold mb-4'>Courses</h1>
        {filteredCourses.map((course, index) => (
          <div
            key={course.id || index}
            className='border rounded-lg p-4 flex items-center justify-between gap-4 mb-4 cursor-pointer hover:shadow-md transition-shadow'
            onClick={() => handleCourseClick(course.id)}
          >
            <div className='flex items-center gap-4'>
              <div className='w-20 h-20 relative'>
                <Image src={course.image} alt="Course" fill className='object-contain rounded' />
              </div>
              <div>
                <h2 className='font-semibold'>{course.title}</h2>
                <p className='text-sm text-gray-600'>{course.detail}</p>
              </div>
            </div>
            <div className='text-2xl'><FiChevronRight /></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Page;