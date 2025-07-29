import Head from 'next/head';
import { useState } from 'react';
import { FaExchangeAlt, FaPlus } from 'react-icons/fa';

const ChangeExamModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50 backdrop-blur-[1px] p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-auto p-6 relative">
        <h2 className="text-xl font-bold text-center text-gray-900 mb-6">
          Change/Add Exam
        </h2>

        <div className="space-y-4">
          <button
            className="w-full flex items-center justify-between px-5 py-3 border border-gray-300 rounded-lg text-lg font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            onClick={() => { alert('Change Exam clicked!'); onClose(); }}
          >
            <span>Change Exam</span>
            <FaExchangeAlt className="text-gray-600 text-xl" />
          </button>

          <button
            className="w-full flex items-center justify-between px-5 py-3 border border-gray-300 rounded-lg text-lg font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            onClick={() => { alert('Add Exam clicked!'); onClose(); }}
          >
            <span>Add Exam</span>
            <FaPlus className="text-gray-600 text-xl" />
          </button>
        </div>


        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold p-2 leading-none"
          onClick={onClose}
        >
          &times; 
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-full bg-gray-100 flex flex-col items-center justify-center p-4">
      <Head>
        <title>Change Exam Modal Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Click the button to open the modal
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out shadow-lg"
        >
          Open Change/Add Exam Modal
        </button>

    
      </main>

      <ChangeExamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}