'use client';
import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import { motion } from 'framer-motion';
import { BsArrowRight, BsStars } from 'react-icons/bs';

const DetailPopup = ({ courseData, onClose }) => {
  const handleContinueLearning = () => {
    // Close the popup when continue learning is clicked
    onClose();
    // You can add additional logic here for navigating to the course
  };

  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4'
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <BsStars className="w-4 h-4" />
              </div>
              <div>
                <h1 className='font-bold text-lg'>{courseData?.name || 'Master Course'}</h1>
                <p className="text-purple-100 text-xs mt-0.5">
                  Transform Your Skills
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-200 transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <RxCross2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Course Description */}
          <div className="text-center">
            <h3 className="font-semibold text-gray-800 text-sm mb-2">
              Unlock Your Potential
            </h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              Master new skills with hands-on projects and expert guidance. Join thousands of successful students.
            </p>
          </div>

          {/* Key Highlights */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg border border-purple-100">
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
              <span className="text-purple-700 font-medium text-xs">Practical projects</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg border border-purple-100">
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
              <span className="text-purple-700 font-medium text-xs">Lifetime access</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg border border-purple-100">
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
              <span className="text-purple-700 font-medium text-xs">Expert support</span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl p-3 border border-purple-200">
            <div className="text-center">
              <h4 className="font-semibold text-purple-800 text-sm mb-1">Ready to Begin?</h4>
              <p className="text-purple-600 text-xs mb-3">
                5,000+ students enrolled
              </p>
              <button 
                onClick={handleContinueLearning}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-purple-700 transition-colors flex items-center justify-center gap-1 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <BsArrowRight className="w-3 h-3" />
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailPopup;