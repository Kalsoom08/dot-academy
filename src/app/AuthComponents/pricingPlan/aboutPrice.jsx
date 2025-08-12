import Head from 'next/head';
import { useState } from 'react';
import { FaBook, FaChartBar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Anton } from 'next/font/google';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Pic from '../../../../public/CourseCard/img.png';

const anton = Anton({ subsets: ['latin'], weight: '400' });

const AccordionItem = ({ title, icon, children, isOpen, toggleAccordion }) => {
  return (
    <div className="border-2 border-gray-200 bg-white rounded-lg overflow-hidden mb-4">
      <button
        className="w-full p-4 bg-white flex items-center justify-between text-gray-800 font-semibold cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex items-center">
          {icon}
          <span className="ml-3">{title}</span>
        </div>
        {isOpen ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 bg-white">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AboutPage() {
  const [openAccordion, setOpenAccordion] = useState('courses');

  const pmsImages = Array(8).fill(Pic);

  const toggleAccordion = (accordionName) => {
    setOpenAccordion(openAccordion === accordionName ? null : accordionName);
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-start p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Head>
        <title>About Ecademy Infinity</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className={`${anton.className} text-center text-2xl md:text-3xl mb-8`}>
          About <span className="font-extrabold text-[#7D287E]">Ecademy </span>Infinity for IELTS
        </h2>

        <AccordionItem
          title="Include 20+ courses for IELTS"
          icon={<FaBook className="text-[#7D287E] text-xl" />}
          isOpen={openAccordion === 'courses'}
          toggleAccordion={() => toggleAccordion('courses')}
        >
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            {pmsImages.map((src, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <Image src={src} alt="PMS test practice guide" className="w-24 h-auto object-contain mb-2" />
                <p className="text-sm text-[#282828]">PMS test practice</p>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-6 flex justify-center">
            <button className="flex items-center hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out">
              View More Courses
              <FaChevronDown className="ml-2 text-xs" />
            </button>
          </div>
        </AccordionItem>

        <AccordionItem
          title="Our Numbers speak for themselves"
          icon={<FaChartBar className="text-[#7D287E] text-xl" />}
          isOpen={openAccordion === 'stats1'}
          toggleAccordion={() => toggleAccordion('stats1')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mt-4">
            <StatItem value="14 Million+" label="Registered Students" />
            <StatItem value="550 Million+" label="MCQs attempted in Test" />
            <StatItem value="2.8 Billion+" label="Study Notes Viewed" />
            <StatItem value="4.5/5" label="Rating on Google Play" />
          </div>
        </AccordionItem>

        <AccordionItem
          title="Our Numbers speak for themselves"
          icon={<FaChartBar className="text-[#7D287E] text-xl" />}
          isOpen={openAccordion === 'stats2'}
          toggleAccordion={() => toggleAccordion('stats2')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mt-4">
            <StatItem value="14 Million+" label="Registered Students" />
            <StatItem value="550 Million+" label="MCQs attempted in Test" />
            <StatItem value="2.8 Billion+" label="Study Notes Viewed" />
            <StatItem value="4.5/5" label="Rating on Google Play" />
          </div>
        </AccordionItem>
      </motion.main>
    </motion.div>
  );
}

const StatItem = ({ value, label }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <p className="text-xl font-bold text-gray-800">{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </motion.div>
);
