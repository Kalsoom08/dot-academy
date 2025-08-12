"use client";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

import { CiTimer } from "react-icons/ci";
import { FiMessageCircle } from "react-icons/fi";


export default function QuestionBoard() {
  const [input, setInput] = useState("");

  return (
    <div className="max-w-3xl p-6 space-y-8 font-sans">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FiMessageCircle size={20} className="text-purple-600" />
          <div>
            <h2 className="text-xl font-semibold">Your Asked Question</h2>
            <p className="text-sm text-gray-500">All of your asked Question goes here</p>
          </div>
        </div>
        <button className="text-sm bg-gray-100 text-gray-700 px-4 py-1 rounded-full">
          2 doubts
        </button>
      </div>
      <div className="border border-gray-200 rounded-xl p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MessageCircle size={16} />
            <p>You Asked</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
              Answered
            </span>
            <p className="text-xs text-gray-400">Jul 15, 10:30 AM</p>
          </div>
        </div>
        <p className="text-gray-800 text-sm">
          What is the difference between common noun and proper noun? Can you provide some examples?
        </p>

        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
              <p className="font-semibold text-sm text-gray-800">Dr. Sarah Ahmed</p>
            </div>
            <p className="text-xs text-gray-400">Jul 15, 10:30 AM</p>
          </div>
          <p className="text-sm text-gray-700">
            A common noun refers to general items (like "book", "city", "student"), while a proper noun refers to specific names like "Harry Potter", "London", "John". Common nouns are not capitalized unless they start a sentence, but proper nouns are always capitalized.
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircle size={20} className="text-purple-600" />
          <div>
            <h2 className="text-xl font-semibold">Your Asked Question</h2>
            <p className="text-sm text-gray-500">All of your asked Question goes here</p>
          </div>
        </div>
        <button className="text-sm bg-gray-100 text-gray-700 px-4 py-1 rounded-full">
          2 doubts
        </button>
      </div>
      <div className="border border-gray-200 rounded-xl p-4 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MessageCircle size={16} />
            <p>You Asked</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
              Pending
            </span>
            <p className="text-xs text-gray-400">Jul 15, 10:30 AM</p>
          </div>
        </div>
        <p className="text-gray-800 text-sm">
          What is the difference between common noun and proper noun? Can you provide some examples?
        </p>
        <div className="flex items-center text-sm text-gray-500 space-x-2 pl-1">
          <span className="animate-pulse"><CiTimer /></span>
          <p>Waiting for tutor response...</p>
        </div>
      </div>
    </div>
  );
}
