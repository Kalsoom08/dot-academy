'use client';
import React from 'react';
import Image from 'next/image';
import { TbStarFilled } from "react-icons/tb";
import { useSelector } from 'react-redux';
import Avatar from '../../../public/profile/avatar.png';

const LeaderboardTab = () => {
  const { topUsers, leaderboard, loading, error } = useSelector((s) => s.profile);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
console.log("profile state =>", useSelector((s) => s.profile));

  return (
    <div className="space-y-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold text-[#7D287E] mb-6">Top Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <p className="text-sm opacity-90 mb-4">{user.country || "N/A"}</p>
                <div className="flex justify-around w-full text-sm mb-4">
                  <div className="flex flex-col items-center">
                    <span className="font-bold">{user.learningTime || "0 H"}</span>
                    <span className="text-xs opacity-80">Learning Time</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-bold">{user.completedCourses || 0} C</span>
                    <span className="text-xs opacity-80">Completed Courses</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="flex items-center justify-center font-bold">
                      <TbStarFilled className="text-[#efbf04]" /> {user.points || 0}
                    </span>
                    <span className="text-xs opacity-80">Total Points</span>
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <button className="px-16 py-2 text-white bg-black rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200">
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
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-x-2 sm:space-y-0">
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700">
              <option>Your Pakistan Rank</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700">
              <option>Your Class Rank</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700">
              <option>Your Province Rank</option>
            </select>
          </div>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed Courses</th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{entry.completedCourses || 0}</td>
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
    </div>
  );
};

export default LeaderboardTab;
