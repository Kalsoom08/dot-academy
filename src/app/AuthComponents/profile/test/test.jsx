'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import Img1 from '../../../../../public/profile/1.png';
import Img2 from '../../../../../public/profile/2.png';
import Img3 from '../../../../../public/profile/3.png';
import Img4 from '../../../../../public/profile/4.png';
import Img5 from '../../../../../public/profile/5.png';
import Img6 from '../../../../../public/profile/6.png';
import Img7 from '../../../../../public/profile/7.png';
import Img8 from '../../../../../public/profile/8.png';
import Img9 from '../../../../../public/profile/9.png';
import Img10 from '../../../../../public/profile/10.png';
import SVG from '../../../../../public/profile/ffffff.svg';
import { PiCheckFat, PiClock, PiMedal } from 'react-icons/pi';

// Parent container animation
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

// Each card/item animation
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 15 },
  },
};

const UnattemptedTestStats = () => {
  const [activeTab, setActiveTab] = useState('your analysis');

  const testStats = [
    {
      icon: Img1,
      title: 'Average Accuracy',
      value: '40%',
      description: 'You answered 4 questions correct out of 10',
    },
    {
      icon: Img2,
      title: 'Average Percentile',
      value: '20.65',
      description: '25% students are scoring more than you',
    },
    {
      icon: Img3,
      title: 'Average Rank',
      value: '125158',
      description: 'Among all other students in NEET',
    },
    {
      icon: Img4,
      title: 'Average Time Per Question',
      value: '2s',
      description: 'Average time taken by you to attempt a question',
    },
    {
      icon: Img5,
      title: 'Tests Attempted',
      value: '2',
      description: 'Total test attempted by you',
    },
    {
      icon: Img6,
      title: 'Total Attempted Questions',
      value: '10',
      description: 'Total questions attempted by you',
    },
    {
      icon: Img7,
      title: 'Correct : Incorrect Questions',
      value: '4:6',
      description: 'Total correct : incorrect questions attempted by you',
    },
    {
      icon: Img8,
      title: 'Total Test Time',
      value: '25s',
      description: 'Total test time taken by you',
    },
  ];

  const docStats = [
    {
      icon: Img9,
      title: 'Content Rated',
      value: '3',
    },
    {
      icon: Img10,
      title: 'Docs and video Viewed',
      value: '28',
    },
  ];

  return (
    <motion.div
      className="px-4 py-8 font-inter max-w-7xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Profile Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        variants={itemVariants}
      >
        <div className="flex items-center mb-4 sm:mb-0">
          <Image
            src={SVG}
            alt="User Profile"
            width={64}
            height={64}
            className="rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Hamza Ahmed</h1>
            <p className="text-gray-600 text-sm">Student ID: 000000</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
          Edit Profile
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-8">
          {/* Two NEET Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            variants={containerVariants}
          >
            {[1, 2].map((_, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 grid gap-5 justify-between"
                variants={itemVariants}
              >
                <div className="flex items-center">
                  <Image
                    src={SVG}
                    alt="Neet Logo"
                    width={48}
                    height={48}
                    className="rounded-lg mr-4"
                  />
                  <span className="text-lg font-semibold text-gray-800">
                    Neet
                  </span>
                </div>
                <div className="flex space-x-3 mt-4 sm:mt-0">
                  <button className="px-4 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                    Explore
                  </button>
                  <button className="px-4 py-1 bg-black text-white rounded-lg hover:bg-purple-700 transition">
                    View Plan
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Test Stats */}
          <motion.div className="bg-white rounded-lg p-4" variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6">Test Stats</h2>
            <motion.ul
              className="grid grid-cols-1 gap-6 text-sm text-gray-800"
              variants={containerVariants}
            >
              {testStats.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4"
                  variants={itemVariants}
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={24}
                    height={24}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between font-semibold">
                      <h3 className="text-md">{item.title}</h3>
                      <p className="text-gray-600">{item.value}</p>
                    </div>
                    <p className="text-gray-500">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Docs and Videos */}
          <motion.div className="bg-white rounded-lg p-6" variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6">Docs and Videos</h2>
            <motion.ul
              className="grid grid-cols-1 gap-6 text-sm text-gray-800"
              variants={containerVariants}
            >
              {docStats.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-4"
                  variants={itemVariants}
                >
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={24}
                    height={24}
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between font-semibold">
                      <h3 className="text-md">{item.title}</h3>
                      <p className="text-md">{item.value}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Good & Improve Sections */}
          <motion.div className="space-y-4" variants={containerVariants}>
            <motion.div
              className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded-lg"
              variants={itemVariants}
            >
              <h3 className="text-blue-800 font-semibold mb-1">The Good</h3>
              <ul className="text-blue-700 text-sm list-disc list-inside">
                <li>You’re a quicker thinker and you’re only taking 2s per question</li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-lg"
              variants={itemVariants}
            >
              <h3 className="text-yellow-800 font-semibold mb-1">To Improve</h3>
              <ul className="text-yellow-700 text-sm list-disc list-inside space-y-1">
                <li>You need to attempt 10 tests to help us understand you better</li>
                <li>You scored only 40% which is 58.3% less than the average</li>
                <li>You have attempted only 33% questions which is 36.33% less than the average</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats */}
      <motion.div
        className="grid grid-cols-1 items-center sm:grid-cols-3 gap-4 mt-10 w-[70%]"
        variants={containerVariants}
      >
        <motion.div
          className="bg-white rounded-lg py-4 px-6 flex flex-col items-center"
          variants={itemVariants}
        >
          <PiClock size={28} className="text-purple-600 mb-2" />
          <p className="text-gray-500 text-sm">Learning minute</p>
          <span className="text-lg font-bold text-gray-800">44</span>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg py-4 px-6 flex flex-col items-center"
          variants={itemVariants}
        >
          <PiMedal size={28} className="text-yellow-500 mb-2" />
          <p className="text-gray-500 text-sm">Learning Level</p>
          <span className="text-lg font-bold text-gray-800">5</span>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg py-4 px-6 flex flex-col items-center"
          variants={itemVariants}
        >
          <PiCheckFat size={28} className="text-green-600 mb-2" />
          <p className="text-gray-500 text-sm">Correct Answer</p>
          <span className="text-lg font-bold text-gray-800">6</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default UnattemptedTestStats;
