'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaEye, FaEdit } from 'react-icons/fa';
import course from '../../../../../public/Courses/course.png';

const Courses = () => {
  const [filter, setFilter] = useState('All');

  const courseData = [
    {
      id: 1,
      title: 'English Grammer complete course',
      students: 200,
      price: 'Free',
      status: 'Publish',
      image: course,
    },
    {
      id: 2,
      title: 'English Grammer complete course',
      students: 200,
      price: 'Free',
      status: 'Drafts',
      image: course,
    },
    {
      id: 3,
      title: 'English Grammer complete course',
      students: 200,
      price: 'Free',
      status: 'Pending',
      image: course,
    },
    {
      id: 4,
      title: 'English Grammer complete course',
      students: 200,
      price: 'Free',
      status: 'Publish',
      image: course,
    },
    {
      id: 5,
      title: 'English Grammer complete course',
      students: 200,
      price: 'Premium',
      status: 'PremiumCourses',
      image: course,
    },
    {
      id: 6,
      title: 'English Grammer complete course',
      students: 200,
      price: 'Free',
      status: 'FreeCourses',
      image: course,
    },
    {
      id: 7,
      title: 'English Grammer complete course',
      students: 200,
      price: 'Free',
      status: 'FreeCourses',
      image: course,
    },
  ];

  const filters = [
    'All',
    'Publish',
    'Drafts',
    'Pending',
    'Archieved',
    'NewestFirst',
    'OldestFirst',
    'FreeCourses',
    'PremiumCourses',
    'Category',
    'Author',
  ];

  const filteredCourses =
    filter === 'All'
      ? courseData
      : filter === 'NewestFirst'
        ? [...courseData].reverse()
        : courseData.filter((course) => course.status === filter);

  return (
    <section className="lg:p-4">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Courses</h1>
        <div className="flex gap-4 flex-wrap items-center">
          <button className="bg-[#7d287e] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#692069] transition">
            + Create Course
          </button>
          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {filters.map((option) => (
              <option value={option} key={option}>
                {option === 'All' ? 'Sort By - All' : option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-4">
        {filteredCourses.map((course, index) => (
          <div
            key={course.id}
            className="flex items-center justify-between bg-white border border-gray-300 rounded-lg lg:px-4 md:px-4 px-2 py-2 shadow-sm hover:shadow transition"
          >
            <div className="flex items-center gap-4">
              <span className="font-semibold text-lg w-6 text-gray-700">{index + 1}.</span>
              <Image
                src={course.image}
                alt={course.title}
                className=""
              />
              <div>
                <h2 className="font-medium text-gray-800 text-sm sm:text-base">{course.title}</h2>
                <p className="text-[12px] text-gray-500">
                  {course.students} Students |{' '}
                  <span className={`font-medium ${course.price === 'Free' ? 'text-[#7D287E]' : 'text-blue-600'}`}>
                    {course.price}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex gap-3 text-gray-600">
              <FaEye className="cursor-pointer hover:text-[#7d287e]" />
              <FaEdit className="cursor-pointer hover:text-[#7d287e]" />
            </div>
          </div>
        ))}
        {filteredCourses.length === 0 && (
          <p className="text-center text-gray-500 text-sm py-6">No courses match this filter.</p>
        )}
      </div>
    </section>
  );
};

export default Courses;
