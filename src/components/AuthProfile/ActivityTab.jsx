'use client';
import React from 'react';
import { PiClock } from 'react-icons/pi';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Pic from '../../../public/profile/eng.png';
import Pic2 from '../../../public/profile/eng2.png';
import WatchedCarousel from './WatchedCarousel';
import QuestionBoard from './QuestionBoard';

const YourActivityTab = ({ setActiveTab }) => {
  const activities = [
    {
      id: 1,
      title: 'NEET',
      imageSrc: Pic,
      action: 'View Report',
    },
     {
      id: 1,
      title: 'NEET',
      imageSrc: Pic,
      action: 'View Report',
    },
  ];

  const docs = [
    {
      title: "Worksheet: Noun and it’s classification",
      img: Pic2,
      updatedAt: '4 Days Ago',
    },
    {
      title: "Pronoun and its Types",
      img: Pic2,
      updatedAt: '2 Days Ago',
    },
  ];

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-xl font-bold text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Attempted Tests
      </motion.h2>

      {activities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start sm:justify-between gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center">
                <Image
                  src={activity.imageSrc}
                  alt={`${activity.title} Logo`}
                  className="rounded-lg mr-4 object-cover"
                  width={48}
                  height={48}
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-4 sm:mt-0">
                <button className="px-4 py-1 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  Explore
                </button>
                <button className="px-4 py-1 bg-black text-white rounded-sm hover:bg-purple-700 transition-colors duration-200">
                  {activity.action}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="bg-white rounded-lg shadow-md p-8 text-center flex flex-col items-center justify-center min-h-[300px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <PiClock className="h-24 w-24 text-blue-500 mb-4" />
          <p className="text-gray-600 mb-6">
            No activity recorded yet. Start exploring or taking tests to see your progress here!
          </p>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            onClick={() => setActiveTab('your analysis')}
          >
            Go to Your Analysis
          </button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <WatchedCarousel />
      </motion.div>

      {/* Docs */}
      <motion.h2
        className="text-xl font-bold text-gray-800 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Docs & Videos
      </motion.h2>

      {docs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-5">
          {docs.map((doc, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 flex items-start sm:justify-between gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center">
                <Image
                  src={doc.img}
                  alt={`${doc.title} thumbnail`}
                  className="rounded-lg mr-4 object-cover"
                  width={48}
                  height={48}
                />
                <div>
                  <h3 className="font-bold text-gray-800">{doc.title}</h3>
                  {doc.updatedAt && (
                    <p className="text-sm text-gray-600">{doc.updatedAt}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          className="bg-white rounded-lg shadow-md p-8 text-center flex flex-col items-center justify-center min-h-[300px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <PiClock className="h-24 w-24 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-6">
            You haven't viewed any documents or videos yet. Start learning!
          </p>
          <button
            className="px-6 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
          >
            Start Learning
          </button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <QuestionBoard />
      </motion.div>
    </motion.div>
  );
};

export default YourActivityTab;
