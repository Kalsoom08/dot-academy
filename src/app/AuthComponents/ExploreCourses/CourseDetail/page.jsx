'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronDown, FiChevronUp, FiChevronRight } from 'react-icons/fi';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { CiLock } from 'react-icons/ci';
import { useRouter } from 'next/navigation';

import course from '../../../../../public/Courses/4.png';
import course2 from '../../../../../public/Courses/5.png';
import topCourse1 from '../../../../../public/Courses/3.png';
import topCourse2 from '../../../../../public/Courses/6.png';
import cour1 from '../../../../../public/Courses/cour1.png';
import cour2 from '../../../../../public/Courses/cour2.png';
import cour3 from '../../../../../public/Courses/cour3.png';

import CourseAnalysis from '../CourseAnalysis';
import CourseVideo from '../CourseVideo/page';

const courseSections = [
  {
    title: 'Noun',
    summary: '1 Video | 7 Docs | 1 Test',
    items: [
      { id: 'noun-part-1', image: course, title: "Noun & its Classifications (Part-1) - English Grammar", weight: 'Docs | 5 Pages', type: 'doc' },
      { id: 'noun-part-1-video', image: course, title: "Noun & its Classifications (Part-1) - English Grammar - video", weight: 'Docs | 5 Pages', type: 'video' },
      { id: 'noun-part-2', image: course, title: "Noun & its Classifications (Part-2) - English Grammar", weight: 'Docs | 3 Pages', type: 'doc' },
      { id: 'noun-worksheet', image: cour1, title: "Worksheet: Noun & its classifications", weight: 'Docs | 2 Pages', type: 'doc' },
      { id: 'noun-worksheet-solution', image: cour2, title: "Worksheets solution: Noun & its classifications", weight: 'Docs | 5 Pages', type: 'doc' },
      { id: 'noun-flashcards', image: course, title: "Flashcards: Type of Noun", weight: 'Flashcards | 16 Cards', icon: <CiLock size={20} />, unlock: "Unlock", type: 'flashcard' },
      { id: 'noun-ppt', image: course, title: "PPT: Noun", weight: 'Docs | 16 Pages', type: 'doc' },
      { id: 'noun-learning-poster', image: course, title: "Learning Poster: Type of Noun", weight: 'Docs | 1 Page', type: 'doc' },
      { id: 'noun-test', image: course, title: "Test: Noun", weight: 'Test | 10 ques | 15 min', icon: <CiLock size={20} />, unlock: "Unlock", type: 'test' },
      { id: 'noun-all-about-video', image: cour3, title: "All About Noun", weight: 'Video | 16:21 min', type: 'video' },
    ]
  },
  {
    title: 'Pronoun',
    summary: '1 Video | 5 Docs',
    items: [
      { id: 'pronoun-intro', image: course, title: "Introduction to Pronouns", weight: 'Docs | 4 Pages', type: 'doc' },
      { id: 'pronoun-types', image: course, title: "Pronoun Types", weight: 'Docs | 1 Page', type: 'doc' },
      { id: 'pronoun-quiz', image: course, title: "Pronoun Quiz", weight: 'Test | 5 Questions', type: 'test' },
    ]
  },
  {
    title: 'Verb',
    summary: '2 Videos | 4 Docs',
    items: [
      { id: 'verb-types', image: course, title: "Types of Verbs", weight: 'Docs | 2 Pages', type: 'doc' },
      { id: 'verb-forms', image: course, title: "Verb Forms Explained", weight: 'Video | 12:45 min', type: 'video' },
      { id: 'verb-tenses-summary', image: course, title: "Verb Tenses Summary", weight: 'Docs | 2 Pages', type: 'doc' },
    ]
  },
  {
    title: 'Adverb',
    summary: '1 Video | 2 Docs',
    items: [
      { id: 'adverb-what-is', image: course, title: "What is an Adverb?", weight: 'Docs | 1 Page', type: 'doc' },
      { id: 'adverb-examples', image: course, title: "Examples of Adverbs", weight: 'Video | 10:00 min', type: 'video' },
    ]
  },
  {
    title: 'Tenses',
    summary: '3 Videos | 6 Docs',
    items: [
      { id: 'tenses-intro', image: course, title: "Introduction to Tenses", weight: 'Docs | 2 Pages', type: 'doc' },
      { id: 'tenses-past-present-future', image: course, title: "Past, Present & Future Tenses", weight: 'Docs | 3 Pages', type: 'doc' },
      { id: 'tenses-video-series', image: course, title: "Tense Video Series", weight: 'Video | 20:00 min', type: 'video' },
    ]
  }
];

const topCourses = [
  { image: topCourse2, title: "Science class 10", icon: <FiChevronRight size={22}/>},
  { image: topCourse1, title: "Social Study (SST) Class 10", icon: <FiChevronRight size={22}/> }
];

function CourseDetail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAnalysisPopup, setShowAnalysisPopup] = useState(true);
  const [selectedCourseItem, setSelectedCourseItem] = useState(null); 
  const [selectedVideoItem, setSelectedVideoItem] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (showAnalysisPopup) {
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'unset'; 
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showAnalysisPopup]);

  const handleItemClick = (item) => {
    if (item.type === 'video') {
      router.push(`/AuthComponents/ExploreCourses/CourseVideo`); 
    } else {
      router.push('/AuthComponents/ExploreCourses/CourseData')
    }
  };

  const closeAnalysisPopup = () => {
    setShowAnalysisPopup(false);
    setSelectedCourseItem(null);
    setSelectedVideoItem(null);
  };

  return (
    <section className='flex flex-col'>
      <div className='flex flex-col lg:flex-row px-4 py-10 gap-6'>
        <div className='w-full lg:w-[70%] flex flex-col gap-6'>
          {courseSections.map((section, index) => (
            <div key={index} className='shadow-md shadow-gray-400 rounded-md'>
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
          ))}
        </div>

        <div className='w-full lg:w-[30%] flex flex-col shadow-md shadow-white px-4 py-6 gap-4 h-fit rounded-md'>
        </div>
      </div>
      <div className='w-full md:w-[80%] px-4 md:px-6 py-6 flex flex-col'>
        <h1 className='py-6 text-[20px] font-semibold'>Top Courses for Class 10</h1>
        <div className='flex flex-col gap-4'>
        </div>
      </div>
      {selectedVideoItem && <CourseVideo />}

      {showAnalysisPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-[1px] p-4 transition-opacity duration-300 ease-in-out"
          role="dialog"
          aria-modal="true"
        >
          <CourseAnalysis itemData={selectedCourseItem} onClose={closeAnalysisPopup} />
        </div>
      )}
    </section>
  );
}

export default CourseDetail;
