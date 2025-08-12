'use client';

import { FiChevronRight } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import ilets from '../../../../public/Explore/1.png';

const exams = [
  { name: "IELTS", icon: ilets },
  { name: "NET", icon: ilets },
  { name: "MDCAT", icon: ilets },
  { name: "ECAT", icon: ilets },
  { name: "GIKI", icon: ilets },
];

export default function ExploreCoursesPage() {
  const router = useRouter();

  const handleRedirectToCourses = () => {
    router.push('/AuthComponents/ExploreCourses/CourseDetail');
  };

  return (
    <motion.div
      className="p-4 max-w-4xl mx-auto space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <section className="space-y-4">
        <motion.h2
          className="text-xl font-bold text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Explore
        </motion.h2>

        <motion.div
          className="bg-white rounded-xl shadow p-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition"
          onClick={handleRedirectToCourses}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-4">
            <Image src={ilets} alt="IELTS" width={30} height={30} />
            <div className="font-semibold text-gray-800">Explore IELTS Exam</div>
          </div>
          <FiChevronRight />
        </motion.div>

        <div className="text-center text-gray-500 text-sm font-medium">— OR —</div>

        <div className="flex flex-col gap-3">
          {["Class 1 to Class 12", "Entrance Exam"].map((label, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow p-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition"
              onClick={handleRedirectToCourses}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-4">
                <Image src={ilets} alt={label} width={30} height={30} />
                <span>{label}</span>
              </div>
              <FiChevronRight />
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-center mb-4">Popular Exam</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          {exams.map((exam, idx) => (
            <motion.button
              key={idx}
              className="flex items-center justify-between bg-white border rounded-lg px-4 py-2 shadow hover:shadow-md transition"
              onClick={handleRedirectToCourses}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex items-center gap-2">
                <Image src={exam.icon} alt={exam.name} width={24} height={24} />
                <span>{exam.name}</span>
              </div>
              <FiChevronRight />
            </motion.button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold text-center mb-4">Trending Exam (Global)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
          {exams.map((exam, idx) => (
            <motion.button
              key={`trend-${idx}`}
              className="flex items-center justify-between bg-white border rounded-lg px-4 py-2 shadow hover:shadow-md transition"
              onClick={handleRedirectToCourses}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex items-center gap-2">
                <Image src={exam.icon} alt={exam.name} width={24} height={24} />
                <span>{exam.name}</span>
              </div>
              <FiChevronRight />
            </motion.button>
          ))}
        </div>
      </section>

      <section className="text-center">
        <motion.button
          className="w-full sm:w-full px-6 py-3 bg-[#7D287E] text-white rounded-md text-sm font-bold hover:bg-purple-800 transition"
          onClick={handleRedirectToCourses}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Others
          <div className="text-xs font-normal mt-1 text-purple-100">
            Graduation, Coding, Language, Startup etc.
          </div>
        </motion.button>
      </section>
    </motion.div>
  );
}
