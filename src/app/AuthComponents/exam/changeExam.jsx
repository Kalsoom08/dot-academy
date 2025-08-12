'use client';

import { useState } from 'react';
import { FaExchangeAlt, FaPlus } from 'react-icons/fa';
import ChangeExamSubModal from './selectExamModal';
import { useChangeExamModal } from '../../../context/ChangeExamModalContext';
import { motion, AnimatePresence } from 'framer-motion';

const ChangeExamModal = () => {
  const { isOpen, closeChangeExamModal } = useChangeExamModal();
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  const handleOpenSubModal = () => setIsSubModalOpen(true);

  const handleCloseSubModal = () => {
    setIsSubModalOpen(false);
    closeChangeExamModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-[1px] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-auto p-6 relative"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
              Change/Add Exam
            </h2>

            <div className="space-y-4">
              <button
                className="w-full flex items-center justify-between px-5 py-3 border border-gray-300 rounded-lg text-lg font-medium text-gray-800 hover:bg-gray-50 transition"
                onClick={handleOpenSubModal}
              >
                <span>Change Exam</span>
                <FaExchangeAlt className="text-gray-600 text-xl" />
              </button>

              <button
                className="w-full flex items-center justify-between px-5 py-3 border border-gray-300 rounded-lg text-lg font-medium text-gray-800 hover:bg-gray-50 transition"
                onClick={() => { 
                  alert('Add Exam clicked!'); 
                  closeChangeExamModal(); 
                }}
              >
                <span>Add Exam</span>
                <FaPlus className="text-gray-600 text-xl" />
              </button>
            </div>

            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold p-2"
              onClick={closeChangeExamModal}
            >
              &times;
            </button>
          </motion.div>

          <ChangeExamSubModal
            isOpen={isSubModalOpen}
            onClose={handleCloseSubModal}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChangeExamModal;
