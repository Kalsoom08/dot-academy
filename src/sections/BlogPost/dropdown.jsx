import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Anton } from 'next/font/google';
import { useEffect, useRef, useState } from 'react';

const anton = Anton({ subsets: ['latin'], weight: '400' });

export default function HeaderBar() {
  const tabScrollRef = useRef(null);

  const scrollTabs = (direction) => {
    const container = tabScrollRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white p-4 mt-6">
      <h1
        className={`${anton.className} text-2xl md:text-3xl font-bold lg:ml-20 md:ml-20 ml-6 mb-4`}
      >
        Class 10 Maths MCQs with Answers (PDF Download)
      </h1>

      <div className="flex items-center justify-center relative">
        <button
          onClick={() => scrollTabs("left")}
          className="z-10 p-2 bg-gray-800 text-white rounded-full shadow-md"
        >
          <FaArrowLeft />
        </button>

        <div
          ref={tabScrollRef}
          className="flex items-center overflow-x-auto no-scrollbar space-x-2 mx-2 py-2"
        >
          <DropdownButton label="Study Material" />
          <DropdownButton label="Sample Paper" />
          <DropdownButton label="Exam Info" />
          <SimpleButton label="Syllabus" />
        </div>

        <button
          onClick={() => scrollTabs("right")}
          className="z-10 p-2 bg-gray-800 text-white rounded-full shadow-md"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

function DropdownButton({ label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isOpen]);

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        ref={buttonRef}
        className="px-6 py-2 border border-gray-300 rounded-md flex items-center gap-8 whitespace-nowrap"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed w-64 bg-white border border-gray-200 rounded shadow-md z-50"
          style={{ top: position.top, left: position.left }}
        >
          <ul className="py-2 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              NCERT Solution for Class 12
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Important Questions for Class 12
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Revision Note for Class 12
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function SimpleButton({ label }) {
  return (
    <button className="px-6 py-2 border border-gray-300 rounded-md whitespace-nowrap">
      {label}
    </button>
  );
}
