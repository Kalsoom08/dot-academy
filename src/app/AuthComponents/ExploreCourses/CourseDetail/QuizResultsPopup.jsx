'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCheck, FiX, FiTarget } from 'react-icons/fi';

const QuizResultsPopup = ({ isVisible, onClose, results, lessonTitle, totalQuestions }) => {
  if (!isVisible) return null;

  // Handle both backend and client-side result structures
  const score = results?.score || 0;
  const correctCount = results?.correctCount || 0;
  const total = results?.total || totalQuestions;
  const detail = results?.detail || [];

  const incorrectCount = total - correctCount;
  const accuracy = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  const statCards = [
    {
      icon: FiAward,
      label: 'Score',
      value: `${score}%`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: FiCheck,
      label: 'Correct',
      value: correctCount,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: FiX,
      label: 'Incorrect',
      value: incorrectCount,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: FiTarget,
      label: 'Accuracy',
      value: `${accuracy}%`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  ];

  const getPerformanceMessage = () => {
    if (score >= 80) return { message: 'Excellent! 🎉', description: 'You have mastered this topic!' };
    if (score >= 60) return { message: 'Good Job! 👍', description: 'You have a good understanding of the material.' };
    if (score >= 40) return { message: 'Keep Practicing! 💪', description: 'With more practice, you can improve your score.' };
    return { message: 'Needs Improvement 📚', description: 'Review the material and try again for better results.' };
  };

  const performance = getPerformanceMessage();

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7c287d] to-[#9c3b9d] p-4 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <FiAward className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold">Quiz Completed!</h2>
          <p className="text-purple-100 text-sm mt-1">{lessonTitle}</p>
        </div>

        {/* Stats Grid */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {statCards.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${stat.bgColor} rounded-lg p-3 text-center border`}
              >
                <stat.icon className={`w-6 h-6 mx-auto mb-1 ${stat.color}`} />
                <div className={`text-lg font-bold ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Performance Message */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-3 border border-purple-200 mb-4">
            <div className="text-center">
              <h3 className="font-semibold text-purple-800 text-sm mb-1">
                {performance.message}
              </h3>
              <p className="text-purple-700 text-xs">
                {performance.description}
              </p>
            </div>
          </div>

          {/* Question Review - Compact */}
          {detail.length > 0 && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 text-sm mb-2">Question Review</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {detail.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-2 rounded-lg border text-xs ${
                      item.isCorrect 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        item.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {item.isCorrect ? <FiCheck className="w-2 h-2" /> : <FiX className="w-2 h-2" />}
                      </div>
                      <span className="font-medium">
                        Q{item.questionIndex + 1}
                      </span>
                    </div>
                    <div className="text-gray-600">
                      {item.isCorrect ? 'Correct' : `Correct: ${item.correctAnswer}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm"
            >
              Close
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 px-4 py-2 bg-[#7c287d] text-white rounded-lg font-medium hover:bg-[#6b1f6b] transition-colors shadow-lg text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuizResultsPopup;