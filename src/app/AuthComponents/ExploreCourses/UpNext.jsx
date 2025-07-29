'use client'
import React, { useState } from 'react'
import { FaFileDownload } from 'react-icons/fa'
import { BsTags } from 'react-icons/bs'
import { FiChevronDown, FiChevronUp, FiChevronRight } from 'react-icons/fi'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import course from '../../../../public/Courses/4.png'

const faqData = [
  {
    question: '1. What is a noun and why is it important in English grammar?',
    answer: 'A noun is a word used to identify people, places, things, or ideas in a sentence.',
  },
  {
    question: '2. What is a Difference between common & proper Noun?',
    answer: 'Common nouns refer to general items, while proper nouns name specific ones like John or London.',
  },
  {
    question: '3. How do singular noun differ from plural noun?',
    answer:
      'A singular noun refers to one person, place, or thing, while a plural noun refers to more than one.\nExample: cat (singular), cats (plural).',
  },
  {
    question: '4. What is a Difference between common & proper Noun?',
    answer:
      'Common nouns refer to general items, while proper nouns name specific ones like John or London.',
  },
];
const upNext = [
  { id: 'noun-classification-part2', image: course, title: "Noun & its Classifications (Part-2) - English Grammar", weight: 'Docs | 5 Pages' },
  { id: 'noun-worksheet', image: course, title: "Worksheet: Noun & its classification", weight: 'Docs | 3 Pages' },
];


function UpNext() {
  const [openIndex, setOpenIndex] = useState(null)
  const router = useRouter(); 

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleUpNextItemClick = (itemId) => {
    router.push(`/AuthComponents/ExploreCourses/WorkSheetData`); }

  return (
    <>
      <div className=" py-16 bg-white text-[#282828] font-sans">
        <div className='py-8'>
          <h1 className='font-bold text-[22px] my-6'>Up Next</h1>
          <div className='flex flex-col gap-4'>
            {upNext.map((item, index) => (
              <div
                key={item.id || index} 
                className='flex gap-4 items-center border p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors' 
                onClick={() => handleUpNextItemClick(item.id)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  className='w-[60px] h-[60px] object-cover rounded-md'
                />
                <div className='flex justify-between w-full items-center'>
                  <div>
                    <h1 className='text-sm sm:text-base font-medium'>{item.title}</h1>
                    <p className='text-xs text-gray-500'>{item.weight}</p>
                  </div>
                  <FiChevronRight className='text-gray-500 text-lg' />
                </div>
              </div>
            ))}
          </div>
        </div>
        <h2 className="text-[22px] font-bold text-[#282828] mb-2">Other Option</h2>
        <div className="flex gap-6 items-center mb-8 text-sm text-[#c51691] font-semibold">
          <div className="flex items-center gap-2 cursor-pointer">
            <BsTags />
            <span>View pricing Plan</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <FaFileDownload />
            <span>Download this PDF</span>
          </div>
        </div>

        <h1 className="text-[28px] md:text-[32px] font-bold leading-snug mb-8">
          FAQ's on noun and it's <br />
          classifications (part-1) English <br />
          Grammer
        </h1>

        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => (
            <div key={index} className="border rounded-md overflow-hidden">
              <button
                onClick={() => toggleAnswer(index)}
                className="w-full flex justify-between items-center px-4 py-3 text-left bg-white transition-all"
              >
                <span className="font-medium">{item.question}</span>
                {openIndex === index ? (
                  <FiChevronUp size={20} />
                ) : (
                  <FiChevronDown size={20} />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 bg-[#f9f9f9] text-sm text-gray-700 whitespace-pre-line">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default UpNext