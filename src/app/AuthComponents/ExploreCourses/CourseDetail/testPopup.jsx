'use client';
import React, { useState } from 'react';
import { FaLock } from "react-icons/fa";

function TestPopup({ isVisible, onClose, onStart, selectedTest }) {
  const [selectedMode, setSelectedMode] = useState('option1'); 

  if (!isVisible) return null;

  const handleStart = () => {
    onStart(selectedMode);
  };

  const options = [
    {
      id: 'option1',
      label: 'Practice Incorrect Questions',
      description: 'Practice only your incorrect questions of this test.',
      locked: false
    },
    {
      id: 'option2',
      label: 'Practice Incorrect Questions',
      description: 'Practice only your incorrect questions of this test.',
      locked: true
    },
    {
      id: 'option3',
      label: 'Practice Incorrect Questions',
      description: 'Practice only your incorrect questions of this test.',
      locked: true
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6  backdrop-blur-[1px] transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden transform transition-all duration-300 scale-95 md:scale-100">
        
        <div className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            Select Your Test Mode
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#A3A3A3]">
            Choose a mode which you want to attempt the test:
          </p>
        </div>

        <div className="p-4 sm:p-6 pt-0 space-y-2">
          {options.map(opt => (
            <div
              key={opt.id}
              onClick={() => setSelectedMode(opt.id)}
              className={`flex items-center justify-between p-3 sm:p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                selectedMode === opt.id
                  ? 'bg-purple-50 border border-purple-400'
                  : 'bg-white hover:bg-gray-50 border border-gray-50'
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex-shrink-0 mr-3 sm:mr-4 border-2 ${
                    selectedMode === opt.id
                      ? 'border-purple-600'
                      : 'border-gray-400'
                  }`}
                >
                  {selectedMode === opt.id && (
                    <div className="w-full h-full rounded-full bg-purple-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg">
                    {opt.label}
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-sm text-[#a3a3a3]">
                    {opt.description}
                  </p>
                </div>
              </div>

              {opt.locked && (
                <span className="text-yellow-500 flex items-center text-xs sm:text-sm ml-2 sm:ml-4 font-semibold">
                  <FaLock className="mr-1" />
                  Unlock
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 p-4 sm:p-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-600 font-semibold rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50 text-sm sm:text-base"
          >
            Cancel
          </button>
          <button
            onClick={handleStart}
            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-white font-semibold rounded-lg shadow-lg bg-[#7D287E] hover:bg-purple-900 text-sm sm:text-base"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestPopup;
