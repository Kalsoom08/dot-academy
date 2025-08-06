'use client';
import { FaExchangeAlt, FaPlus } from 'react-icons/fa';

export default function ChangeExamModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-auto p-6 relative">
        <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
          Change/Add Exam
        </h2>

        <div className="space-y-4">
          <button
            className="w-full flex items-center justify-between px-5 py-3 border border-gray-300 rounded-lg text-lg font-medium text-gray-800 hover:bg-gray-50 transition"
            onClick={() => { alert('Change Exam clicked!'); onClose(); }}
          >
            <span>Change Exam</span>
            <FaExchangeAlt className="text-gray-600 text-xl" />
          </button>

          <button
            className="w-full flex items-center justify-between px-5 py-3 border border-gray-300 rounded-lg text-lg font-medium text-gray-800 hover:bg-gray-50 transition"
            onClick={() => { alert('Add Exam clicked!'); onClose(); }}
          >
            <span>Add Exam</span>
            <FaPlus className="text-gray-600 text-xl" />
          </button>
        </div>

        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold p-2"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
