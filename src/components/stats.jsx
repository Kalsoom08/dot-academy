'use client';
import { Bebas_Neue } from 'next/font/google';
import { motion } from 'framer-motion';

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
});

const stats = [
  { number: '14 Million+', label: 'Registered Students' },
  { number: '550 Million+', label: 'MCQs attempted in Test' },
  { number: '2.8 Billion+', label: 'Study Notes Viewed' },
  { number: '4.5/6', label: 'Rating on Google Play' },
];

// Parent container animation
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each card
    },
  },
};

// Each stat card animation
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const Stats = () => {
  return (
    <motion.section
      className="bg-white shadow-md rounded-xl p-6 md:p-10 my-8 max-w-5xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center"
        variants={containerVariants}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white"
            variants={itemVariants}
          >
            <h3 className={`${bebas.className} text-2xl sm:text-3xl text-black`}>
              {stat.number}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Stats;
