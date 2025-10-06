'use client';

import { useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CiSearch } from 'react-icons/ci';
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

  const openModal = (courseName) => {
    setSelectedCourse(courseName);
    setIsModalOpen(true);
  };

  const handleProceed = () => {
    const course = courses.find(c => c.name === selectedCourse);
    if (course) router.push(`/AuthComponents/ExploreCourses/CourseDetail/${course._id}`);
  };

  const filteredCourses = courses.filter(course =>
    course.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      className="space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
    
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-center">Search Courses</h2>
        <div className="relative">
          <CiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <input
            className="border border-[#282828] rounded-full w-full p-2 pl-10"
            type="search"
            placeholder="Type few letters of course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

    
      <section>
        <h2 className="text-lg font-bold text-center mb-4">Courses</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {!loading && !error && filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <button
                key={course._id}
                className="flex items-center justify-between bg-white border rounded-lg px-4 py-2 shadow hover:shadow-md transition"
                onClick={() => openModal(course.name)}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={course.image || '/dashboard/igc.png'}
                    alt={course.name}
                    width={24}
                    height={24}
                  />
                  <span>{course.name}</span>
                </div>
                <FiChevronRight />
              </button>
            ))
          ) : loading ? (
            <p className="text-center col-span-full">Loading courses...</p>
          ) : (
            <p className="text-center col-span-full text-gray-400">No courses found</p>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default ExamPopup;
