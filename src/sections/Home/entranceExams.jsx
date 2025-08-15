'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const allExams = [
  { name: 'IELTS', icon: '/exams/ilets.png' },
  { name: 'MDCAT', icon: '/exams/mdcat.png' },
  { name: 'NET', icon: '/exams/net.png' },
  { name: 'ECAT', icon: '/exams/ecat.png' },
  { name: 'GIKI', icon: '/exams/giki.png' },
  { name: 'PMS', icon: '/exams/pms.png' },
  { name: 'FUNG', icon: '/exams/pms.png' },
  { name: 'NAT', icon: '/exams/pms.png' },
  { name: 'GIKI', icon: '/exams/giki.png' },
  { name: 'PMS', icon: '/exams/pms.png' },
  { name: 'IELTS', icon: '/exams/ilets.png' },
  { name: 'MDCAT', icon: '/exams/mdcat.png' },
  { name: 'NET', icon: '/exams/net.png' },
  { name: 'ECAT', icon: '/exams/ecat.png' },
  { name: 'GIKI', icon: '/exams/giki.png' },
  { name: 'PMS', icon: '/exams/pms.png' },
  { name: 'IELTS', icon: '/exams/ilets.png' },
  { name: 'MDCAT', icon: '/exams/mdcat.png' },
];

const itemsPerPage = 6;

export default function EntranceExams() {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pageCount = Math.ceil(allExams.length / itemsPerPage);
  const visibleExams = allExams.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1));

  const handleExploreAll = () => {
    if (isClient && localStorage.getItem('isLoggedIn') === 'true') {
      router.push('/AuthComponents/ExploreCourses');
    } else {
      router.push('/login?redirect=/AuthComponents/ExploreCourses');
    }
  };

  // Touch event handlers for swipe
  const onTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;

    // Minimum distance threshold for swipe
    if (distance > 50) {
      handleNext(); // swipe left → next
    } else if (distance < -50) {
      handlePrev(); // swipe right → previous
    }

    // Reset
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="bg-white rounded-2xl shadow-2xl py-10 px-4 sm:px-10 max-w-5xl mx-auto text-center transition-all duration-300"
    >
      <h2 className="anton text-2xl sm:text-3xl font-black mb-8">
        50+ Entrance Exams
      </h2>

      <div
        className="relative flex justify-center items-center"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handlePrev}
          className="absolute left-0 sm:-left-6 p-3 bg-black hover:bg-gray-800 rounded-full"
          disabled={currentPage === 0}
        >
          <FaArrowLeft size={12} className="text-white" />
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full flex flex-col items-center gap-4"
          >
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 justify-center">
              {visibleExams.slice(0, 4).map((exam, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  className="w-[120px] sm:w-[140px] border rounded-lg py-3 px-2 flex justify-center items-center gap-2 hover:shadow-sm transition"
                >
                  <Image
                    src={exam.icon}
                    alt={exam.name}
                    width={32}
                    height={32}
                  />
                  <span className="text-sm font-medium">{exam.name}</span>
                </motion.div>
              ))}
            </div>

            {visibleExams.length > 4 && (
              <div className="flex justify-center gap-4">
                {visibleExams.slice(4).map((exam, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.2 }}
                    className="w-[120px] sm:w-[140px] border rounded-lg py-3 px-2 flex justify-center items-center gap-2 hover:shadow-sm transition"
                  >
                    <Image
                      src={exam.icon}
                      alt={exam.name}
                      width={32}
                      height={32}
                    />
                    <span className="text-sm font-medium">{exam.name}</span>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.button
          onClick={handleNext}
          whileTap={{ scale: 0.95 }}
          className="absolute right-0 sm:-right-6 p-3 bg-black hover:bg-gray-800 rounded-full"
          disabled={currentPage === pageCount - 1}
        >
          <FaArrowRight size={12} className="text-white" />
        </motion.button>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: pageCount }).map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentPage === index ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleExploreAll}
        className="mt-8 px-24 py-3 bg-[#7D287E] text-white font-semibold rounded-full hover:opacity-90 transition"
      >
        Explore All Exams
      </motion.button>
    </motion.section>
  );
}
