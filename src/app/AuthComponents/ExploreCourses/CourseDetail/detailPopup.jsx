'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RxCross2 } from 'react-icons/rx';
import { HiOutlineUser, HiOutlineUsers } from 'react-icons/hi';
import { AiFillStar } from 'react-icons/ai';
import { RiShareForwardLine } from 'react-icons/ri';
import { BsClipboard2Data } from "react-icons/bs";
import { motion } from 'framer-motion';
import Image from 'next/image';
import Pic from '../../../../../public/Courses/detail.png';
import { fetchCourseSummary, clearError } from '../../../../../slices/courseSlice'; // Adjust import path as needed

const DetailPopup = ({ courseData, onClose }) => {
  const dispatch = useDispatch();
  const { courseSummary, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    if (courseData?._id) {
      dispatch(fetchCourseSummary(courseData._id));
    }
  }, [courseData, dispatch]);

  useEffect(() => {
    if (error) {
      console.error('Error fetching course summary:', error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Format number with commas
  const formatNumber = (num) => {
    return num?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") || '0';
  };

  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-[1px] p-4'
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg border border-[#f8f4f4] w-full max-w-sm mx-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
        >
          <RxCross2 />
        </button>

        <div className="space-y-6">
          <Image src={Pic} alt="Course Detail" width={50} height={50} />
          <h1 className='font-bold text-2xl'>About This Course</h1>
          
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="flex items-center">
                <BsClipboard2Data className="w-6 h-6 mr-3"/>
                <span>
                  {courseSummary?.counts?.docs || 0} Docs, {courseSummary?.counts?.tests || 0} Tests and {courseSummary?.counts?.videos || 0} videos included
                </span>
              </div>

              <div className="flex items-center">
                <HiOutlineUser className="w-6 h-6 mr-3" />
                <span>{courseSummary?.teacher?.name || courseData?.teacher || 'Instructor'}</span>
              </div>

              <div className="flex items-center">
                <HiOutlineUsers className="w-6 h-6 mr-3" />
                <span>{formatNumber(courseSummary?.stats?.studentsThisWeek )} Student learning this week</span>
              </div>

              <div className="flex items-center">
                <AiFillStar className="w-6 h-6 mr-3" />
                <span>
                  {courseSummary?.stats?.ratingAvg } rating ({formatNumber(courseSummary?.stats?.ratingCount)} students)
                </span>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl shadow hover:bg-gray-200 flex items-center justify-center mx-auto w-full">
            <RiShareForwardLine className="w-5 h-5 mr-2" />
            Share this course
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailPopup;