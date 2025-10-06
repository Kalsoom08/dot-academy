'use client';
import React, { useState } from 'react';
import { BiMessageRounded } from 'react-icons/bi';
import { submitDoubt } from '../../../../APIs/DoubtAPI';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AskAnyDoubt({ isVisible, onClose }) {
  const { id: courseId } = useParams();
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic || !question) {
      toast.error('Please fill in both fields!');
      return;
    }

    setLoading(true);
    try {
      await submitDoubt(courseId, topic, question);
      toast.success('Your doubt has been submitted!');
      setTopic('');
      setQuestion('');
      onClose();
    } catch (error) {
      console.error('Submit doubt failed:', error.response?.data || error.message);
      toast.error(error.response?.data?.error || 'Error submitting your doubt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-[1px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times; 
            </button>

            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BiMessageRounded size={26} className="text-purple-700" />
              Ask Your Doubt
            </h2>

            <form onSubmit={handleSubmit}>
              <label className="block mb-2 font-medium">Topic</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full p-2 border rounded mb-3"
                placeholder="Enter topic"
                required
              />

              <label className="block mb-2 font-medium">Your Question</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-3 border rounded mb-4"
                rows={5}
                placeholder="Type your question here..."
                required
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className={`bg-purple-700 text-white py-2 px-6 rounded-lg hover:bg-purple-800 w-full transition ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AskAnyDoubt;
