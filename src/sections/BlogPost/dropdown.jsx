import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Anton } from 'next/font/google';
import { useRef } from 'react';

const anton = Anton({ subsets: ['latin'], weight: '400' });

export default function HeaderBar() {
  const tabScrollRef = useRef(null);

  const scrollTabs = (direction) => {
    const container = tabScrollRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white p-4 mt-6">
      <h1 className={`${anton.className} text-2xl md:text-3xl font-bold lg:ml-20 md:ml-20 ml-6 mb-4`}>
        Class 10 Maths MCQs with Answers (PDF Download)
      </h1>

      <div className="relative">
        <button
          onClick={() => scrollTabs("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-full shadow-md lg:ml-20"
        >
          <FaArrowLeft />
        </button>

        <div
          ref={tabScrollRef}
          className="flex justify-center items-center overflow-x-auto no-scrollbar space-x-2 px-12 py-2"
        >
          <DropdownButton label="Study Material" />
          <DropdownButton label="Sample Paper" />
          <DropdownButton label="Exam Info" />
          <SimpleButton label="Syllabus" />
        </div>

        <button
          onClick={() => scrollTabs("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-gray-800 text-white rounded-full shadow-md lg:mr-20"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

function DropdownButton({ label }) {
  return (
    <div className="relative">
      <button className="px-14 py-2 border border-gray-300 rounded-md flex items-center gap-2 whitespace-nowrap">
        {label}
        <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
}

function SimpleButton({ label }) {
  return (
    <button className="px-4 py-2 border border-gray-300 rounded-md whitespace-nowrap">
      {label}
    </button>
  );
}
