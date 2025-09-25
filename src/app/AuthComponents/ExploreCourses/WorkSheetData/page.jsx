'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UpNext from '../UpNext';
import SideShow from '../SideShow';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonContent } from '../../../../../slices/courseSlice';
import LoadingSpinner from '@/components/loadingSpinner';
import CourseReview from '../CourseReview';

const WorkSheetData = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const searchParams = useSearchParams();
  const courseId = searchParams.get('course');
  const sectionId = searchParams.get('section');
  const lessonId = searchParams.get('lesson');

  const dispatch = useDispatch();
  const { currentLesson, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    if (courseId && lessonId) {
      dispatch(fetchLessonContent({ courseId, lessonId }));
    }
  }, [courseId, lessonId, dispatch]);

  const handleSelect = (questionKey, selectedOptionKey) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionKey]: selectedOptionKey }));
  };

  // Convert lesson content to worksheet format
  const worksheetData = currentLesson?.mcqs
    ? currentLesson.mcqs.map((item, index) => {
        // Filter out any MongoDB ID values from options
        const validOptions = Object.entries(item.options || {})
          .filter(([key, value]) => {
            // Exclude values that look like MongoDB IDs (24-character hex strings)
            const isMongoId = typeof value === 'string' && /^[0-9a-fA-F]{24}$/.test(value);
            return !isMongoId && value !== null && value !== undefined && value !== '';
          })
          .map(([key, value]) => ({
            key,
            value,
          }));
        
        return {
          id: index + 1,
          question: item.question,
          options: validOptions,
          correctAnswer: item.correctAnswer, // This should be "A", "B", "C", or "D"
          information: item.explanation,
        };
      })
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        Error loading worksheet: {error.message || 'Unknown error'}
      </div>
    );
  }

  return (
    <motion.section
      className="lg:px-6 py-4 grid lg:grid-cols-[70%_30%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="lg:px-6 px-2"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-bold text-[22px] mb-4">Worksheet: {currentLesson?.title || 'Quiz'}</h1>

        {worksheetData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No quiz data available for this lesson.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 py-10">
            {worksheetData.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex flex-col gap-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <h2 className="font-semibold">Q{item.id}: {item.question}</h2>

                {item.options && item.options.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {item.options.map((option, idx) => {
                      const isSelected = selectedAnswers[item.id] === option.key;
                      const isCorrect = option.key === item.correctAnswer;

                      return (
                        <motion.div
                          key={idx}
                          onClick={() => handleSelect(item.id, option.key)}
                          className="flex items-center gap-3 cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div
                            className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center text-white text-[12px]"
                            style={{
                              backgroundColor: isSelected
                                ? isCorrect
                                  ? '#10B981' // green for correct
                                  : '#EF4444' // red for incorrect
                                : 'white',
                              color: isSelected ? 'white' : 'black',
                              borderColor: isSelected ? 'transparent' : '#ccc',
                            }}
                          >
                            {isSelected && (isCorrect ? '✓' : '✕')}
                          </div>
                          <p
                            className={`${isSelected ? (isCorrect ? 'text-green-700 font-medium' : 'text-red-700 font-medium') : 'text-black'}`}
                          >
                            {option.value}
                          </p>
                        </motion.div>
                      );
                    })}
                    {item.information && (
                      <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-600 italic mt-1 flex items-center gap-1 flex-wrap">
                        The green box
                        <span className="w-2 h-2 bg-green-700 rounded-full inline-block"></span>
                        means your answer is correct, and the red box
                        <span className="w-2 h-2 bg-red-700 rounded-full inline-block"></span>
                        means your answer is incorrect
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="flex flex-col mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="italic text-gray-600">
            ECADEMY DOT is your go-to online learning platform designed to help you learn something valuable every day. Whether you're a student, a professional, or just curious.
          </p>
          <p className="italic text-gray-600">
            With flexible and affordable subscription plans, you get unlimited access to all learning materials anytime, anywhere. Start learning with ECADEMY DOT and turn your goals into achievements!
          </p>
          <motion.button
            className="bg-[#282828] shadow-md px-6 py-2 text-white rounded-md my-4 m-auto cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Plan
          </motion.button>
        </motion.div>

        <UpNext />
      </motion.div>
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='flex flex-col justify-between'
      >
        <SideShow />
        <CourseReview />
      </motion.div>
    </motion.section>
  );
};

export default WorkSheetData;