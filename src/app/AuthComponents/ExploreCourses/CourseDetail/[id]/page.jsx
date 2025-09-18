'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { FiChevronDown, FiChevronUp, FiChevronRight } from 'react-icons/fi';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { CiLock } from 'react-icons/ci';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';

import course from '../../../../../../public/Courses/4.png';
import course2 from '../../../../../../public/Courses/5.png';
import topCourse1 from '../../../../../../public/Courses/3.png';
import topCourse2 from '../../../../../../public/Courses/6.png';
import cour1 from '../../../../../../public/Courses/cour1.png';

import TestPopup from '../testPopup';
import ConfirmTestPopup from '../confirmTestPopup';
import LoadingSpinner from '@/components/loadingSpinner';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseDetails } from '../../../../../../slices/courseSlice';

/** Build sections array with lessons, preserving sectionId on every item */
function useCourseSections(currentCourse) {
  return useMemo(() => {
    if (!currentCourse) return [];

    // API returns sections with lessons
    if (Array.isArray(currentCourse.sections) && currentCourse.sections.length > 0) {
      return currentCourse.sections.map((sec, sIdx) => {
        const sectionId = sec._id || sec.id || `section-${sIdx}`;
        const items = (sec.lessons || []).map((les, lIdx) =>
          mapLessonToItem(les, sectionId, lIdx)
        );
        return {
          sectionId,
          title: sec.title || `Section ${sIdx + 1}`,
          summary: buildSummary(items),
          items
        };
      });
    }

    // Fallback to flat lessons
    const lessons = Array.isArray(currentCourse.lessons) ? currentCourse.lessons : [];
    const sectionId = currentCourse._id || currentCourse.id || 'section-0';
    const items = lessons.map((les, lIdx) => mapLessonToItem(les, sectionId, lIdx));
    return [{
      sectionId,
      title: 'Lessons',
      summary: buildSummary(items),
      items
    }];
  }, [currentCourse]);
}

function mapLessonToItem(lesson, sectionId, index) {
  const typeRaw = String(lesson.type || lesson.contentType || '').toLowerCase();

  // Map backend schema → UI routes
  // video → CourseVideo
  // pdf/article → CourseData
  // mcq (quiz) → WorkSheetData
  let kind = 'doc';
  if (/video/.test(typeRaw)) kind = 'video';
  else if (/pdf|article/.test(typeRaw)) kind = 'doc';
  else if (/mcq|quiz|test|worksheet|sheet/.test(typeRaw)) kind = 'workSheet';

  const image =
    lesson.thumbnail ||
    lesson.image ||
    (kind === 'workSheet' ? cour1 : course);

  const weight =
    kind === 'video'
      ? `Video${lesson.duration ? ` | ${formatDuration(lesson.duration)}` : ''}`
      : kind === 'workSheet'
      ? `Test${lesson.questionsCount ? ` | ${lesson.questionsCount} ques` : ''}${lesson.timeLimit ? ` | ${formatDuration(lesson.timeLimit)}` : ''}`
      : `Docs${lesson.pages ? ` | ${lesson.pages} Pages` : ''}`;

  return {
    id: lesson._id || lesson.id || `${kind}-${index}`, // stable (no Math.random)
    sectionId,
    image,
    title: lesson.title || lesson.name || 'Lesson',
    weight,
    type: kind,
    icon: kind === 'workSheet' && lesson.locked ? <CiLock size={20} /> : null,
    unlock: kind === 'workSheet' && lesson.locked ? 'Unlock' : undefined
  };
}

function buildSummary(items) {
  const counts = items.reduce(
    (acc, it) => {
      acc[it.type] = (acc[it.type] || 0) + 1;
      return acc;
    },
    { doc: 0, video: 0, workSheet: 0 }
  );
  const parts = [];
  if (counts.video) parts.push(`${counts.video} Video${counts.video > 1 ? 's' : ''}`);
  if (counts.doc) parts.push(`${counts.doc} Doc${counts.doc > 1 ? 's' : ''}`);
  if (counts.workSheet) parts.push(`${counts.workSheet} Test${counts.workSheet > 1 ? 's' : ''}`);
  return parts.join(' | ');
}

function formatDuration(minOrSec) {
  const n = Number(minOrSec) || 0;
  if (n > 180) {
    const m = Math.floor(n / 60);
    const s = n % 60;
    return `${m}:${String(s).padStart(2, '0')} min`;
  }
  return `${n} min`;
}

function CourseDetail() {
  const [showTestPopup, setShowTestPopup] = useState(false);
  const [selectedTestItem, setSelectedTestItem] = useState(null);
  const [showConfirmTestPopup, setShowConfirmTestPopup] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const router = useRouter();
  const params = useParams();
  const courseId = params?.id;

  const dispatch = useDispatch();
  const { currentCourse, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    if (courseId) dispatch(fetchCourseDetails(courseId));
  }, [courseId, dispatch]);

  const courseSections = useCourseSections(currentCourse);

  const handleItemClick = (item) => {
    if (item.type === 'workSheet') {
      // MCQ/Worksheet
      router.push(`/AuthComponents/ExploreCourses/WorkSheetData?course=${courseId}&section=${item.sectionId}&lesson=${item.id}`);
      return;
    }
    if (item.type === 'video') {
      router.push(`/AuthComponents/ExploreCourses/CourseVideo?course=${courseId}&section=${item.sectionId}&lesson=${item.id}`);
      return;
    }
    // pdf / article → CourseData
    router.push(`/AuthComponents/ExploreCourses/CourseData?course=${courseId}&section=${item.sectionId}&lesson=${item.id}`);
  };

  const headerImage = currentCourse?.image || course2;
  const title = currentCourse?.name || 'Course';
  const weeklyLearners =
    currentCourse?.studentsThisWeek ??
    currentCourse?.weeklyLearners ??
    currentCourse?.students ??
    0;

  return (
    <motion.section
      className='flex flex-col'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className='flex flex-col md:flex-row justify-start items-center md:px-6 px-2 md:gap-6 gap-4 border-b pb-8'>
        <div className='w-full max-w-[200px]'>
          <Image
            src={headerImage}
            alt='Course'
            width={200}
            height={200}
            className='w-full h-auto'
          />
        </div>
        <div className='text-center md:text-left'>
          <button className='bg-red-400 px-3 py-1 rounded-md text-white text-sm'>INFINITY COURSE</button>
          <h1 className='text-[22px] md:text-[30px] font-bold'>{title}</h1>
          <p className='text-[12px] text-gray-400'>
            {Number(weeklyLearners || 0).toLocaleString('en-US')} Students Learning This Week
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="mx-4 my-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading course: {error.message || 'Unknown error'}
        </div>
      )}

      {/* Sections */}
      {!loading && !error && (
        <>
          <motion.div
            className='flex flex-col lg:flex-row px-4 py-10 gap-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className='w-full lg:w-[70%] flex flex-col gap-6'>
              {courseSections.length > 0 ? (
                courseSections.map((section, index) => (
                  <div key={section.sectionId || index} className='shadow-md shadow-gray-400 rounded-md'>
                    <div
                      className='flex justify-between items-center px-4 py-6 cursor-pointer'
                      onClick={() => setActiveIndex(index === activeIndex ? -1 : index)}
                    >
                      <div className='flex gap-4 sm:gap-10 text-[20px] sm:text-[25px] font-bold items-center'>
                        <h1 className='text-[#7c287d]'>{String(index + 1).padStart(2, '0')}</h1>
                        <div>
                          <h1 className='text-[18px] sm:text-[22px]'>{section.title}</h1>
                          <p className='text-[12px] text-gray-400'>{section.summary}</p>
                        </div>
                      </div>
                      {activeIndex === index ? (
                        <FiChevronUp size={30} className='text-[#7c287d] transition-all duration-300' />
                      ) : (
                        <FiChevronDown size={30} className='text-[#7c287d] transition-all duration-300' />
                      )}
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out px-4 ${activeIndex === index ? 'max-h-[2000px] opacity-100 py-4' : 'max-h-0 opacity-0 py-0'} flex flex-col gap-6`}
                    >
                      {section.items.map((item, i) => (
                        <div
                          key={item.id || i}
                          className='flex gap-4 sm:gap-6 items-start cursor-pointer hover:bg-gray-100 p-2 rounded-md'
                          onClick={() => handleItemClick(item)}
                        >
                          <Image src={item.image} alt={item.title} className='border w-[70px] h-[70px] object-contain' />
                          <div>
                            <h1 className='font-semibold text-[15px] sm:text-base'>{item.title}</h1>
                            <div className='flex gap-2 flex-wrap'>
                              <p className='text-[12px] text-gray-400'>{item.weight}</p>
                              {item.icon && (
                                <p className='text-yellow-600 flex items-center gap-1 text-[12px]'>
                                  {item.icon}
                                  {item.unlock}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No lessons available for this course yet.
                </div>
              )}
            </div>
          </motion.div>

          {/* your promos/blocks… (unchanged) */}
          {/* ...keep your bottom blocks exactly as you had them... */}
        </>
      )}

      {/* Test popups (unchanged behavior) */}
      <ConfirmTestPopup
        isVisible={showConfirmTestPopup}
        onConfirm={() => {
          setShowConfirmTestPopup(false);
          setShowTestPopup(true);
        }}
        onCancel={() => {
          setShowConfirmTestPopup(false);
          setSelectedTestItem(null);
        }}
        onClose={() => {
          setShowConfirmTestPopup(false);
          setSelectedTestItem(null);
        }}
      />

      {showTestPopup && (
        <TestPopup
          isVisible={showTestPopup}
          selectedTest={selectedTestItem}
          onClose={() => setShowTestPopup(false)}
          onStart={() => {
            // Your test start route (if needed)
            setShowTestPopup(false);
          }}
        />
      )}
    </motion.section>
  );
}

export default CourseDetail;
