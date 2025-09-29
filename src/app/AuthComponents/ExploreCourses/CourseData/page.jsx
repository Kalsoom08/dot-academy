'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

import UpNext from '../UpNext';
import SideShow from '../SideShow';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonContent } from '../../../../../slices/courseSlice';
import LoadingSpinner from '@/components/loadingSpinner';
import api from "../../../../APIs/api";

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
    <div className="prose max-w-none">
      
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

      {/* 🔹 Article Content */}
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      {featuredImage && (
        <div className="mb-6">
          <Image
            src={featuredImage}
            alt={title}
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
      )}
      {articleContent.map((section, idx) => (
        <div key={idx} className="py-6">
          <h2 className="text-2xl font-semibold">{section.heading}</h2>
          <p className="text-lg">{section.explanation}</p>
          {section.examples?.length > 0 && (
            <div className="pt-4">
              <h3 className="text-xl font-bold">Examples</h3>
              <ul className="space-y-2">
                {section.examples.map((example, idx) => (
                  <li key={idx} className="flex gap-2">
                    <strong>{example.label}:</strong> {example.items}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};


// Quiz component
const QuizComponent = ({ quizData }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  if (!quizData) return null;

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col min-h-screen px-4"
    >
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <p className="mb-4 font-semibold">
          Try Yourself:
          <span className="font-normal ml-2">{quizData.question}</span>
        </p>

        <div className="flex flex-col gap-3">
          {quizData.options.map((option, index) => (
            <div key={index} className="flex flex-col gap-2">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => handleOptionClick(index)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-md text-left text-sm
                ${selectedOption === index ? 'bg-gray-200 text-white' : 'bg-white text-black border-gray-300'}
                ${showSolution && option.isCorrect ? 'border-green-600 bg-green-100' : ''} 
                ${showSolution && selectedOption === index && !option.isCorrect ? 'bg-red-100 border-red-600' : ''}`}
              >
                <span className="font-bold">{option.label}.</span> {option.text}
              </motion.button>

              <AnimatePresence>
                {showSolution && option.isCorrect && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#D4EDDA] border border-green-600 px-2 py-2 rounded-md"
                  >
                    <h1 className="text-green-600 text-[14px] font-semibold">Explanation</h1>
                    <p className="text-green-600 text-xs mt-2">{quizData.explanation}</p>
                    <p className="text-green-600 text-xs mt-2 font-semibold">Correct answer</p>
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
          className="mt-6 w-full bg-[#222] text-white py-2 rounded-md hover:bg-[#111] transition duration-200"
        >
          View Solution
        </motion.button>
      </div>

      <div className="mt-10 text-center text-sm italic text-gray-600 max-w-sm">
        Are you planning to get high score in your exam<br />
        <span className="not-italic font-medium text-black">Ecademy</span> will help you to get high score in your exam
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        className="mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-[#111] transition duration-200 w-[40%] mx-6"
      >
        View plan
      </motion.button>
    </motion.div>
  );
};

const CourseData = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('course');
  const sectionId = searchParams.get('section');
  const lessonId = searchParams.get('lesson');
  
  const dispatch = useDispatch();
  const { currentLesson, loading, error } = useSelector((state) => state.courses);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    if (courseId && lessonId) {
      dispatch(fetchLessonContent({ courseId, lessonId }));
    }
  }, [courseId, lessonId, dispatch]);

  // Default quiz data (only shown if lesson doesn't have its own quiz)
  const defaultQuizData = {
    question: 'Which of the following Example is Singular and Common?',
    options: [
      { label: 'A', text: 'Girl', isCorrect: true },
      { label: 'B', text: 'Water', isCorrect: false },
      { label: 'C', text: 'Fire', isCorrect: false },
      { label: 'D', text: 'Colors', isCorrect: false },
    ],
    explanation: 'A common noun refers to a general name of a person, place, or thing, not specific. "Girl" is a singular noun because it refers to one person and is a common noun because it\'s not the name of a specific individual.'
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  // Determine content based on lesson type
  const renderContent = () => {
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
          Error loading content: {error.message || 'Unknown error'}
        </div>
      );
    }

    if (currentLesson) {
      const { type, articleContent, content, title, featuredImage, quiz } = currentLesson;
      
      // Render article content
      if (type === 'article' && articleContent) {
        return <ArticleContent articleContent={articleContent} title={title} featuredImage={featuredImage} />;
      }
      
      // Render other content types like video, pdf, or generic content
      return (
        <div className="prose max-w-none">
          <h1 className="text-3xl font-bold mb-6">{title}</h1>
          {featuredImage && (
            <div className="mb-6">
              <Image
                src={featuredImage}
                alt={title}
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
          )}
          <div className="text-lg">
            {content || 'No content available for this lesson.'}
          </div>
        </div>
      );
    }

    // Show loading state while fetching data
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner />
      </div>
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="lg:px-6 py-4 grid lg:grid-cols-[70%_30%]"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mx-auto px-6 py-8"
      >
        <h1 className="text-2xl font-bold mb-2">
          {currentLesson?.title || "Loading..."}
        </h1>
        
        <div className="px-6 py-10 space-y-10">
          {renderContent()}
        </div>
        
        {/* Show quiz component if lesson has quiz data, otherwise show default quiz */}
        {currentLesson?.quiz ? (
          <QuizComponent quizData={currentLesson.quiz} />
        ) : (
          <QuizComponent quizData={defaultQuizData} />
        )}
        
        <UpNext />
      </motion.div>
      <SideShow />
    </motion.section>
  );
};

export default CourseData;