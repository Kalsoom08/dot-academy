
'use client';

import { useState } from 'react';
import ExamModal from '../home/modal'; 
import ExamPopup from '../home/examPopup';

const SelectExamModal = ({ isOpen, onClose }) => {
  const [selectedExam, setSelectedExam] = useState('');
  const [isNextModalOpen, setIsNextModalOpen] = useState(false);

 
  if (!isOpen) {
    return null;
  }

  const handleNextClick = () => {
    if (selectedExam) {
      setIsNextModalOpen(true);
      
    } else {
      alert('Please select an exam before proceeding.');
    }
  };

  const handleCloseAllModals = () => {
    setIsNextModalOpen(false); 
    onClose(); 
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-[1px] p-4">
        <div className="bg-white rounded-lg border border-[#f8f4f4] w-full max-w-sm mx-auto p-6 relative">
          <h2 className="text-xl text-center text-gray-900 mb-2 anton">
            Change Exam
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Select the exam you want to change
          </p>

          <div className="space-y-4 mb-6">
            <div
              className={`flex items-center justify-between px-5 py-3 border rounded-lg text-lg font-medium cursor-pointer transition duration-150 ease-in-out ${
                selectedExam === 'Biology'
                  ? 'border-[#D96060] ring-[#D96060] text-[#D96060]'
                  : 'border-gray-300'
              }`}
              onClick={() => setSelectedExam('Biology')}
            >
              <span>Biology</span>
              <div
                className={`w-5 h-5 rounded-full border-2 transition-all duration-150 ease-in-out ${
                  selectedExam === 'Biology'
                    ? 'border-[#D96060] bg-[#D96060]'
                    : 'border-gray-400'
                }`}
              ></div>
            </div>

            <div
              className={`flex items-center justify-between px-5 py-3 border rounded-lg text-lg font-medium cursor-pointer transition duration-150 ease-in-out ${
                selectedExam === 'Chemistry'
                  ? 'border-[#7C287D] ring-2 ring-[#7C287D]'
                  : 'border-gray-300'
              }`}
              onClick={() => setSelectedExam('Chemistry')}
            >
              <span>Chemistry</span>
              <div
                className={`w-5 h-5 rounded-full border-2 transition-all duration-150 ease-in-out ${
                  selectedExam === 'Chemistry'
                    ? 'border-[#7C287D] bg-[#7C287D]'
                    : 'border-gray-400'
                }`}
              ></div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button
              className="bg-[#7C287D] text-white font-bold py-3 px-20 rounded-lg hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-[#7C287D] focus:ring-opacity-50 transition duration-150 ease-in-out"
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>

          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold p-2 leading-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
      </div>

      <div>
        {isNextModalOpen && (
  <ExamModal isOpen={isNextModalOpen} onClose={handleCloseAllModals}>
    <ExamPopup selectedExam={selectedExam} onClose={handleCloseAllModals} />
  </ExamModal> )}
      </div>
      
    </>
  );
};

export default SelectExamModal;