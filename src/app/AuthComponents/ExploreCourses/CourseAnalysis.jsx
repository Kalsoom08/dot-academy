'use client';
import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { MdCancel } from "react-icons/md"; 
import Image from 'next/image';
import { motion } from 'framer-motion';

import icon1 from '../../../../public/Courses/icon1.png';
import icon2 from '../../../../public/Courses/icon2.png';
import icon3 from '../../../../public/Courses/icon3.png';
import icon4 from '../../../../public/Courses/icon4.png';
import icon5 from '../../../../public/Courses/icon5.png';
import icon6 from '../../../../public/Courses/icon6.png';
import icon7 from '../../../../public/Courses/icon7.png';
import icon8 from '../../../../public/Courses/icon8.png'; 
import icon9 from '../../../../public/Courses/icon9.png';
import { fetchMyEnrollments } from '../../../../slices/courseSlice'; // Adjust import path as needed

function CourseAnalysis({ onClose, itemData }) { 
  const dispatch = useDispatch();
  const { enrollments, loading } = useSelector((state) => state.courses);
  const [progress, setProgress] = useState(0);
  const [courseStats, setCourseStats] = useState(null);

  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    // Fetch enrollments if not already loaded
    if (enrollments.length === 0) {
      dispatch(fetchMyEnrollments());
    }
  }, [dispatch, enrollments.length]);

  useEffect(() => {
    if (itemData?._id && enrollments.length > 0) {
      const currentEnrollment = enrollments.find(
        enrollment => enrollment.course?._id === itemData._id || enrollment.course === itemData._id
      );
      
      if (currentEnrollment) {
        calculateCourseStats(currentEnrollment);
      }
    }
  }, [itemData, enrollments]);

  const calculateCourseStats = (enrollment) => {
    // Calculate overall progress percentage
    const totalLessons = enrollment.course?.totalLessons || 1;
    const completedLessons = enrollment.completedLessons?.length || 0;
    const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
    setProgress(progressPercentage);

    // Calculate various statistics
    const stats = {
      contentViewed: `${completedLessons}/${totalLessons}`,
      testAttempted: calculateTestAttempted(enrollment),
      totalTestQuestions: calculateTotalTestQuestions(enrollment),
      totalTimeOnTest: calculateTotalTestTime(enrollment),
      correctIncorrect: calculateCorrectIncorrect(enrollment),
      avgTimePerQuestion: calculateAvgTimePerQuestion(enrollment),
      averageRank: calculateAverageRank(enrollment),
      averagePercentile: calculateAveragePercentile(enrollment),
      averageAccuracy: calculateAverageAccuracy(enrollment)
    };

    setCourseStats(stats);
  };

  // Mock calculation functions - replace with actual data from your backend
  const calculateTestAttempted = (enrollment) => {
    // This should come from quiz/assessment data
    const attemptedTests = enrollment.quizAttempts?.length || 0;
    const totalTests = enrollment.course?.totalQuizzes || 138;
    return `${attemptedTests}/${totalTests}`;
  };

  const calculateTotalTestQuestions = (enrollment) => {
    const attemptedQuestions = enrollment.quizAttempts?.reduce((total, attempt) => 
      total + (attempt.questions?.length || 0), 0) || 0;
    const totalQuestions = enrollment.course?.totalQuestions || 34;
    return `${attemptedQuestions}/${totalQuestions}`;
  };

  const calculateTotalTestTime = (enrollment) => {
    const totalTime = enrollment.quizAttempts?.reduce((total, attempt) => 
      total + (attempt.timeSpent || 0), 0) || 0;
    return formatTime(totalTime);
  };

  const calculateCorrectIncorrect = (enrollment) => {
    const correct = enrollment.quizAttempts?.reduce((total, attempt) => 
      total + (attempt.correctAnswers || 0), 0) || 0;
    const incorrect = enrollment.quizAttempts?.reduce((total, attempt) => 
      total + (attempt.incorrectAnswers || 0), 0) || 0;
    return `${correct}/${incorrect}`;
  };

  const calculateAvgTimePerQuestion = (enrollment) => {
    const totalQuestions = enrollment.quizAttempts?.reduce((total, attempt) => 
      total + (attempt.questions?.length || 0), 0) || 1;
    const totalTime = enrollment.quizAttempts?.reduce((total, attempt) => 
      total + (attempt.timeSpent || 0), 0) || 0;
    const avgTime = totalTime / totalQuestions;
    return formatTime(avgTime);
  };

  const calculateAverageRank = (enrollment) => {
    // This should come from ranking data
    return enrollment.averageRank || '167995';
  };

  const calculateAveragePercentile = (enrollment) => {
    // This should come from percentile data
    return enrollment.averagePercentile || '1429';
  };

  const calculateAverageAccuracy = (enrollment) => {
    const totalQuestions = enrollment.quizAttempts?.reduce((total, attempt) => 
      total + (attempt.questions?.length || 0), 0) || 1;
    const correctAnswers = enrollment.quizAttempts?.reduce((total, attempt) => 
      total + (attempt.correctAnswers || 0), 0) || 0;
    const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
    return `${accuracy}%`;
  };

  const formatTime = (seconds) => {
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  const testAndContents = [
    { image: icon1, title: 'Content Viewed', outOf: courseStats?.contentViewed || '0/0' },
    { image: icon2, title: 'Test Attempted', outOf: courseStats?.testAttempted || '0/0' },
    { image: icon3, title: 'Total Test Questions', outOf: courseStats?.totalTestQuestions || '0/0' },
    { image: icon4, title: 'Total Time on Test', outOf: courseStats?.totalTimeOnTest || '0s' },
    { image: icon5, title: 'Correct: Incorrect Questions', outOf: courseStats?.correctIncorrect || '0/0' },
    { image: icon6, title: 'Average Time per Question', outOf: courseStats?.avgTimePerQuestion || '0s' },
    { image: icon7, title: 'Average Rank', outOf: courseStats?.averageRank || '0' },
    { image: icon8, title: 'Average Percentile', outOf: courseStats?.averagePercentile || '0' },
    { image: icon9, title: 'Average Accuracy', outOf: courseStats?.averageAccuracy || '0%' }
  ];

  return (
    <motion.div 
      className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fadeIn"
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 0.95 }} 
      transition={{ duration: 0.5 }}
    >
      <div className='flex justify-between items-center border-b p-4'>
        <h1 className='text-2xl font-bold'>Course Analysis</h1>
        <MdCancel
          size={25}
          className='cursor-pointer'
          onClick={onClose}
          aria-label="Close analysis"
        /> 
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 p-6'>
        <div>
          <h2 className='text-lg font-semibold'>Course Progress</h2>
          <p className='text-sm text-gray-500 mt-2'>
            This shows your complete course progress. Finish all course content to reach 100%.
          </p>
          {loading && (
            <p className='text-sm text-blue-500 mt-2'>Loading course data...</p>
          )}
        </div>
        <div className='flex justify-center'>
          <div className='relative w-36 h-36'>
            <svg height="100%" width="100%" viewBox="0 0 144 144">
              <circle
                stroke="#e5e7eb"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx="72"
                cy="72"
              />
              <circle
                stroke="#7c287d"
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                r={normalizedRadius}
                cx="72"
                cy="72"
                transform="rotate(-90 72 72)"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='text-[#7c287d] font-bold text-xl'>{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className='p-4'>
        <h2 className='text-lg font-semibold mb-4'>Tests and Contents Analysis</h2>
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {testAndContents.map((item, index) => (
              <motion.div 
                key={index} 
                className='flex items-center gap-4' 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }} 
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Image src={item.image} alt={item.title} className='w-10 h-10' />
                <div>
                  <p className='text-sm'>{item.title}</p>
                  <p className='font-bold text-sm'>{item.outOf}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default CourseAnalysis;