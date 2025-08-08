import React from 'react';
import Sideshow from '../SideShow';
import { IoChatbubbleOutline } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { MdTipsAndUpdates } from "react-icons/md";



export default function askQuestion() {
  return (
    <div className=" min-h-screen font-sans antialiased text-gray-800">
    
      <div className="container mx-auto p-4 md:p-8 grid lg:grid-cols-3 gap-8">
  
        <div className="lg:col-span-2 space-y-8">
          <Header />
          <AskYourDoubt />
          <TipsForResponses />
          <PeopleAsked />
        </div>

        
        <div className="lg:col-span-1 space-y-8">
            <Sideshow/>
        </div>
      </div>
    </div>
  );
}


const Header = () => (
  <div className="text-sm text-gray-500 mb-4">
    <span className="text-purple-600 font-medium">MDCAT</span> &gt; English &gt; Noun
  </div>
);


const AskYourDoubt = () => (
  <div className="bg-white rounded-xl  p-6">
    <div className="flex items-center space-x-2 mb-4">
      <div className="w-12 h-12 rounded-full  flex items-center justify-center">
  <IoChatbubbleOutline/>
      </div>
      <h2 className="text-xl font-semibold ">Ask Your Doubt</h2>
    </div>
    <p className="text-gray-600 text-sm mb-4">
      Learn about different types of nouns and their usage in English grammar.
    </p>
    <div className="relative mb-10 border p-6 rounded-md border-[#E6E6E6]">
        <div className='flex items-center'>
            <FaQuestion className='text-blue-500'/>
            <p >Ask Your Questions</p>
        </div>
      <textarea
        className="w-full mt-6 h-24 p-4 text-gray-700 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border-2 border-gray-200"
        placeholder="Type your Question here and hit enter."
      ></textarea>
      <span className="absolute bottom-2 right-4 text-xs text-gray-400">
        125 words
      </span>
    </div>
    <div className='flex justify-end'>
    <button className=" bg-[#7D287E] text-white px-10 font-medium py-3 rounded-xl hover:bg-purple-900 transition-colors">
      Submit
    </button>
    </div>

  </div>
);

const TipsForResponses = () => (
  <div className="bg-[#ED9DA047] rounded-xl shadow-md p-6 ">
    <div className="flex items-center space-x-2 mb-4">
    <MdTipsAndUpdates/>
      <h3 className="text-lg font-semibold text-gray-900">Tips for Better Responses</h3>
    </div>
    <ul className="list-disc list-inside text-[#282828] space-y-2">
      <li>Be specific about what you're struggling with</li>
      <li>Include examples or context when possible</li>
      <li>Check previous doubts - your question might already be answered!</li>
    </ul>
  </div>
);

const PeopleAsked = () => (
  <div className="space-y-6">
    <h3 className="text-xl font-bold">People Asked</h3>
    <QuestionCard
      name="Aliza Khan"
      date="Jul 15, 10:30 AM"
      question="What is the difference between common noun and proper noun? Can you provide some examples?"
      answer="A common noun refers to general items like 'book', 'city', 'student'. Unlike a proper noun, which is a specific name for a person, place, or thing (e.g., 'London'), common nouns are not capitalized when they start a sentence, but proper nouns are always capitalized."
    />
    <QuestionCard
      name="Aliza Khan"
      date="Jul 15, 10:30 AM"
      question="What is the difference between common noun and proper noun? Can you provide some examples?"
      answer="A common noun refers to general items like 'book', 'city', 'student'. Unlike a proper noun, which is a specific name for a person, place, or thing (e.g., 'London'), common nouns are not capitalized when they start a sentence, but proper nouns are always capitalized."
    />
  </div>
);

const QuestionCard = ({ name, date, question, answer }) => (
  <div className="bg-white rounded-xl shadow-md p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <img
          src="https://placehold.co/40x40/9CA3AF/FFFFFF?text=AK"
          alt="User avatar"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold text-gray-900">{name}</p>
          
        </div>
      </div>
      <div className='flex gap-3'>
        <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
        Answered
      </span>
      <span className="text-sm text-gray-500">{date}</span>
      </div>

    </div>
    <p className="text-gray-700 font-medium mb-4">{question}</p>
    <div className="flex items-start space-x-3 p-4 bg-[#F2F2F2] rounded-lg">
      <img
        src="https://placehold.co/32x32/6366F1/FFFFFF?text=SA"
        alt="Teacher avatar"
        className="w-8 h-8 rounded-full"
      />
      <div>
        <p className="font-semibold ">Dr. Saniah Ahmad</p>
        <p className="text-gray-600 text-sm mt-1">{answer}</p>
      </div>
    </div>
  </div>
);


