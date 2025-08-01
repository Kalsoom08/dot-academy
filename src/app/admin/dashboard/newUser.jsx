'use client'
import React from 'react';
import {useRouter} from 'next/navigation';

const NewUsersCard = () => {
  const router = useRouter()
  const users = [
    { id: 1, name: 'Anyname', enrolledCourses: 1, date: '17 July 2025' },
    { id: 2, name: 'Anyname', enrolledCourses: 1, date: '17 July 2025' },
    { id: 3, name: 'Anyname', enrolledCourses: 1, date: '17 July 2025' },
  ];

  return (
    <div className="border border-gray-300 rounded-2xl bg-white p-6 w-full max-w-xl shadow-sm">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">New Users</h2>

      <div className="space-y-4">
        {users.map((user) => {
          const avatarLetter = user.name.charAt(0).toUpperCase();

          return (
            <div
              key={user.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 p-4 rounded-xl hover:shadow transition duration-200 border border-gray-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-[#7D287E] text-white rounded-full flex items-center justify-center text-lg font-bold shadow-md">
                  {avatarLetter}
                </div>
                <div>
                  <p className="text-gray-900 font-medium ">{user.name}</p>
                  <p className="text-sm text-gray-500">Enrolled Course: {user.enrolledCourses}</p>
                </div>
              </div>
              <div className="text-sm text-[#7D287E] font-medium">{user.date}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button onClick={() => router.push('/admin/users')}
        className="bg-[#7D287E] hover:bg-[#6b226e] text-white font-semibold py-2.5 px-6 rounded-xl shadow hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50">
          View All
        </button>
      </div>
    </div>
  );
};

export default NewUsersCard;
