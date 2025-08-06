'use client'
import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { HiOutlineUser, HiOutlineUsers } from 'react-icons/hi';
import { AiFillStar } from 'react-icons/ai';
import { RiShareForwardLine } from 'react-icons/ri';
import { BsClipboard2Data } from "react-icons/bs";

import Image from 'next/image';
import Pic from '../../../../../public/Courses/detail.png';

const DetailPopup = ({ courseData, onClose }) => {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-[1px] p-4'>
      <div className="bg-white rounded-lg border border-[#f8f4f4] w-full max-w-sm mx-auto p-6 relative">
      
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
        >
          <RxCross2 />
        </button>

     
        <div className="space-y-6 ">
          <Image src={Pic} alt="Course Detail" width={50} height={50} />
          <h1 className='font-bold text-2xl'>About This Course</h1>
          <div className="flex items-center">
            <BsClipboard2Data className="w-6 h-6 mr-3"/>
            <span >365 Docs, 136 Test and 129 videos included</span>
          </div>

       
          <div className="flex items-center">
            <HiOutlineUser className="w-6 h-6 mr-3" />
            <span>{courseData.teacher}</span>
          </div>

  
          <div className="flex items-center">
            <HiOutlineUsers className="w-6 h-6 mr-3" />
            <span>2,10,974 Student learning this week </span>
          </div>

          
          <div className="flex items-center">
            <AiFillStar className="w-6 h-6  mr-3" />
            <span> 4.8/5 rating (10136 student)</span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button className="bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-xl shadow hover:bg-gray-200 flex items-center justify-center mx-auto w-full">
            <RiShareForwardLine className="w-5 h-5 mr-2" />
            Share this course
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailPopup;
