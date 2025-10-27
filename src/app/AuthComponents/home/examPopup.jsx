'use client';

import { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { CiSearch } from 'react-icons/ci';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../../../slices/courseSlice';
import ExamConfirmationModal from './examConfirmationPopup';

const ExamPopup = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);


  const freeCourses = courses.filter((c) => c.price === 0);

  const filteredCourses = freeCourses.filter((course) =>
    course.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (courseName) => {
    setSelectedCourse(courseName);
    setIsModalOpen(true);
  };

  const handleProceed = () => {
    const course = courses.find((c) => c.name === selectedCourse);
    if (course) router.push(`/AuthComponents/ExploreCourses/CourseDetail/${course._id}`);
  };

  if (isModalOpen) {
    return (
      <ExamConfirmationModal
        examName={selectedCourse}
        onClose={() => setIsModalOpen(false)}
        onProceed={handleProceed}
      />
    );
  }

  return (
    <motion.div
      className="p-6 space-y-8  rounded-3xl  max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.h2
        className="text-3xl font-extrabold text-center  text-[#661f69]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Explore Free Courses
      </motion.h2>

  
      <motion.div
        className="relative w-full max-w-md mx-auto"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <CiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 text-xl" />
        <input
          className="w-full border border-gray-300 rounded-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          type="search"
          placeholder="Search free courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </motion.div>

 
<section className="max-h-[50vh] overflow-y-auto px-1 custom-scrollbar">
  <motion.div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { staggerChildren: 0.08 },
      },
    }}
  >

          {!loading && !error && filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <motion.button
                key={course._id}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-2xl p-5 text-left hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                onClick={() => openModal(course.name)}
              >
                <div className="relative w-16 h-16 mb-3">
                  <Image
                    src={course.image || '/dashboard/igc.png'}
                    alt={course.name}
                    fill
                    className="rounded-full object-cover border border-gray-200 shadow-sm"
                  />
                </div>
                <span className="text-lg font-semibold text-gray-800 text-center">{course.name}</span>
              
                
              </motion.button>
            ))
          ) : loading ? (
            <p className="text-center col-span-full text-gray-500 animate-pulse">
              Loading free courses...
            </p>
          ) : (
            <p className="text-center col-span-full text-gray-400">
              No free courses found 
            </p>
          )}
        </motion.div>
      </section>
    </motion.div>
  );
};

export default ExamPopup;
