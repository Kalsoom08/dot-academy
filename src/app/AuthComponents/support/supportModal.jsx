'use client';
import React, { useState } from 'react';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

const Support = () => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(true); 

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message submitted! We will get back to you soon.');
    setMessage('');
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40 backdrop-blur-[2px] p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md sm:max-w-lg mx-4">

      
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-md">
          <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl">
            <MdOutlineSupportAgent size={40} className="text-[#8a40af]" />
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-white bg-black hover:bg-gray-800 rounded-full w-6 h-6 flex items-center justify-center shadow-sm transition"
          aria-label="Close Support Modal"
        >
          <RxCross2 size={16} />
        </button>

        {/* Title */}
        <h2 className="text-center text-2xl font-bold mt-10 mb-2 text-gray-800">
          Contact Support
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Our Team is online on Mon to Fri from 9:00 PM to 5:00 PM
        </p>

        {/* Form */}
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
              onClick={() => alert('Redirecting to FAQ page...')}
              className="flex-1 py-3 px-4 border border-gray-400 text-gray-700 rounded-xl hover:bg-gray-100 transition"
            >
              Check FAQ's
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl text-white bg-[#8a40af] hover:bg-purple-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Support;
