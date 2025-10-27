'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronDown, FiChevronUp, FiX, FiExternalLink } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonContent } from '../../../../../slices/courseSlice';
import LoadingSpinner from '@/components/loadingSpinner';
import UpNext from '../UpNext';
import SideShow from '../SideShow';
import api from "../../../../../APIs/api";

const ArticleContent = ({ articleContent, title, featuredImage }) => {
  const [banner, setBanner] = useState(null);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const fetchHeaderBanner = async () => {
      try {
        const res = await api.get("/user/api/ads/sidebar");
        if (res.data?.length > 0) {
          setBanner(res.data[0]);
        }
      } catch (err) {
        console.error("Sidebar ad fetch error:", err);
      }
    };
    fetchHeaderBanner();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence>
        {banner && showBanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-white rounded-xl shadow-2xl w-[90%] max-w-md overflow-hidden"
            >
              <button
                onClick={() => setShowBanner(false)}
                className="absolute top-2 right-2 text-gray-600 font-bold text-2xl hover:text-gray-900"
              >
                &times;
              </button>
              <Image
                src={banner.fileUrl}
                alt={banner.title}
                width={500}
                height={280}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {banner.title}
                </h3>
                {banner.clickUrl && (
                  <a
                    href={banner.clickUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Learn more
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{title}</h1>
        {featuredImage && (
          <div className="mb-6 max-w-2xl mx-auto">
            <Image
              src={featuredImage}
              alt={title}
              width={800}
              height={450}
              className="rounded-xl w-full h-auto"
            />
          </div>
        )}
      </div>

      {/* Article Content */}
      <div className="space-y-8">
        {articleContent && articleContent.length > 0 ? (
          articleContent.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6"
            >
              <h2 className="text-2xl font-semibold text-[#7c287d] mb-4 pb-2 border-b border-gray-200">
                {section.heading}
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed text-justify">
                  {section.description}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No content available for this article.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// PDF Popup Component
const PDFPopup = ({ isVisible, onClose, lesson }) => {
  if (!isVisible) return null;

  const handlePdfClick = () => {
    if (lesson.pdfUrl) {
      window.open(lesson.pdfUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#7c287d] to-[#9c3b9d] p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{lesson.title || 'PDF Document'}</h2>
                <p className="text-purple-100 text-sm">PDF Document</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-purple-800/30 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PDF Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="text-center space-y-6">
              {/* PDF Preview Card */}
              <motion.div
                className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-[#7c287d] hover:bg-purple-50 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePdfClick}
              >
                <div className="w-20 h-20 bg-[#7c287d] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">View PDF Document</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Click to open the PDF document in a new tab
                </p>
                <div className="bg-[#7c287d] text-white px-4 py-2 rounded-lg inline-flex items-center gap-2">
                  <span>Open PDF</span>
                  <FiExternalLink className="w-4 h-4" />
                </div>
              </motion.div>

              {/* PDF Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-left">
                <h4 className="font-semibold text-gray-800 mb-3">Document Information</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Title:</span>
                    <span className="font-medium text-gray-800">{lesson.title || 'Untitled Document'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium text-gray-800">PDF Document</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Access:</span>
                    <span className="font-medium text-green-600">Available</span>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-blue-800">How to view</h4>
                    <ul className="text-sm text-blue-700 mt-2 space-y-1">
                      <li>• Click on the "Open PDF" button above</li>
                      <li>• The PDF will open in a new browser tab</li>
                      <li>• You can read, zoom, and navigate through the document</li>
                      <li>• Close the tab when you're done reading</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// PDF Content Component
const PDFContent = ({ lesson }) => {
  const [showPdfPopup, setShowPdfPopup] = useState(false);

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">{lesson.title}</h1>
        
        {lesson.featuredImage && (
          <div className="mb-8 max-w-2xl mx-auto">
            <Image
              src={lesson.featuredImage}
              alt={lesson.title}
              width={800}
              height={450}
              className="rounded-xl w-full h-auto"
            />
          </div>
        )}

        {/* PDF Preview */}
        <div className="text-center space-y-6">
          <motion.div
            className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-[#7c287d] hover:bg-purple-50 transition-all duration-300 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowPdfPopup(true)}
          >
            <div className="w-20 h-20 bg-[#7c287d] rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">View PDF Document</h3>
            <p className="text-gray-600 text-sm mb-4">
              Click to open the PDF document in a new tab
            </p>
            <div className="bg-[#7c287d] text-white px-4 py-2 rounded-lg inline-flex items-center gap-2">
              <span>Open PDF</span>
              <FiExternalLink className="w-4 h-4" />
            </div>
          </motion.div>

          {/* PDF Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-left">
            <h4 className="font-semibold text-gray-800 mb-3">Document Information</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Title:</span>
                <span className="font-medium text-gray-800">{lesson.title || 'Untitled Document'}</span>
              </div>
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="font-medium text-gray-800">PDF Document</span>
              </div>
              <div className="flex justify-between">
                <span>Access:</span>
                <span className="font-medium text-green-600">Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PDF Popup */}
      <PDFPopup
        isVisible={showPdfPopup}
        onClose={() => setShowPdfPopup(false)}
        lesson={lesson}
      />
    </>
  );
};

const QuizComponent = ({ quizData }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  if (!quizData) return null;

  const handleOptionClick = (index) => setSelectedOption(index);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen px-4"
    >
      <div className="bg-white p-6 w-full max-w-2xl mx-auto">
        <p className="mb-4 font-semibold text-lg text-gray-800">
          Try Yourself:
          <span className="font-normal ml-2">{quizData.question}</span>
        </p>
        <div className="flex flex-col gap-3">
          {quizData.options.map((option, index) => (
            <div key={index}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOptionClick(index)}
                className={`flex items-center gap-3 px-4 py-3 border-2 rounded-lg text-left text-sm w-full transition-all duration-200
                  ${selectedOption === index ? 'bg-[#7c287d] text-white border-[#7c287d]' : 'bg-white border-gray-300 hover:border-[#7c287d]'}
                  ${showSolution && option.isCorrect ? 'border-green-600 bg-green-100 text-green-800' : ''} 
                  ${showSolution && selectedOption === index && !option.isCorrect ? 'bg-red-100 border-red-600 text-red-800' : ''}`}
              >
                <span className="font-bold">{option.label}.</span> 
                <span className="flex-1">{option.text}</span>
              </motion.button>
              <AnimatePresence>
                {showSolution && option.isCorrect && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-green-50 border border-green-200 px-4 py-3 rounded-lg mt-2"
                  >
                    <h1 className="text-green-700 text-sm font-semibold">Explanation</h1>
                    <p className="text-green-600 text-sm mt-2">{quizData.explanation}</p>
                    <p className="text-green-700 text-sm mt-2 font-semibold">Correct answer: {option.label}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowSolution(true)}
          className="mt-6 w-full bg-[#7c287d] text-white py-3 rounded-lg hover:bg-[#6b1f6b] transition duration-200 font-semibold"
        >
          View Solution
        </motion.button>
      </div>

      <div className="mt-10 text-center text-sm italic text-gray-600 max-w-sm mx-auto">
        Are you planning to get a high score in your exam?<br />
        <span className="not-italic font-medium text-[#7c287d]">Ecademy</span> will help you achieve it.
      </div>
    </motion.div>
  );
};

const CourseDataClient = () => {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('course');
  const lessonId = searchParams.get('lesson');

  const dispatch = useDispatch();
  const { currentLesson, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    if (courseId && lessonId) {
      dispatch(fetchLessonContent({ courseId, lessonId }));
    }
  }, [courseId, lessonId, dispatch]);

  const defaultQuizData = {
    question: 'Which of the following is a singular common noun?',
    options: [
      { label: 'A', text: 'Girl', isCorrect: true },
      { label: 'B', text: 'Water', isCorrect: false },
      { label: 'C', text: 'Fire', isCorrect: false },
      { label: 'D', text: 'Colors', isCorrect: false },
    ],
    explanation:
      '“Girl” is a singular common noun because it refers to one person and not a specific individual.',
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md mx-4">
          <p className="font-semibold">Error loading content</p>
          <p className="mt-2">{error.message || 'Unknown error occurred'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const lesson = currentLesson || {};

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <div className="lg:px-6 py-8 grid lg:grid-cols-[70%_30%] gap-8 max-w-7xl mx-auto">
        {/* Main Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 lg:p-8"
        >
          {/* Lesson Type Badge */}
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              lesson.type === 'video' ? 'bg-blue-100 text-blue-800' :
              lesson.type === 'article' ? 'bg-green-100 text-green-800' :
              lesson.type === 'pdf' ? 'bg-orange-100 text-orange-800' :
              lesson.type === 'mcq' ? 'bg-purple-100 text-purple-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {lesson.type?.toUpperCase() || 'LESSON'}
            </span>
          </div>

          {lesson.type === 'article' && lesson.articleContent ? (
            <ArticleContent
              articleContent={lesson.articleContent}
              title={lesson.title}
              featuredImage={lesson.featuredImage}
            />
          ) : lesson.type === 'pdf' ? (
            <PDFContent lesson={lesson} />
          ) : lesson.type === 'mcq' ? (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">{lesson.title}</h1>
              <QuizComponent quizData={lesson.mcqs?.[0] || defaultQuizData} />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">{lesson.title}</h1>
              
              {lesson.featuredImage && (
                <div className="mb-8 max-w-2xl mx-auto">
                  <Image
                    src={lesson.featuredImage}
                    alt={lesson.title}
                    width={800}
                    height={450}
                    className="rounded-xl w-full h-auto"
                  />
                </div>
              )}
              
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                {lesson.content ? (
                  <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No content available for this lesson.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Up Next Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <UpNext />
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="lg:block">
          <SideShow />
        </div>
      </div>
    </motion.section>
  );
};

export default CourseDataClient;