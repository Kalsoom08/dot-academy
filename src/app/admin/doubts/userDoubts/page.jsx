"use client";
import React, { useState } from 'react';
import { LuMessageCircle } from "react-icons/lu";
import { IoIosTimer, IoMdSettings } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { PiSortDescendingBold } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";

const UserDoubts = () => {
  const totals = [
    { title: "Total Doubts", icon: <LuMessageCircle className='text-[#7D287E]' />, value: 14 },
    { title: "Pending", icon: <IoIosTimer className='text-[#FFBD00]' />, value: 4 },
    { title: "In Progress", icon: <IoMdSettings className='text-[#ED9DA0]' />, value: 2 },
    { title: "Answered", icon: <FaCheck className='text-[#FFBD00]' />, value: 8 }
  ];

  const initialDoubts = [
    {
      id: 1, name: "Ahmed", email: "Ahmed@gmail.com",
      topic: "English Grammar Fundamentals", subTopic: "Noun",
      message: "I'm confused about the difference between proper nouns and common nouns. Can you explain with examples?",
      date: "Jan 15, 2024, 02:30 AM", status: "Pending", showReply: false, replyText: ""
    },
    {
      id: 2, name: "Bilal", email: "bilal@gmail.com",
      topic: "English Grammar Fundamentals", subTopic: "Verb",
      message: "What are action verbs vs linking verbs?",
      date: "Jan 16, 2024, 03:00 PM", status: "Pending", showReply: false, replyText: ""
    },
    {
      id: 3, name: "Zara", email: "zara@gmail.com",
      topic: "English Grammar Fundamentals", subTopic: "Adjectives",
      message: "How do I identify comparative adjectives?",
      date: "Jan 17, 2024, 11:45 AM", status: "Pending", showReply: false, replyText: ""
    }
  ];

  const [doubts, setDoubts] = useState(initialDoubts);
  const [searchText, setSearchText] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  const handleReplyClick = (id) => {
    setDoubts(doubts.map(d => d.id === id ? { ...d, showReply: true } : d));
  };

  const handleReplyChange = (id, value) => {
    setDoubts(doubts.map(d => d.id === id ? { ...d, replyText: value } : d));
  };

  const handleSendReply = (id) => {
    setDoubts(doubts.map(d =>
      d.id === id
        ? { ...d, status: 'Answered', showReply: false, replyText: '' }
        : d
    ));
  };

  const handleSortToggle = () => {
    setSortAsc(!sortAsc);
  };

  const filteredAndSortedDoubts = doubts
    .filter(d =>
      d.name.toLowerCase().includes(searchText.toLowerCase()) ||
      d.email.toLowerCase().includes(searchText.toLowerCase()) ||
      d.message.toLowerCase().includes(searchText.toLowerCase()) ||
      d.topic.toLowerCase().includes(searchText.toLowerCase()) ||
      d.subTopic.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortAsc) return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });

  return (
    <section className='p-4 sm:p-6 md:p-8'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6'>
        <h1 className='text-2xl font-semibold'>Doubts</h1>
        <button className='bg-[#7D287E] text-white px-4 py-2 rounded-md mt-3 sm:mt-0 w-fit'>Save Changes</button>
      </div>

      <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 py-2'>
        {totals.map((item, index) => (
          <div key={index} className='flex flex-col rounded-md border border-gray-300 px-4 py-2'>
            <div className='flex justify-between items-center py-2'>
              <p className='text-[12px] text-gray-600'>{item.title}</p>
              <span className='text-[25px]'>{item.icon}</span>
            </div>
            <h1 className='text-[20px]'>{item.value}</h1>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-[90%_5%] items-center lg:gap-8 md:gap-8 gap-4 py-8'>
        <div className='flex justify-between bg-gray-200 px-4 py-2 items-center rounded-full'>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='outline-none bg-transparent w-full'
            placeholder='Search'
          />
          <CiSearch size={20} />
        </div>
        <button onClick={handleSortToggle} className=' text-gray-600 hover:text-[#7D287E] cursor-pointer'>
          <PiSortDescendingBold size={26} />
        </button>
      </div>

      <div className='space-y-6'>
        {filteredAndSortedDoubts.map((doubt) => (
          <div key={doubt.id} className='bg-white rounded-xl border border-gray-200 p-4 space-y-2 shadow-sm'>
            <div className='flex justify-between items-start'>
              <div className='flex gap-2 items-start'>
                <div className='w-10 h-10 bg-[#7D287E] text-white rounded-full flex items-center justify-center font-bold'>
                  {doubt.name.charAt(0)}
                </div>
                <div>
                  <h2 className='font-medium'>{doubt.name}</h2>
                  <p className='text-sm text-gray-500'>{doubt.email}</p>
                </div>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                doubt.status === 'Pending' ? 'bg-yellow-100 text-[#FFBD00]' :
                doubt.status === 'Answered' ? 'bg-green-100 text-[#155724]' : ''
              }`}>
                {doubt.status}
              </span>
            </div>

            <div className='text-sm py-4'>
              <span className='text-gray-600 text-[12px] py-2'>{doubt.topic}</span>
              <span className='text-[#7D287E] ml-1 font-medium text-[12px]'>• {doubt.subTopic}</span>
            </div>

            <p className='text-sm text-gray-800 py-2'>{doubt.message}</p>

            {/* Reply section */}
            {doubt.status === 'Pending' && (
              <>
                {!doubt.showReply && (
                  <div className='flex gap-2 mt-2 py-2'>
                    <button
                      onClick={() => handleReplyClick(doubt.id)}
                      className='text-sm text-gray-600 flex items-center gap-1 border border-gray-300 rounded-md px-3 py-1'
                    >
                      → Reply
                    </button>
                  </div>
                )}

                {doubt.showReply && (
                  <div className="relative mt-2">
                    <input
                      value={doubt.replyText}
                      onChange={(e) => handleReplyChange(doubt.id, e.target.value)}
                      className="w-full pl-4 pr-10 py-2 text-sm rounded-md bg-gray-100 placeholder:text-gray-500 outline-none border-none"
                      placeholder="Type your reply..."
                    />
                    <button
                      onClick={() => handleSendReply(doubt.id)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7D287E]"
                    >
                      <IoIosSend size={20} />
                    </button>
                  </div>
                )}
              </>
            )}

            {doubt.status === 'Answered' && (
              <input
                disabled
                placeholder="Hey, here the explanation..."
                className='w-full px-4 py-2 text-sm rounded-md bg-gray-100 placeholder:text-gray-400'
              />
            )}

            <div className='text-xs text-gray-400 mt-2 flex items-center gap-2'>
              <IoIosTimer size={22} />
              {doubt.date}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserDoubts;
