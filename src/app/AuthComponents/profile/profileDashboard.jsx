'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { PiClock, PiMedal, PiCheckFat } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import YourAnalysisTab from '../../../components/AuthProfile/AnalysisTab';
import YourActivityTab from '../../../components/AuthProfile/ActivityTab';
import LeaderboardTab from '../../../components/AuthProfile/LeaderboardTab';

const UserProfileDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('your analysis');

  const [userData, setUserData] = useState({
    firstName: 'Loading',
    lastName: '...',
    studentId: 'Loading...',
  });

  const fetchUserData = useCallback(async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const storedData = localStorage.getItem('userProfile');
      if (storedData) {
        setUserData(JSON.parse(storedData));
      } else {
        setUserData({
          firstName: 'Guest',
          lastName: 'User',
          studentId: 'N/A'
        });
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const renderContent = () => {
    switch (activeTab) {
      case 'your analysis':
        return <YourAnalysisTab router={router} />;
      case 'your activity':
        return <YourActivityTab setActiveTab={setActiveTab} />;
      case 'leaderboard':
        return <LeaderboardTab router={router} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="min-h-screen p-4 sm:p-6 lg:p-8 font-inter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center mb-4 sm:mb-0">
          <img
            src="https://placehold.co/60x60/a78bfa/ffffff?text=HA"
            alt="User Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold font-dharma text-gray-800">
              {userData.firstName} {userData.lastName}
            </h1>
            <p className="text-gray-600 text-sm">Student ID: {userData.studentId}</p>
          </div>
        </div>
        <button
          className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          onClick={() => router.push('/AuthComponents/profile/editProfile')}
        >
          Edit Profile
        </button>
      </motion.div>

      {/* Tabs */}
      <motion.div
        className="flex border-b border-gray-200 mb-8 overflow-x-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05 } }
        }}
      >
        {['Your Analysis', 'Your Activity', 'Leaderboard'].map((tab) => (
          <motion.button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`py-3 px-4 text-sm sm:text-base whitespace-nowrap font-semibold ${
              activeTab === tab.toLowerCase()
                ? 'text-gray-800 border-b-2 border-gray-800'
                : 'text-gray-500 hover:text-gray-800'
            }`}
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            {tab}
          </motion.button>
        ))}
      </motion.div>

      {/* Main Content with AnimatePresence for smooth tab switching */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Stats */}
      <motion.div
        className="flex justify-center sm:justify-normal"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 w-[70%] bg-white border border-gray-200 rounded-md">
          {[
            { icon: <PiClock size={28} className="text-purple-600 mb-2" />, label: 'Learning minute', value: '44' },
            { icon: <PiMedal size={28} className="text-yellow-500 mb-2" />, label: 'Learning Level', value: '5' },
            { icon: <PiCheckFat size={28} className="text-green-600 mb-2" />, label: 'Correct Answer', value: '6' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="rounded-lg py-4 px-6 flex flex-col items-center"
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
              transition={{ duration: 0.3 }}
            >
              {stat.icon}
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <span className="text-lg font-bold text-gray-800">{stat.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfileDashboard;
