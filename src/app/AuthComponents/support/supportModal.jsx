'use client';
import { useState } from 'react';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { useSupportModal } from '../../../context/SupportModalContext';
import { motion, AnimatePresence } from 'framer-motion';
import { createSupportMessage } from '../../../../APIs/SupportAPI'; 
import { toast } from "react-toastify";


const SupportModal = () => {
  const { isModalOpen, closeModal } = useSupportModal();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
      if (message.trim().length < 4) {
      toast.error('Message must be at least 4 characters long!');
      return;
    }
    e.preventDefault();
    try {
      setLoading(true);
      await createSupportMessage(message);   
      toast.success('Message submitted! We will get back to you soon.');
      setMessage('');
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.error || 'Failed to submit message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-[2px] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md sm:max-w-lg mx-4"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Support icon */}
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-md">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
                <MdOutlineSupportAgent size={40} className="text-[#8a40af]" />
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-white bg-black hover:bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center shadow-sm transition"
              aria-label="Close Support Modal"
            >
              <RxCross2 size={16} />
            </button>

            {/* Modal content */}
            <h2 className="text-center text-2xl font-bold mt-10 mb-2 text-gray-800">
              Contact Support
            </h2>
            <p className="text-center text-gray-500 mb-6 text-sm">
              Our Team is online on Mon to Fri from 9:00 AM to 5:00 PM
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <textarea
                  className="w-full p-4 rounded-xl border border-gray-300 bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  rows="4"
                  placeholder="Let us know how we can help you"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => alert("Redirecting to FAQ page...")}
                  className="flex-1 py-3 px-4 border border-gray-400 text-gray-700 rounded-xl hover:bg-gray-100 transition"
                >
                  Check FAQ's
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 rounded-xl text-white bg-[#8a40af] hover:bg-purple-700 transition disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SupportModal;
