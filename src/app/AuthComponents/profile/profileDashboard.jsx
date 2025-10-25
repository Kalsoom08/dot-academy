'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileData, fetchProfileActivity, fetchLeaderboard } from "../../../../slices/profileSlice";
import { useRouter } from 'next/navigation';
import { PiClock, PiMedal, PiCheckFat } from 'react-icons/pi';
import { motion, AnimatePresence } from 'framer-motion';

import YourAnalysisTab from '../../../components/AuthProfile/AnalysisTab';
import YourActivityTab from '../../../components/AuthProfile/ActivityTab';
import LeaderboardTab from '../../../components/AuthProfile/LeaderboardTab';

const UserProfileDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const profileState = useSelector((state) => state.profile);
  const authUser = useSelector((state) => state.auth?.user);

  const [userData, setUserData] = useState({
    firstName: 'Loading',
    lastName: '...',
    studentId: 'Loading...',
  });

  const [activeTab, setActiveTab] = useState('your analysis');

  const fetchUserDataLocal = useCallback(() => {
    const storedData = localStorage.getItem('userProfile');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      setUserData({ firstName: 'Guest', lastName: 'User', studentId: 'N/A' });
    }
  }, []);

  const userId = authUser?.id || authUser?._id || (typeof window !== "undefined" ? localStorage.getItem("userId") : null);

  useEffect(() => {
    if (authUser) {
      const [firstName, ...lastParts] = (authUser.name || 'Guest User').split(' ');
      const lastName = lastParts.join(' ') || '';
      const id = authUser.id || authUser._id || 'N/A';

      setUserData({ firstName, lastName, studentId: id });
      localStorage.setItem('userProfile', JSON.stringify({ firstName, lastName, studentId: id }));
    } else {
      fetchUserDataLocal();
    }
  }, [authUser, fetchUserDataLocal]);

  useEffect(() => {
    if (!userId) return;
    dispatch(fetchProfileData(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (!userId) return;
    if (activeTab === 'your activity') {
      dispatch(fetchProfileActivity(userId));
    } else if (activeTab === 'leaderboard') {
      dispatch(fetchLeaderboard());
    }
  }, [activeTab, userId, dispatch]);

  const renderContent = () => {
    if (!userId) return <p className="text-red-500">User not found</p>;

    switch (activeTab) {
      case 'your analysis':
        return (
          <YourAnalysisTab
            router={router}
            userId={userId}
            courses={profileState.courses}
            quizAttempts={profileState.quizAttempts}
            unattemptedTests={profileState.unattemptedTests}
            docViews={profileState.docViews}
          />
        );
      case 'your activity':
        return (
          <YourActivityTab
            setActiveTab={setActiveTab}
            attemptedTests={profileState.attemptedTests}
            watchedVideos={profileState.watchedVideos}
            docsViewed={profileState.docsViewed}
            askedQuestions={profileState.askedQuestions}
            doubts={profileState.doubts}
          />
        );
      case 'leaderboard':
        return <LeaderboardTab router={router} />;
      default:
        return null;
    }
  };

  return (
    <motion.div className="min-h-screen p-4 sm:p-6 lg:p-8 font-inter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="w-16 h-16 rounded-full mr-4 flex items-center justify-center bg-indigo-400 text-white text-xl font-bold overflow-hidden">
            {authUser?.image ? (
              <img src={authUser.image} alt="User Profile" className="w-full h-full object-cover" />
            ) : (
              <>
                {(userData.firstName?.[0] || 'G').toUpperCase()}
                {(userData.lastName?.[0] || 'U').toUpperCase()}
              </>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold font-dharma text-gray-800">{userData.firstName} {userData.lastName}</h1>
            <p className="text-gray-600 text-sm">Student ID: {userData.studentId}</p>
          </div>
        </div>
        <button className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          onClick={() => router.push('/AuthComponents/profile/editProfile')}
        >
          Edit Profile
        </button>
      </motion.div>

      <motion.div className="flex border-b border-gray-200 mb-8 overflow-x-auto"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {['Your Analysis', 'Your Activity', 'Leaderboard'].map((tab) => (
          <motion.button key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`py-3 px-4 text-sm sm:text-base whitespace-nowrap font-semibold ${
              activeTab === tab.toLowerCase()
                ? 'text-gray-800 border-b-2 border-gray-800'
                : 'text-gray-500 hover:text-gray-800'
            }`}
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          >
            {tab}
          </motion.button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {profileState.loading ? <p>Loading...</p> :
              profileState.error ? <p className="text-red-500">{typeof profileState.error === 'string' ? profileState.error : profileState.error.message}</p> :
                renderContent()
            }
          </motion.div>
        </AnimatePresence>
      </div>

      <motion.div className="flex justify-center sm:justify-normal"
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 w-[70%] bg-white border border-gray-200 rounded-md">
          {[
            { icon: <PiClock size={28} className="text-purple-600 mb-2" />, label: 'Learning minute', value: '44' },
            { icon: <PiMedal size={28} className="text-yellow-500 mb-2" />, label: 'Learning Level', value: '5' },
            { icon: <PiCheckFat size={28} className="text-green-600 mb-2" />, label: 'Correct Answer', value: '6' }
          ].map((stat, idx) => (
            <motion.div key={idx} className="rounded-lg py-4 px-6 flex flex-col items-center"
              variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
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
