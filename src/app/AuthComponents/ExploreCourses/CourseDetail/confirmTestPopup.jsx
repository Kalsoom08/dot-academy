'use client';
import React from 'react';
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

function ConfirmTestPopup({ isVisible, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 relative border border-gray-200"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <RxCross2 className="w-5 h-5 text-gray-600" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Ready for the Quiz?
              </h2>
              
              <p className="text-gray-600 mb-6">
                This quiz contains multiple choice questions. Make sure you're prepared before starting.
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-6 py-2 bg-[#7c287d] text-white rounded-lg text-sm font-medium hover:bg-[#6b1f6b] transition-colors flex-1 shadow-lg"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmTestPopup;