'use client';

import { motion } from 'framer-motion';
import { FiChevronRight } from "react-icons/fi";
import Image from 'next/image';

import ilets from '../../../../../public/Explore/1.png';

const exams = [
  { name: "IELTS", icon: ilets },
  { name: "NET", icon: ilets },
  { name: "MDCAT", icon: ilets },
  { name: "ECAT", icon: ilets },
  { name: "GIKI", icon: ilets },
];

export default function EntranceExamPage() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1, ease: "easeInOut" },
    },
  };

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeInOut" } },
  };

  return (
    <motion.div
      className="p-4 max-w-4xl mx-auto space-y-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Popular Exam Section */}
      <motion.section variants={containerVariants}>
        <motion.h2
          className="text-lg font-bold text-center mb-4"
          variants={fadeVariants}
        >
          Popular Entrance Exams
        </motion.h2>
        <motion.div className="grid grid-cols-2 sm:grid-cols-2 gap-4" variants={containerVariants}>
          {exams.map((exam, idx) => (
            <motion.button
              key={idx}
              className="flex items-center justify-between bg-white border rounded-lg px-4 py-2 shadow hover:shadow-md transition"
              variants={fadeVariants}
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
        </motion.div>
      </motion.section>

      {/* Trending Exam Section */}
      <motion.section variants={containerVariants}>
        <motion.h2
          className="text-lg font-bold text-center mb-4"
          variants={fadeVariants}
        >
          Trending Entrance Exams (Global)
        </motion.h2>
        <motion.div className="grid grid-cols-2 sm:grid-cols-2 gap-4" variants={containerVariants}>
          {exams.map((exam, idx) => (
            <motion.button
              key={`trend-${idx}`}
              className="flex items-center justify-between bg-white border rounded-lg px-4 py-2 shadow hover:shadow-md transition"
              variants={fadeVariants}
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
        </motion.div>
      </motion.section>
    </motion.div>
  );
}
