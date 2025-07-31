"use client";
import React from 'react';
import Image from 'next/image';
import course from '../../../../public/users/course.png';
import { MdCancel } from 'react-icons/md';

function User({ onClose, user }) {
  return (
    <section className='flex justify-center items-center w-full min-h-screen'>
      <div className="w-[400px] min-h-[550px] py-6 px-4 bg-white shadow rounded-md text-center relative">
        <div className="absolute top-4 right-4 cursor-pointer text-black" onClick={onClose}>
          <MdCancel size={28} />
        </div>
        <div className="w-24 h-24 mx-auto rounded-full bg-gray-400 flex items-center justify-center text-white text-4xl font-bold">
          {user.name?.charAt(0) || 'U'}
        </div>
        <h2 className="mt-4 text-xl font-semibold mb-6">{user.name}</h2>
        <p className="text-sm mt-1">{user.number}</p>
        <p className="text-sm font-medium">{user.email}</p>
        <p className="text-[14px] mt-1 text-gray-600">Account Created: 11 May 2024 11:00 AM</p>
        <p className="text-[14px] mt-1 text-gray-600">Subscription: {user.subscription}</p>
        <div className="mt-6 text-left pt-6">
          <h3 className="text-md font-semibold mb-2 border-b pb-1">Enrolled Courses ({user.courses})</h3>
          {[...Array(user.courses > 3 ? 3 : user.courses)].map((_, index) => (
            <div key={index} className="flex items-center gap-3 mb-4">
              <Image src={course} alt="Course" width={60} height={60} className="rounded-md" />
              <div className="w-full">
                <p className="font-medium">English Grammar</p>
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div className="bg-purple-600 h-2 rounded" style={{ width: '20%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">20% Completed</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default User;
