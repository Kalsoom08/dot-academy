'use client';
import React, { useState } from 'react';
import { PiClock } from 'react-icons/pi';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const YourActivityTab = ({
  setActiveTab,
  attemptedTests = [],
  watchedVideos = [],
  docsViewed = [],
  askedQuestions = [],
  doubts = []
}) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null); 

  const handleViewReport = (quiz) => {
    setSelectedQuiz(quiz);
  };

  const closeModal = () => {
    setSelectedQuiz(null);
  };

  return (
    <motion.div
      className="space-y-6 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
     
      <motion.h2 className="text-xl font-bold text-gray-800">Attempted Test</motion.h2>
      {attemptedTests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-5">
          {attemptedTests.map((test, index) => (
            <motion.div
              key={test._id || index}
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-semibold text-gray-800">{test.lesson?.title || "Untitled Test"}</h3>
              <p className="text-sm text-gray-500">{test.course?.name}</p>
              <p className="text-sm text-gray-600 mt-1">Score: {test.score || 0}%</p>
              <button
                onClick={() => handleViewReport(test)}
                className="px-4 py-1 mt-2 bg-black text-white rounded-sm hover:bg-purple-700 transition-all"
              >
                View Report
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div className="bg-white rounded-lg shadow-md p-8 text-center">
          <PiClock className="h-16 w-16 text-blue-500 mb-4" />
          <p className="text-gray-600">No attempted tests yet.</p>
        </motion.div>
      )}

    
      <motion.h2 className="text-xl font-bold text-gray-800 mt-8">Docs & Videos</motion.h2>
      {docsViewed.length > 0 || watchedVideos.length > 0 ? (
        <div className="grid grid-cols-1 gap-5">
          {[...docsViewed, ...watchedVideos].map((item, index) => (
            <motion.div
              key={item._id || index}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-bold text-gray-800">{item.title || "Untitled"}</h3>
              <p className="text-sm text-gray-600">{item.course?.name || "Unknown Course"}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div className="bg-white rounded-lg shadow-md p-8 text-center">
          <PiClock className="h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-600">You haven't viewed any documents or videos yet.</p>
        </motion.div>
      )}

      <motion.h2 className="text-xl font-bold text-gray-800 mt-8">Asked Questions</motion.h2>
      {askedQuestions.length > 0 ? (
        <div className="grid grid-cols-1 gap-5">
          {askedQuestions.map((q, index) => (
            <motion.div
              key={q._id || index}
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-gray-800">{q.text || "Question"}</h3>
              <p className="text-sm text-gray-500">Course: {q.course?.name}</p>
              {q.answeredBy ? (
                <p className="text-sm text-green-600">Answered by: {q.answeredBy.name}</p>
              ) : (
                <p className="text-sm text-red-500">Not answered yet</p>
              )}
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No questions asked yet.</p>
      )}

  
      <motion.h2 className="text-xl font-bold text-gray-800 mt-8">Doubts</motion.h2>
      {doubts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5">
          {doubts.map((d, index) => (
            <motion.div
              key={d._id || index}
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-gray-800">{d.text || "Doubt"}</h3>
              <p className="text-sm text-gray-500">Course: {d.course?.name}</p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No doubts raised yet.</p>
      )}

      {selectedQuiz && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[1px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full relative"
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-2">{selectedQuiz.lesson?.title}</h2>
            <p className="text-gray-600 mb-2">Course: {selectedQuiz.course?.name}</p>
            <p className="text-gray-800 font-semibold mb-4">
              Score: {selectedQuiz.score}% ({selectedQuiz.correctCount}/{selectedQuiz.total})
            </p>

            <div className="max-h-80 overflow-y-auto border-t border-gray-200 pt-3">
              {selectedQuiz.answers?.map((ans, idx) => {
                const q = ans.questionIndex;
                const isCorrect = ans.answer === ans.correctAnswer;
                return (
                  <div
                    key={idx}
                    className={`p-3 mb-2 rounded-lg border ${
                      isCorrect
                        ? 'bg-green-50 border-green-300'
                        : 'bg-red-50 border-red-300'
                    }`}
                  >
                    <p className="font-medium text-gray-800">Question {q + 1}</p>
                    <p className="text-sm text-gray-600">Your Answer: {ans.answer}</p>
                    <p className="text-sm text-gray-600">
                      Correct Answer: {ans.correctAnswer}
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        isCorrect ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {isCorrect ? '✔ Correct' : '✘ Incorrect'}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default YourActivityTab;
