'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import questions from '../../../../public/Payment/que.png';
import tips from '../../../../public/Payment/tips.png';
import { BiMessageRounded } from "react-icons/bi";
import SideShow from './SideShow';

function AskAnyDoubt() {
  const [question, setQuestion] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim()) {
      console.log('Submitted:', question);
      setQuestion('');
    }
  };

  return (
    <section className="lg:px-4 md:px-4 px-2 lg:px-6 py-4 grid grid-cols-1 lg:grid-cols-[70%_30%] gap-6">
      <div className="w-full lg:p-4 md:p-4 mt-4 sm:mt-8">
        <p className="text-gray-400 text-sm mb-4">MDCAT &gt; English &gt; Noun</p>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-1 flex items-center gap-2 flex-wrap">
          <BiMessageRounded size={26} className="text-[#7D287E]" />
          Ask Your Doubt
        </h2>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Learn about different types of nouns and their usage in English grammar
        </p>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 sm:p-6 border border-gray-200">
          <label className="block font-medium text-gray-700 mb-2 flex items-center gap-4 flex-wrap">
            <Image src={questions} alt="Ask" width={24} height={24} />
            Ask Your Question
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question about nouns and their types..."
            maxLength={500}
            rows={6}
            className="w-full p-4 bg-gray-200 rounded-md resize-none focus:outline-none"
          />
          <p className="text-right text-xs text-gray-400 mt-1">
            {500 - question.length} words left
          </p>
          <button
            type="submit"
            className="mt-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-6 rounded transition w-full sm:w-auto"
          >
            Submit
          </button>
        </form>

        <div className="mt-8 bg-[#ED9DA0]/50 border-l-4 border-red-400 px-4 py-6 rounded-md">
          <h3 className="font-semibold mb-3 flex items-center gap-4 flex-wrap text-base sm:text-lg">
            <Image src={tips} alt="Tips" width={24} height={24} />
            Tips for Better Responses
          </h3>
          <ul className="text-sm list-disc pl-5 space-y-1">
            <li>Be specific about what you're struggling with</li>
            <li>Include examples or context when possible</li>
            <li>Check previous questions before posting</li>
          </ul>
        </div>
      </div>

      <div className="w-full">
        <SideShow />
      </div>
    </section>
  );
}

export default AskAnyDoubt;
