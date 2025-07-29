'use client';
import React from 'react';
import Image from 'next/image';
import { TbStarFilled } from "react-icons/tb";
import Avatar from '../../../public/profile/avatar.png';

const LeaderboardTab = () => {
  const topUsers = [
    {
      id: 1,
      name: 'Ahmed Khan',
      location: 'Karachi, Pakistan',
      learningTime: '65 H',
      completedCourses: '45 C',
      totalPoints: '4000',
      profilePic: Avatar,
    },
    {
      id: 2,
      name: 'Aliza Khan',
      location: 'Lahore, Pakistan',
      learningTime: '65 H',
      completedCourses: '45 C',
      totalPoints: '4000',
      profilePic: Avatar,
    },
    {
      id: 3,
      name: 'Ali Azmad',
      location: 'Islamabad, Pakistan',
      learningTime: '65 H',
      completedCourses: '45 C',
      totalPoints: '4000',
      profilePic: Avatar,
    },
  ];

  const generalLeaderboard = [
    { id: 1, name: 'Fiza Ali', country: 'Pak Karachi', learningTime: '21 Hours', completedCourses: '24 Courses', totalPoint: '1400' ,profilePic: Avatar,},
    { id: 2, name: 'Ahmed', country: 'Pak Karachi', learningTime: '28 Hours', completedCourses: '24 Courses', totalPoint: '1100' ,profilePic: Avatar,},
    { id: 3, name: 'Jawad Ahmed', country: 'Pak Karachi', learningTime: '21 Hours', completedCourses: '24 Courses', totalPoint: '1400',profilePic: Avatar, },
    { id: 4, name: 'Amana', country: 'Pak Karachi', learningTime: '21 Hours', completedCourses: '24 Courses', totalPoint: '1400' ,profilePic: Avatar,},
    { id: 5, name: 'Aslam', country: 'Pak Karachi', learningTime: '21 Hours', completedCourses: '24 Courses', totalPoint: '1400' ,profilePic: Avatar,},
    { id: 6, name: 'Rumesa', country: 'Pak Karachi', learningTime: '21 Hours', completedCourses: '24 Courses', totalPoint: '1400' ,profilePic: Avatar,},
    { id: 7, name: 'Rahman', country: 'Pak Karachi', learningTime: '21 Hours', completedCourses: '24 Courses', totalPoint: '1400' ,profilePic: Avatar,},
    { id: 8, name: 'Rabiya', country: 'Pak Peshawar', learningTime: '21 Hours', completedCourses: '24 Courses', totalPoint: '1400' ,profilePic: Avatar,},
    { id: 9, name: 'Asra Khan', country: 'Pak Lahore', learningTime: '21 Hours', completedCourses: '24 Courses', totalPoint: '1400' ,profilePic: Avatar,},
    { id: 10, name: 'Aliza shah', country: 'Pak Islamabad', learningTime: '21 Hours', completedCourses: '24 Courses', totalPoint: '1400' ,profilePic: Avatar,},
  ];

  return (
    <div className="space-y-8 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold text-[#7D287E] mb-6">Top Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {topUsers.map((user, index) => (
           <div className='bg-white rounded-lg shadow-xl'>
          <div
            key={user.id}
            className={`relative bg-gradient-to-br from-[#8A2BE2] to-[#FF69B4] rounded-t-lg shadow-lg p-6 text-white flex flex-col h-[100px]`}
          >
            <div className="absolute top-2 right-4 text-4xl font-extrabold opacity-70">
              {`0${index + 1}`}
            </div>
            <Image
              src={user.profilePic}
              alt={user.name}
              className="w-20 h-20 rounded-full  mb-4 mt-10 object-cover"
            />
            </div>
            <div className='mt-16 p-2'>
            <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
            <p className="text-sm opacity-90 mb-4">{user.location}</p>
            <div className="flex justify-around w-full text-sm mb-4">
              <div className="flex flex-col items-center">
                <span className='font-bold'>{user.learningTime}</span>
                <span className="text-xs opacity-80">Learning Time</span>
              </div>
              <div className="flex flex-col items-center">
                <span className='font-bold'>{user.completedCourses}</span>
                <span className="text-xs opacity-80">Completed Courses</span>
              </div>
              <div className="flex flex-col items-center">
                <span className='flex items-center justify-center font-bold'><TbStarFilled className='text-[#efbf04]'/> {user.totalPoints}</span>
                <span className="text-xs opacity-80">Total Points</span>
              </div>
            </div>
            <div className='flex justify-center mt-6'>
            <button className="px-16 py-2 text-white bg-black rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200">
              View Profile
            </button>
            </div>

            </div>
          

         </div>
        ))}
      </div>


      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-3 sm:space-y-0"> 
          <h2 className="text-xl font-bold text-gray-800">General Leaderboard</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-x-2 sm:space-y-0"> 
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700">
              <option>Your Pakistan Rank</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700">
              <option>Your class Rank</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-700">
              <option>Your province Rank</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto"> 
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Learning Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completed Courses
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Point
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {generalLeaderboard.map((entry, index) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                    <Image
                      src={entry.profilePic}
                      alt={entry.name}
                      className="w-8 h-8 rounded-full mr-3 object-cover"
                    />
                    {entry.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.learningTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {entry.completedCourses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                    <TbStarFilled className='text-[#efbf04]' /> {entry.totalPoint}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardTab;