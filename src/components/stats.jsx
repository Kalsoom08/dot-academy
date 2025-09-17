'use client';
import { motion } from 'framer-motion';
import { getPublicStats } from "../../APIs/statsAPI";
import { useEffect, useState } from 'react';


const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getPublicStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">Loading stats...</div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-10 text-red-500">Failed to load stats.</div>
    );
  }

    const displayStats = [
   { number: `${stats.registeredStudents}+`, label: "Registered Students" },
    { number: `${stats.totalSubscribed}+`, label: "Subscribed Students" },
    { number: `${stats.totalCourses}+`, label: "Courses Available" },
    { number: `${stats.googlePlayRating}/6`, label: "Rating on Google Play" },
  ];
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
        {displayStats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white"
            variants={itemVariants}
          >
            <h3 className='anton text-2xl sm:text-3xl text-black'>
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
