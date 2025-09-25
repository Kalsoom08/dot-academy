'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  getMainCategories,
  getMyExams,
  addExam,
} from '../../../../APIs/changeExamAPI';

const AddExamModal = ({ isOpen, onClose }) => {
  const [availableExams, setAvailableExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    async function fetchExams() {
      try {
        setLoading(true);

        const [allExams, prefs] = await Promise.all([
          getMainCategories(),
          getMyExams(),
        ]);

        const myExams = prefs.myExams || [];
        const filtered = allExams.filter(
          (exam) => !myExams.some((my) => my._id === exam._id)
        );

        setAvailableExams(filtered);
      } catch (err) {
        console.error('Failed to load exams:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchExams();
  }, [isOpen]);

  const handleProceed = async () => {
    if (!selectedExam) {
      alert('Please select an exam');
      return;
    }

    try {
      await addExam(selectedExam);
      onClose(); 
    } catch (err) {
      console.error('Failed to add exam:', err);
      alert('Something went wrong while adding the exam');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-6 relative"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
              Select Exam to Add
            </h2>

            {loading ? (
              <p className="text-center text-gray-600">Loading exams...</p>
            ) : availableExams.length === 0 ? (
              <p className="text-center text-gray-600">
                No more exams available to add.
              </p>
            ) : (
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {availableExams.map((exam) => (
                  <div
                    key={exam._id}
                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${
                      selectedExam === exam._id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedExam(exam._id)}
                  >
                    {exam.image && (
                      <Image
                        src={exam.image}
                        alt={exam.name}
                        width={40}
                        height={40}
                        className="rounded"
                      />
                    )}
                    <span className="font-medium">{exam.name}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleProceed}
                disabled={!selectedExam}
              >
                Proceed
              </button>
            </div>

            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold p-2"
              onClick={onClose}
            >
              &times;
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddExamModal;
