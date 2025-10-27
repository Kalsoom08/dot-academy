'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileData, fetchProfileActivity, fetchLeaderboard } from "../../../../slices/profileSlice";
import { useRouter } from 'next/navigation';
import { PiClock, PiMedal, PiCheckFat } from 'react-icons/pi';
import { motion, AnimatePresence } from 'framer-motion';
import Skeleton from '@/loaders/profileSkeleton';

import YourAnalysisTab from '../../../components/AuthProfile/AnalysisTab';
import YourActivityTab from '../../../components/AuthProfile/ActivityTab';
import LeaderboardTab from '../../../components/AuthProfile/LeaderboardTab';

const UserProfileDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile);
  const authUser = useSelector((state) => state.auth?.user);

  const [userData, setUserData] = useState({ firstName: 'Loading', lastName: '...', studentId: 'Loading...' });
  const [activeTab, setActiveTab] = useState('your analysis');

  const fetchUserDataLocal = useCallback(() => {
    const storedData = localStorage.getItem('userProfile');
    if (storedData) setUserData(JSON.parse(storedData));
    else setUserData({ firstName: 'Guest', lastName: 'User', studentId: 'N/A' });
  }, []);

  const userId = authUser?.id || authUser?._id || (typeof window !== "undefined" ? localStorage.getItem("userId") : null);

  useEffect(() => {
    if (authUser) {
      const [firstName, ...lastParts] = (authUser.name || 'Guest User').split(' ');
      const lastName = lastParts.join(' ') || '';
      const id = authUser.id || authUser._id || 'N/A';
      setUserData({ firstName, lastName, studentId: id });
      localStorage.setItem('userProfile', JSON.stringify({ firstName, lastName, studentId: id }));
    } else fetchUserDataLocal();
  }, [authUser, fetchUserDataLocal]);

  useEffect(() => { if (!userId) return; dispatch(fetchProfileData(userId)); }, [dispatch, userId]);
  useEffect(() => {
    if (!userId) return;
    if (activeTab === 'your activity') dispatch(fetchProfileActivity(userId));
    else if (activeTab === 'leaderboard') dispatch(fetchLeaderboard());
  }, [activeTab, userId, dispatch]);

  const renderContent = () => {
    if (profileState.loading) return Array.from({ length: 4 }).map((_, idx) => <Skeleton key={idx} height="60px" className="w-full rounded-lg mb-2" />);
    switch (activeTab) {
      case 'your analysis': return <YourAnalysisTab router={router} userId={userId} courses={profileState.courses} quizAttempts={profileState.quizAttempts} unattemptedTests={profileState.unattemptedTests} docViews={profileState.docViews} />;
      case 'your activity': return <YourActivityTab setActiveTab={setActiveTab} attemptedTests={profileState.attemptedTests} watchedVideos={profileState.watchedVideos} docsViewed={profileState.docsViewed} askedQuestions={profileState.askedQuestions} doubts={profileState.doubts} />;
      case 'leaderboard': return <LeaderboardTab router={router} />;
      default: return null;
    }
  };

  return (
    <motion.div className="min-h-screen p-4 sm:p-6 lg:p-8 font-inter"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      

      <motion.div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="flex items-center mb-4 sm:mb-0">
          <div className="w-16 h-16 rounded-full mr-4 flex items-center justify-center bg-indigo-400 text-white overflow-hidden">
            {profileState.loading ? <Skeleton height="64px" width="64px" className="rounded-full" /> :
              (authUser?.image ? <img src={authUser.image} alt="User Profile" className="w-full h-full object-cover" /> :
                <>{(userData.firstName?.[0] || 'G').toUpperCase()}{(userData.lastName?.[0] || 'U').toUpperCase()}</>)
            }
          </div>
          <div>
            {profileState.loading ? (
              <>
                <Skeleton height="24px" width="120px" className="mb-1" />
                <Skeleton height="16px" width="80px" />
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold font-dharma text-gray-800">{userData.firstName} {userData.lastName}</h1>
                <p className="text-gray-600 text-sm">Student ID: {userData.studentId}</p>
              </>
            )}
          </div>
        </div>
        {!profileState.loading && (
          <button className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            onClick={() => router.push('/AuthComponents/profile/editProfile')}>
            Edit Profile
          </button>
        )}
      </motion.div>

    
      <motion.div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
        {['Your Analysis','Your Activity','Leaderboard'].map(tab => (
          <motion.button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} className={`py-3 px-4 text-sm sm:text-base whitespace-nowrap font-semibold ${activeTab === tab.toLowerCase() ? 'text-gray-800 border-b-2 border-gray-800' : 'text-gray-500 hover:text-gray-800'}`}>
            {tab}
          </motion.button>
        ))}
      </motion.div>

  
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

  
      <motion.div className="flex justify-center sm:justify-normal mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-[70%] bg-white border border-gray-200 rounded-md p-4">
          {[1,2,3].map((_, idx) => (
            profileState.loading ? <Skeleton key={idx} height="80px" /> :
            <div key={idx} className="rounded-lg py-4 px-6 flex flex-col items-center">
              
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfileDashboard;
