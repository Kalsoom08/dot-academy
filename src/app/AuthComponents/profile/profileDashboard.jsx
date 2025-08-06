'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { PiClock, PiMedal, PiCheckFat } from 'react-icons/pi';
import { useRouter } from 'next/navigation';


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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-inter">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div className="flex items-center mb-4 sm:mb-0">
          <img
            src="https://placehold.co/60x60/a78bfa/ffffff?text=HA"
            alt="User Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold font-dharma text-gray-800">{userData.firstName} {userData.lastName}</h1>
            <p className="text-gray-600 text-sm">Student ID: {userData.studentId}</p>
          </div>
        </div>
        <button
          className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          onClick={() => router.push('/AuthComponents/profile/editProfile')}
        >
          Edit Profile
        </button>
      </div>

      <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
        {['Your Analysis', 'Your Activity', 'Leaderboard'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase())}
            className={`py-3 px-4 text-sm sm:text-base whitespace-nowrap font-semibold ${
              activeTab === tab.toLowerCase()
                ? 'text-gray-800 border-b-2 border-gray-800'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6"> 
        {renderContent()}
      </div>

      <div className="flex justify-center sm:justify-normal">
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 w-[70%] bg-white border border-gray-200 rounded-md">
    <div className=" rounded-lg py-4 px-6 flex flex-col items-center">
      <PiClock size={28} className="text-purple-600 mb-2" />
      <p className="text-gray-500 text-sm">Learning minute</p>
      <span className="text-lg font-bold text-gray-800">44</span>
    </div>
    <div className="rounded-lg py-4 px-6 flex flex-col items-center">
      <PiMedal size={28} className="text-yellow-500 mb-2" />
      <p className="text-gray-500 text-sm">Learning Level</p>
      <span className="text-lg font-bold text-gray-800">5</span>
    </div>
    <div className="rounded-lg py-4 px-6 flex flex-col items-center">
      <PiCheckFat size={28} className="text-green-600 mb-2" />
      <p className="text-gray-500 text-sm">Correct Answer</p>
      <span className="text-lg font-bold text-gray-800">6</span>
    </div>
  </div>
</div>

    </div>
  );
};

export default UserProfileDashboard;