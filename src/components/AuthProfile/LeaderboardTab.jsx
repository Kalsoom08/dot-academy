'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { TbStarFilled } from "react-icons/tb";
import { useSelector } from 'react-redux';
import Avatar from '../../../public/profile/avatar.png';

const LeaderboardTab = () => {
  const { topUsers, leaderboard, courses, quizAttempts, attemptedTests, unattemptedTests, loading, error } =
    useSelector((s) => s.profile);

  const [selectedUser, setSelectedUser] = useState(null);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleViewProfile = (user) => {
    const userCourses = courses?.filter(c => c.user === user._id) || [];
    setSelectedUser({
      ...user,
      startedCourses: userCourses,
      quizAttempts: quizAttempts?.filter(q => q.user === user._id) || [],
      attemptedTests: attemptedTests?.filter(t => t.user === user._id) || [],
      unattemptedTests: unattemptedTests?.filter(u => u.user === user._id) || [],
    });
  };

  const closeModal = () => setSelectedUser(null);

  const getStars = (startedCoursesCount) => {
    let stars = 1;
    if (startedCoursesCount >= 10) stars = 5;
    else if (startedCoursesCount >= 7) stars = 4;
    else if (startedCoursesCount >= 4) stars = 3;
    else if (startedCoursesCount >= 1) stars = 2;

    return (
      <div className="flex justify-center mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <TbStarFilled
            key={i}
            className={`text-${i < stars ? '[#FFD700]' : 'gray-300'} text-lg`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold text-[#7D287E] mb-6">Top Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topUsers?.length > 0 ? (
          topUsers.map((user, index) => (
            <div key={user._id || user.id} className="bg-white rounded-lg shadow-xl">
              <div className="relative bg-gradient-to-br from-[#8A2BE2] to-[#FF69B4] rounded-t-lg shadow-lg p-6 text-white flex flex-col h-[100px]">
                <div className="absolute top-2 right-4 text-4xl font-extrabold opacity-70">
                  {`0${index + 1}`}
                </div>
                <Image
                  src={Avatar}
                  alt={user.name || "User"}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full mb-4 mt-10 object-cover"
                />
              </div>
              <div className="mt-16 p-2">
                <h3 className="text-xl font-semibold mb-1">{user.name || "N/A"}</h3>
                <p className="text-sm opacity-90 mb-4">User ID: {user._id || "N/A"}</p>
                {/* <div className="flex justify-around w-full text-sm mb-4">
                  <div className="flex flex-col items-center">
                    <span className="font-bold">{user.learningTime || "0 H"}</span>
                    <span className="text-xs opacity-80">Learning Time</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold">{user.startedCourses || 0} S</span>
                    <span className="text-xs opacity-80">Started Courses</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="flex items-center justify-center font-bold">
                      <TbStarFilled className="text-[#efbf04]" /> {user.points || 0}
                    </span>
                    <span className="text-xs opacity-80">Total Points</span>
                  </div>
                </div> */}
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => handleViewProfile(user)}
                    className="px-16 py-2 text-white bg-black rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No top users available.</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-3 sm:space-y-0">
          <h2 className="text-xl font-bold text-gray-800">General Leaderboard</h2>
          {/* <div className="flex flex-col sm:flex-row space-y-2 sm:space-x-2 sm:space-y-0">
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700">
              <option>Your Pakistan Rank</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700">
              <option>Your Class Rank</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700">
              <option>Your Province Rank</option>
            </select>
          </div> */}
        </div>

        <div className="overflow-x-auto">
          {leaderboard?.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Learning Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Started Courses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Points</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboard.map((entry, index) => (
                  <tr key={entry._id || entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {entry.rank || index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                      <Image
                        src={Avatar}
                        alt={entry.name || "User"}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full mr-3 object-cover"
                      />
                      {entry.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.country || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.learningTime || "0 H"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.startedCourses || 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <TbStarFilled className="text-[#efbf04]" /> {entry.points || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No leaderboard data available.</p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selectedUser && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-3 text-gray-500 text-lg hover:text-black"
              >
                ✖
              </button>

              <div className="text-center">
                <Image
                  src={Avatar}
                  alt={selectedUser.name}
                  width={100}
                  height={100}
                  className="mx-auto rounded-full mb-3"
                />
                <h3 className="text-2xl font-bold mb-1">{selectedUser.name}</h3>
                <p className="text-sm text-gray-600 mb-4">Country: {selectedUser.country || "N/A"}</p>
                {getStars(selectedUser.startedCourses.length)}
              </div>

              <div className="text-sm text-gray-700 space-y-2 mt-4">
                <p><strong>Started Courses:</strong> {selectedUser.startedCourses.length}</p>
                <p><strong>Attempted Tests:</strong> {selectedUser.attemptedTests.length}</p>
                <p><strong>Unattempted Tests:</strong> {selectedUser.unattemptedTests.length}</p>
                <p><strong>Quiz Attempts:</strong> {selectedUser.quizAttempts.length}</p>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeaderboardTab;
