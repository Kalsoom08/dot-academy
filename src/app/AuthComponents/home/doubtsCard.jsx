'use client';

import React from 'react';
import { GoDiscussionClosed } from "react-icons/go";

const DoubtsCard = () => {
  return (
    <div className="bg-[#661f69] text-white rounded-xl p-6 sm:p-8 shadow-lg mx-4 sm:mx-8 lg:mx-12 xl:mx-8 mt-10">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Discuss Your Doubts</h1>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <p className="text-sm sm:text-base leading-relaxed sm:max-w-xl text-center sm:text-left">
          Get your doubts resolved with the biggest Ecademy community of 10M+ users and teachers.
        </p>
        <GoDiscussionClosed className="text-4xl sm:text-5xl flex-shrink-0" />
      </div>

      <div className="flex justify-center sm:justify-start">
        {/* <button className="bg-white text-[#661f69] hover:bg-gray-100 font-semibold px-6 py-3 rounded-md transition">
          Discuss Doubts
        </button> */}
      </div>
    </div>
  );
};

export default DoubtsCard;
