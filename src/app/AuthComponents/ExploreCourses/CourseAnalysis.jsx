'use client';
import React, { useState, useEffect } from 'react'; 
import { MdCancel } from "react-icons/md"; 
import Image from 'next/image';

import icon1 from '../../../../public/Courses/icon1.png';
import icon2 from '../../../../public/Courses/icon2.png';
import icon3 from '../../../../public/Courses/icon3.png';
import icon4 from '../../../../public/Courses/icon4.png';
import icon5 from '../../../../public/Courses/icon5.png';
import icon6 from '../../../../public/Courses/icon6.png';
import icon7 from '../../../../public/Courses/icon7.png';
import icon8 from '../../../../public/Courses/icon8.png'; 
import icon9 from '../../../../public/Courses/icon9.png';

const testAndContents = [
  { image: icon1, title: 'Content Viewed', outOf: '3/568' },
  { image: icon2, title: 'Test Attempted', outOf: '2/138' },
  { image: icon3, title: 'Total Test Questions', outOf: '0/34' },
  { image: icon4, title: 'Total Time on Test', outOf: '0' },
  { image: icon5, title: 'Correct: Incorrect Questions', outOf: '0/0' },
  { image: icon6, title: 'Average Time per Question', outOf: '0%' },
  { image: icon7, title: 'Average Rank', outOf: '167995' },
  { image: icon8, title: 'Average Percentile', outOf: '1429' },
  { image: icon9, title: 'Average Accuracy', outOf: '0' }
];

function CourseAnalysis({ onClose, itemData }) { 
  const [progress, setProgress] = useState(10); 

  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-fadeIn">
      <div className='flex justify-between items-center border-b p-4'>
        <h1 className='text-2xl font-bold'>Course Analysis</h1>
        <MdCancel
          size={25}
          className='cursor-pointer'
          onClick={onClose}
          aria-label="Close analysis"
        /> 
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 p-6'>
        <div>
          <h2 className='text-lg font-semibold'>Course Progress</h2>
          <p className='text-sm text-gray-500 mt-2'>
            This shows your complete course progress. Finish all course content to reach 100%.
          </p>
        </div>
        <div className='flex justify-center'>
          <div className='relative w-36 h-36'>
            <svg height="100%" width="100%" viewBox="0 0 144 144">
              <circle
                stroke="#e5e7eb"
                fill="transparent"
                strokeWidth={stroke}
                r={normalizedRadius}
                cx="72"
                cy="72"
              />
              <circle
                stroke="#7c287d"
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                r={normalizedRadius}
                cx="72"
                cy="72"
                transform="rotate(-90 72 72)"
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            <div className='absolute inset-0 flex items-center justify-center'>
              <span className='text-[#7c287d] font-bold text-xl'>{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className='p-4'>
        <h2 className='text-lg font-semibold mb-4'>Tests and Contents Analysis</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
          {testAndContents.map((item, index) => (
            <div key={index} className='flex items-center gap-4'>
              <Image src={item.image} alt={item.title} className='w-10 h-10' />
              <div>
                <p className='text-sm'>{item.title}</p>
                <p className='font-bold text-sm'>{item.outOf}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseAnalysis;
