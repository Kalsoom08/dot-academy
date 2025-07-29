'use client';

import { useState } from 'react';
import Image from 'next/image';
import Pic from '../../../../public/dashboard/igc.png';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const PkgCard = () => {
  const cardData = [
    { title: "IGCSE Cambridge package for 10 Years", icon: Pic },
    { title: "IGCSE Cambridge package for 10 Years", icon: Pic },
    { title: "IGCSE Cambridge package for 10 Years", icon: Pic },
    { title: "IGCSE Cambridge package for 10 Years", icon: Pic },
    { title: "IGCSE Cambridge package for 10 Years", icon: Pic },
    { title: "IGCSE Cambridge package for 10 Years", icon: Pic },
  ];

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCourseView = () => {
    setIsExpanded(!isExpanded);
    document.getElementById("pkg-section")?.scrollIntoView({ behavior: 'smooth' });
  };

  const visibleCards = isExpanded ? cardData : cardData.slice(0, 4);

  return (
    <div
      id="pkg-section"
      className="bg-white rounded-xl p-4 sm:p-6 mx-4 sm:mx-8 mt-10 shadow-md"
    >
      <div className="w-full mb-6 text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Your Courses</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 transition-all duration-500">
        {visibleCards.map((course, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 flex flex-col h-full shadow-md bg-white hover:shadow-lg transition"
          >
            <div className="w-full h-32 flex items-center justify-center mb-4">
              <Image src={course.icon} alt={course.title} className="object-contain w-auto h-full" />
            </div>
            <div className="text-sm font-semibold text-center sm:text-left mb-4 text-gray-800">
              {course.title}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mt-auto">
              <button className="w-full sm:w-1/2 px-4 py-2 text-sm font-medium bg-[#661f69] text-white rounded hover:bg-purple-700 transition">
                Buy Now
              </button>
              <button className="w-full sm:w-1/2 px-4 py-2 text-sm font-medium border border-[#661f69] text-[#661f69] rounded hover:bg-gray-100 transition">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>

      {cardData.length > 4 && (
        <div className="text-center mt-6">
          <button
            onClick={toggleCourseView}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D6D6D6] text-sm rounded-full hover:bg-gray-300 transition"
          >
            {isExpanded ? (
              <>
                View Less <FiChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View More Courses <FiChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PkgCard;
