'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Icon1 from '../../public/examFeatures/1.png';
import Icon2 from '../../public/examFeatures/2.png';
import Icon3 from '../../public/examFeatures/3.png';
import Icon4 from '../../public/examFeatures/4.png';
import SVG from '../../public/examFeatures/vector.svg';
import {motion} from 'framer-motion';

const features = [
  { title: 'Smart Notes', description: 'With relevant content to help you prepare for exams in the best way.', icon: Icon1 },
  { title: 'Test Insights', description: 'Practice every topic with over 15M+ questions in 75K+ tests', icon: Icon2 },
  { title: 'Video Lectures', description: 'With 100K+ videos & 250K+ notes clear all your concepts.', icon: Icon3 },
  { title: 'Structured Courses', description: 'With 1000+ courses you can prepare for every exam!', icon: Icon4 },
  { title: 'Smart Notes', description: 'With relevant content to help you prepare for exams in the best way.', icon: Icon1 },
  { title: 'Test Insights', description: 'Practice every topic with over 15M+ questions in 75K+ tests', icon: Icon2 },
  { title: 'Video Lectures', description: 'With 100K+ videos & 250K+ notes clear all your concepts.', icon: Icon3 },
  { title: 'Structured Courses', description: 'With 1000+ courses you can prepare for every exam!', icon: Icon4 },
];

export default function ExamIntro() {
  const [itemsPerPage, setItemsPerPage] = useState(1); 
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { 
        setItemsPerPage(4);
      } else if (window.innerWidth >= 640) { 
        setItemsPerPage(2);
      } else {
        setItemsPerPage(1);
      }
    };


    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); 

  const pageCount = Math.ceil(features.length / itemsPerPage);

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < pageCount - 1) setCurrentPage((prev) => prev + 1);
  };

  const translateX = `-${currentPage * 100}%`;

  return (
    <section className="py-16 px-4 text-center max-w-5xl mx-auto relative overflow-hidden">

      <h1 className='anton mb-5 text-xl sm:text-2xl md:text-4xl font-bold text-gray-900'>
        <span className="relative inline-block">
          <span className="relative z-10">Everything you need</span>

          <span className="absolute top-5 md:top-10 left-0 w-full h-[0.6em] z-0">
            <Image
              src={SVG}
              alt="underline"
              fill
              className="object-contain pointer-events-none"
              sizes="100vw"
            />
          </span>
        </span>{' '}
        for your Exam at one place
      </h1>


      <p className="mt-4 text-gray-600 max-w-xl mx-auto text-sm sm:text-base">
        Study from content highly focused on the syllabus to be 100% exam ready
      </p>

      <div className="relative mt-10">

        <button
          onClick={handlePrev}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-black rounded-full hover:bg-gray-800 transition ${
            currentPage === 0 ? 'opacity-30 cursor-not-allowed' : ''
          }`}
          disabled={currentPage === 0}
        >
          <FaArrowLeft className="text-white" />
        </button>


        <div className="overflow-hidden ">
          <motion.div
          className='flex'
            animate={{ x: `-${currentPage * 100}%` }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            {Array.from({ length: pageCount }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className="flex min-w-full max-w-full justify-center px-2 flex-wrap"
              >
                {features
                  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                  .map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      whileHover={{ scale: 1.03 }}
                      className="rounded-xl shadow-lg p-4 w-[85%] sm:w-[48%] lg:w-[18%] flex flex-col m-3 mt-14"
                    >
                      <div className="h-[80px] flex items-center justify-center mb-4">
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          width={60}
                          height={60}
                          className="object-contain"
                        />
                      </div>

                      <div className="w-full text-left">
                        <h2 className='anton  text-lg mb-2'>
                          {feature.title}
                        </h2>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            ))}
          </motion.div>
        </div>

        <button
          onClick={handleNext}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-black rounded-full hover:bg-gray-800 transition ${
            currentPage === pageCount - 1 ? 'opacity-30 cursor-not-allowed' : ''
          }`}
          disabled={currentPage === pageCount - 1}
        >
          <FaArrowRight className="text-white" />
        </button>
      </div>


      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: pageCount }).map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full transition ${
              currentPage === index ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>


      <div className="mt-10">
        <button className="bg-black text-white px-6 py-3 sm:px-8 sm:py-3 rounded-full font-semibold hover:bg-gray-800 transition">
          Start Learning for Free
        </button>
      </div>
    </section>
  );
}