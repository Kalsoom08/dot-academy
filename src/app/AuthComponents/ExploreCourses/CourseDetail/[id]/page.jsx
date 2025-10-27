'use client';
import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { FiChevronDown, FiChevronUp, FiChevronRight, FiCheck, FiBarChart2 } from 'react-icons/fi';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';

import course from '../../../../../../public/Courses/4.png';
import course2 from '../../../../../../public/Courses/5.png';
import cour1 from '../../../../../../public/Courses/cour1.png';

import ConfirmTestPopup from '../confirmTestPopup';
import MCQQuizPopup from '../MCQQuizPopup';
import LoadingSpinner from '@/components/loadingSpinner';
import AskAnyDoubt from '../../askAnyDoubt';
import CourseAnalysis from '../../CourseAnalysis';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseDetails, fetchLessonContent } from '../../../../../../slices/courseSlice';

/** Build sections array with lessons, preserving sectionId on every item */
function useCourseSections(currentCourse, userProgress) {
  return useMemo(() => {
    if (!currentCourse) return [];

    let totalSections = 0;
    let totalLessons = 0;

    // API returns sections with lessons
    if (Array.isArray(currentCourse.sections) && currentCourse.sections.length > 0) {
      const sections = currentCourse.sections.map((sec, sIdx) => {
        const sectionId = sec._id || sec.id || `section-${sIdx}`;
        const sectionLessons = sec.lessons || [];
        const items = sectionLessons.map((les, lIdx) =>
          mapLessonToItem(les, sectionId, lIdx, userProgress)
        );
        
        totalSections++;
        totalLessons += sectionLessons.length;

        return {
          sectionId,
          title: sec.title || `Section ${sIdx + 1}`,
          description: sec.description || '',
          summary: buildSummary(items),
          items
        };
      });

      console.log(`Course Structure: ${totalSections} sections, ${totalLessons} lessons`);
      return sections;
    }

    // Fallback to flat lessons
    const lessons = Array.isArray(currentCourse.lessons) ? currentCourse.lessons : [];
    const sectionId = currentCourse._id || currentCourse.id || 'section-0';
    const items = lessons.map((les, lIdx) => mapLessonToItem(les, sectionId, lIdx, userProgress));
    
    console.log(`Course Structure: 1 section, ${lessons.length} lessons`);
    
    return [{
      sectionId,
      title: currentCourse.name || 'Course Lessons',
      description: 'All course lessons',
      summary: buildSummary(items),
      items
    }];
  }, [currentCourse, userProgress]);
}

function mapLessonToItem(lesson, sectionId, index, userProgress) {
  const typeRaw = String(lesson.type || lesson.contentType || '').toLowerCase();

  // Map backend schema → UI routes
  let kind = 'doc';
  let typeLabel = 'Document';
  
  if (typeRaw === 'video') {
    kind = 'video';
    typeLabel = 'Video';
  } else if (typeRaw === 'pdf') {
    kind = 'pdf';
    typeLabel = 'PDF';
  } else if (typeRaw === 'article') {
    kind = 'doc';
    typeLabel = 'Document';
  } else if (typeRaw === 'mcq') {
    kind = 'workSheet';
    typeLabel = 'Quiz';
  }

  const image = lesson.thumbnail || lesson.image || (kind === 'workSheet' ? cour1 : course);

  // Check if lesson is completed
  const isCompleted = userProgress?.completedLessons?.includes(lesson._id) || false;
  
  // Get quiz attempts for this lesson
  const quizAttempts = userProgress?.quizAttempts?.filter(attempt => 
    attempt.lesson === lesson._id
  ) || [];
  
  const bestScore = quizAttempts.length > 0 ? 
    Math.max(...quizAttempts.map(attempt => attempt.score || 0)) : 0;

  const weight = kind === 'video'
    ? `${typeLabel}${lesson.duration ? ` | ${formatDuration(lesson.duration)}` : ''}`
    : kind === 'workSheet'
    ? `${typeLabel} | ${quizAttempts.length > 0 ? `Best: ${bestScore}%` : 'Click to attempt'}`
    : `${typeLabel}`;

  return {
    id: lesson._id || lesson.id || `${kind}-${index}`,
    sectionId,
    image,
    title: lesson.title || lesson.name || `Lesson ${index + 1}`,
    weight,
    type: kind,
    lessonType: typeRaw,
    lessonData: lesson, // Store full lesson data
    mcqs: lesson.mcqs || [], // Store MCQs for quiz
    pdfUrl: lesson.pdfUrl, // Store PDF URL for PDF lessons
    isCompleted,
    quizAttempts,
    bestScore
  };
}

function buildSummary(items) {
  const counts = items.reduce(
    (acc, it) => {
      acc[it.type] = (acc[it.type] || 0) + 1;
      return acc;
    },
    { doc: 0, video: 0, workSheet: 0, pdf: 0 }
  );
  
  const completedCount = items.filter(item => item.isCompleted).length;
  const totalCount = items.length;
  
  const parts = [];
  if (counts.video) parts.push(`${counts.video} Video${counts.video > 1 ? 's' : ''}`);
  if (counts.doc) parts.push(`${counts.doc} Document${counts.doc > 1 ? 's' : ''}`);
  if (counts.pdf) parts.push(`${counts.pdf} PDF${counts.pdf > 1 ? 's' : ''}`);
  if (counts.workSheet) parts.push(`${counts.workSheet} Quiz${counts.workSheet > 1 ? 'zes' : ''}`);
  
  // Add progress information
  if (totalCount > 0) {
    parts.push(`${completedCount}/${totalCount} completed`);
  }
  
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAskDoubt, setShowAskDoubt] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showQuizPopup, setShowQuizPopup] = useState(false);
  const [showAnalysisPopup, setShowAnalysisPopup] = useState(false);
  const [selectedQuizLesson, setSelectedQuizLesson] = useState(null);
  const [loadingLesson, setLoadingLesson] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [userProgress, setUserProgress] = useState({
    completedLessons: [],
    quizAttempts: [],
    totalTimeSpent: 0,
    lastAccessed: null
  });

  const router = useRouter();
  const params = useParams();
  const courseId = params?.id;

  const dispatch = useDispatch();
  const { currentCourse, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseDetails(courseId));
      loadUserProgress();
    }
  }, [courseId, dispatch]);

  // Load user progress from localStorage
  const loadUserProgress = () => {
    if (courseId) {
      const storedProgress = localStorage.getItem(`courseProgress_${courseId}`);
      if (storedProgress) {
        setUserProgress(JSON.parse(storedProgress));
      }
    }
  };

  // Save user progress to localStorage
  const saveUserProgress = (progress) => {
    if (courseId) {
      const updatedProgress = {
        ...progress,
        lastAccessed: new Date().toISOString()
      };
      localStorage.setItem(`courseProgress_${courseId}`, JSON.stringify(updatedProgress));
      setUserProgress(updatedProgress);
    }
  };

  // Mark lesson as completed
  const markLessonCompleted = (lessonId) => {
    const updatedProgress = {
      ...userProgress,
      completedLessons: [...new Set([...userProgress.completedLessons, lessonId])]
    };
    saveUserProgress(updatedProgress);
  };

  // Add quiz attempt
  const addQuizAttempt = (lessonId, quizResults, timeSpent) => {
    const newAttempt = {
      lesson: lessonId,
      score: quizResults.score,
      correctCount: quizResults.correctCount,
      total: quizResults.total,
      timestamp: new Date().toISOString(),
      timeSpent: timeSpent || 0
    };

    const updatedProgress = {
      ...userProgress,
      quizAttempts: [...userProgress.quizAttempts, newAttempt],
      totalTimeSpent: userProgress.totalTimeSpent + (timeSpent || 0)
    };
    
    // Mark quiz as completed if score is good enough
    if (quizResults.score >= 60) {
      updatedProgress.completedLessons = [...new Set([...updatedProgress.completedLessons, lessonId])];
    }
    
    saveUserProgress(updatedProgress);
  };

  const courseSections = useCourseSections(currentCourse, userProgress);

  const handleItemClick = async (item) => {
    if (!item.id || !courseId || !item.sectionId) {
      console.error('Missing required parameters for navigation');
      return;
    }

    setLoadingItemId(item.id);
    setLoadingLesson(true);

    try {
      // For all lesson types except video, fetch the full lesson content first
      if (item.lessonType === 'video') {
        // Mark video as completed when accessed
        markLessonCompleted(item.id);
        router.push(`/AuthComponents/ExploreCourses/CourseVideo?course=${courseId}&section=${item.sectionId}&lesson=${item.id}`);
      } else {
        // For MCQ, PDF, and Article lessons, fetch the full lesson content first
        const result = await dispatch(fetchLessonContent({
          courseId, 
          lessonId: item.id
        })).unwrap();
        
        console.log('Fetched lesson content:', result.data);
        
        if (item.lessonType === 'mcq') {
          // Handle MCQ lessons
          if (result.data.mcqs && Array.isArray(result.data.mcqs) && result.data.mcqs.length > 0) {
            setSelectedQuizLesson(result.data);
            setShowConfirmPopup(true);
          } else {
            alert('No questions available for this quiz yet. Please check back later.');
          }
        } else if (item.lessonType === 'pdf') {
          // Mark PDF as completed when accessed
          markLessonCompleted(item.id);
          // Handle PDF lessons - navigate to CourseData page with the fetched data
          if (result.data.pdfUrl) {
            router.push(`/AuthComponents/ExploreCourses/CourseData?course=${courseId}&section=${item.sectionId}&lesson=${item.id}`);
          } else {
            alert('PDF document not available for this lesson yet. Please check back later.');
          }
        } else {
          // Mark article as completed when accessed
          markLessonCompleted(item.id);
          // Handle Article and other lesson types
          router.push(`/AuthComponents/ExploreCourses/CourseData?course=${courseId}&section=${item.sectionId}&lesson=${item.id}`);
        }
      }
    } catch (error) {
      console.error('Error fetching lesson details:', error);
      alert('Error loading lesson content. Please try again.');
    } finally {
      setLoadingLesson(false);
      setLoadingItemId(null);
    }
  };

  const handleStartQuiz = () => {
    setShowConfirmPopup(false);
    setShowQuizPopup(true);
  };

  const handleQuizComplete = (results, timeSpent) => {
    console.log('Quiz completed with results:', results);
    if (selectedQuizLesson) {
      addQuizAttempt(selectedQuizLesson._id, results, timeSpent);
    }
  };

  const headerImage = currentCourse?.image || course2;
  const title = currentCourse?.name || 'Course';
  const description = currentCourse?.description || 'Explore this comprehensive course to enhance your skills and knowledge.';
  const weeklyLearners = currentCourse?.studentsThisWeek ?? currentCourse?.weeklyLearners ?? currentCourse?.students ?? 0;

  // Calculate overall course progress
  const totalLessons = courseSections.reduce((total, section) => total + section.items.length, 0);
  const completedLessons = userProgress.completedLessons.length;
  const courseProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  // Calculate total sections
  const totalSections = courseSections.length;

  return (
    <motion.section
      className='flex flex-col min-h-screen'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className='flex flex-col md:flex-row justify-start items-center md:px-6 px-4 md:gap-6 gap-4 border-b pb-8'>
        <div className='w-full max-w-[200px]'>
          <Image
            src={headerImage}
            alt={title}
            width={200}
            height={200}
            className='w-full h-auto rounded-lg'
          />
        </div>
        <div className='text-center md:text-left flex-1'>
          <div className='flex items-center gap-3 justify-center md:justify-start mb-2 flex-wrap'>
            <button
              onClick={() => setShowAskDoubt(true)}
              className="bg-[#7c287d] text-white px-6 py-1 rounded-lg font-semibold hover:bg-[#6b1f6b] transition"
            >
              Ask Any Doubt
            </button>
            <button
              onClick={() => setShowAnalysisPopup(true)}
              className="bg-[#7c287d] text-white px-6 py-1 rounded-lg font-semibold hover:bg-[#6b1f6b] transition flex items-center gap-2"
            >
              <FiBarChart2 className="w-4 h-4" />
              View Progress
            </button>
            {/* Course Progress Badge */}
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {courseProgress}% Complete
            </div>
          </div>
          <h1 className='text-[22px] md:text-[30px] font-bold text-gray-800'>{title}</h1>
          <p className='text-[14px] text-gray-600 mt-2 max-w-2xl'>
            {description}
          </p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
            <span>{totalSections} Section{totalSections !== 1 ? 's' : ''}</span>
            <span>{totalLessons} Lesson{totalLessons !== 1 ? 's' : ''}</span>
            <span>{Number(weeklyLearners || 0).toLocaleString('en-US')} Students This Week</span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3 max-w-md">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${courseProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>
      </div>

      {/* Loading State */}
      {(loading || loadingLesson) && (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
          {loadingLesson && <p className="ml-4 text-gray-600">Loading lesson content...</p>}
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 my-8">
          <p className="font-semibold">Error loading course</p>
          <p>{error.message || 'Please try again later.'}</p>
        </div>
      )}

      {/* Course Content */}
      {!loading && !loadingLesson && !error && (
        <motion.div
          className='flex flex-col px-4 py-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className='w-full max-w-6xl mx-auto'>
            {courseSections.length > 0 ? (
              <div className="space-y-6">
                {courseSections.map((section, index) => {
                  const sectionCompletedLessons = section.items.filter(item => item.isCompleted).length;
                  const sectionTotalLessons = section.items.length;
                  const sectionProgress = sectionTotalLessons > 0 ? 
                    Math.round((sectionCompletedLessons / sectionTotalLessons) * 100) : 0;

                  return (
                    <motion.div
                      key={section.sectionId || index}
                      className='bg-white shadow-gray-200 rounded-xl border border-gray-100 overflow-hidden'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      {/* Section Header */}
                      <div
                        className='flex justify-between items-center px-6 py-6 cursor-pointer bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 transition-all duration-300'
                        onClick={() => setActiveIndex(index === activeIndex ? -1 : index)}
                      >
                        <div className='flex gap-4 sm:gap-6 items-center'>
                          <div className='flex items-center gap-4'>
                            <div className="relative">
                              <h1 className='text-[#7c287d] text-2xl font-bold'>{String(index + 1).padStart(2, '0')}</h1>
                              {sectionProgress === 100 && (
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                                  <FiCheck className="w-2 h-2 text-white" />
                                </div>
                              )}
                            </div>
                            <div>
                              <h1 className='text-[18px] sm:text-[22px] font-bold text-gray-800'>{section.title}</h1>
                              {section.description && (
                                <p className='text-[14px] text-gray-600 mt-1'>{section.description}</p>
                              )}
                              <p className='text-[14px] text-gray-500 mt-1'>{section.summary}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="w-20 bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                                    style={{ width: `${sectionProgress}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500">{sectionProgress}%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {activeIndex === index ? (
                          <FiChevronUp size={24} className='text-[#7c287d] transition-all duration-300' />
                        ) : (
                          <FiChevronDown size={24} className='text-[#7c287d] transition-all duration-300' />
                        )}
                      </div>

                      {/* Section Content */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          activeIndex === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="px-6 pb-6">
                          <div className="space-y-4">
                            {section.items.map((item, i) => (
                              <motion.div
                                key={item.id || i}
                                className={`flex gap-4 sm:gap-6 items-center p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                                  item.isCompleted 
                                    ? 'border-purple-200 bg-purple-50 hover:border-purple-300' 
                                    : 'border-gray-200 bg-white hover:border-[#7c287d]'
                                } hover:shadow-md ${
                                  loadingItemId === item.id ? 'opacity-50' : ''
                                }`}
                                onClick={() => handleItemClick(item)}
                                whileHover={{ scale: loadingItemId === item.id ? 1 : 1.01 }}
                                whileTap={{ scale: loadingItemId === item.id ? 1 : 0.99 }}
                              >
                                <div className="flex-shrink-0 relative">
                                  <Image 
                                    src={item.image} 
                                    alt={item.title} 
                                    width={80} 
                                    height={80}
                                    className='rounded-lg border-2 border-gray-200 object-cover'
                                  />
                                  {item.isCompleted && (
                                    <div className="absolute top-1 right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                                      <FiCheck className="w-3 h-3 text-white" />
                                    </div>
                                  )}
                                  {loadingItemId === item.id && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                      <LoadingSpinner size="small" />
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h2 className='font-semibold text-[16px] sm:text-[18px] text-gray-800 truncate'>
                                      {item.title}
                                    </h2>
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                      item.lessonType === 'video' ? 'bg-purple-100 text-purple-800' : 
                                      item.lessonType === 'article' ? 'bg-purple-100 text-purple-800' : 
                                      item.lessonType === 'pdf' ? 'bg-purple-100 text-purple-800' : 
                                      item.lessonType === 'mcq' ? 'bg-purple-100 text-purple-800' : 
                                      'bg-purple-100 text-purple-800'
                                    }`}>
                                      {item.lessonType === 'video' ? 'Video' : 
                                       item.lessonType === 'article' ? 'Document' : 
                                       item.lessonType === 'pdf' ? 'PDF' : 
                                       item.lessonType === 'mcq' ? 'Quiz' : 'Lesson'}
                                    </span>
                                    {item.isCompleted && (
                                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                                        Completed
                                      </span>
                                    )}
                                    {item.lessonType === 'mcq' && item.quizAttempts.length > 0 && (
                                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                                        Best: {item.bestScore}%
                                      </span>
                                    )}
                                  </div>
                                  <div className='flex gap-3 flex-wrap items-center'>
                                    <p className='text-[13px] text-gray-600'>{item.weight}</p>
                                    {loadingItemId === item.id && (
                                      <span className="text-[#7c287d] text-xs">Loading...</span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-shrink-0">
                                  <FiChevronRight className={`text-xl ${
                                    item.isCompleted ? 'text-purple-500' : 'text-gray-400'
                                  }`} />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-gray-500 text-lg mb-4">No lessons available for this course yet.</div>
                <p className="text-gray-400 text-sm">Please check back later for updates.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Confirm Test Popup */}
      <ConfirmTestPopup
        isVisible={showConfirmPopup}
        onConfirm={handleStartQuiz}
        onCancel={() => setShowConfirmPopup(false)}
        onClose={() => setShowConfirmPopup(false)}
      />

      {/* MCQ Quiz Popup */}
      {selectedQuizLesson && (
        <MCQQuizPopup
          isVisible={showQuizPopup}
          onClose={() => {
            setShowQuizPopup(false);
            setSelectedQuizLesson(null);
          }}
          lesson={selectedQuizLesson}
          courseId={courseId}
          onQuizComplete={handleQuizComplete}
        />
      )}

      {/* Course Analysis Popup */}
      {showAnalysisPopup && (
        <CourseAnalysis
          onClose={() => setShowAnalysisPopup(false)}
          itemData={currentCourse}
          userProgress={userProgress}
        />
      )}

      {/* Ask Doubt Modal */}
      <AskAnyDoubt
        isVisible={showAskDoubt}
        onClose={() => setShowAskDoubt(false)}
      />
    </motion.section>
  );
}

export default CourseDetail;