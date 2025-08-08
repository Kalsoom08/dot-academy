'use client';
import React, { useState } from 'react';
import TestPopup from './testPopup';
import { RxCross2 } from "react-icons/rx";

function ConfirmTestPopup({ isVisible, onClose }) {
  const [showTestPopup, setShowTestPopup] = useState(false);

  const handleCloseAll = () => {
    setShowTestPopup(false);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <>
      {!showTestPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[1px]">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-5 relative">
            {/* Cross close */}
            <button
              onClick={handleCloseAll}
              className="absolute top-3 right-3"
            >
              <RxCross2 className="bg-black text-white rounded-full" />
            </button>

            <h2 className="text-lg font-semibold mb-5 text-center">
              Do you want to take this test?
            </h2>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  // Reset analysis action
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
              >
                Result Analysis
              </button>
              <button
                onClick={() => setShowTestPopup(true)}
                className="px-4 py-2 bg-[#7D287E] text-white rounded-md text-sm font-medium hover:bg-purple-900"
              >
                Attempt Test
              </button>
            </div>
          </div>
        </div>
      )}

      {showTestPopup && (
        <TestPopup
          isVisible={true}
          onClose={handleCloseAll}
          onStart={(mode) => {
            console.log('Selected mode:', mode);
            handleCloseAll();
          }}
          selectedTest={null}
        />
      )}
    </>
  );
}

export default ConfirmTestPopup;
