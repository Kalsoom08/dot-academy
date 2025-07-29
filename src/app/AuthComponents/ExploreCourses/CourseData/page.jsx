'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import noun from '../../../../../public/Courses/noun.png';
import CommonProper from '../../../../../public/Courses/CommonProper.png';
import UpNext from '../UpNext';
import SideShow from '../SideShow';

const courseContents = [
  {
    title: 'What is Noun?',
    description: 'Definition and basic explanation of nouns with examples.',
    content: {
      heading: 'What is Noun?',
      body: 'A noun is a word that names a person, place, thing, or idea. It is one of the most important parts of speech in English because nouns help us talk about everything around us.',
      image: noun,
      examples: null,
    },
  },
  {
    title: '1. Common Noun and Proper Noun',
    description: 'Learn about general vs specific nouns and how to identify them.',
    content: {
      heading: '1. Common & Proper Noun',
      body: 'A common noun refers to a general, non-specific person, place, thing, or idea. Common nouns do not usually start with a capital letter unless they are at the beginning of a sentence.',
      image: CommonProper,
      examples: [
        { label: 'Person', items: 'Teacher, Student, Doctor' },
        { label: 'Place', items: 'City, Country, Park' },
        { label: 'Thing', items: 'Table, Car, Book' },
        { label: 'Idea', items: 'Love, Happiness, Courage' },
      ],
    },
  },
  {
    title: '2. Singular and Plural Noun',
    description: 'Explanation of number forms in nouns with transformation rules.',
    content: {
      heading: '2. Singular and Plural Nouns',
      body: 'A singular noun refers to one person, place, thing, or idea. A plural noun refers to more than one. Plural nouns are usually formed by adding -s or -es, but some are irregular.',
      image: CommonProper,
      examples: [
        { items: 'cat → cats' },
        { items: 'box → boxes' },
        { items: 'child → children' },
        { items: 'man → men' },
      ],
    },
  },
  {
    title: '3. Concrete and Abstract Noun',
    description: 'Learn the difference between nouns you can sense and those you can’t.',
    content: {
      heading: '3. Concrete and Abstract Noun',
      body: 'Concrete nouns can be experienced through the five senses, like apple or music. Abstract nouns are ideas or qualities like freedom or bravery that cannot be touched or seen.',
      image: null,
      examples: [
        { label: 'Concrete', items: 'Apple, Dog, Music' },
        { label: 'Abstract', items: 'Freedom, Love, Bravery' },
      ],
    },
  },
  {
    title: '4. Countable and Uncountable Noun',
    description: 'Understand which nouns can be counted and which cannot.',
    content: {
      heading: '4. Countable and Uncountable Noun',
      body: 'Countable nouns are things you can count (like chairs, pencils), while uncountable nouns are substances or concepts (like sugar, water) that you cannot count individually.',
      image: null,
      examples: [
        { label: 'Countable', items: 'Book, Apple, Pen' },
        { label: 'Uncountable', items: 'Milk, Air, Sugar' },
      ],
    },
  },
  {
    title: '5. Compound Noun',
    description: 'Learn about nouns made up of two or more words.',
    content: {
      heading: '5. Compound Noun',
      body: 'A compound noun is formed by combining two or more words to create a single noun. It can be written as one word, separate words, or hyphenated.',
      image: null,
      examples: [
        { items: 'Toothbrush, Sister-in-law, Bus stop' },
      ],
    },
  },
  {
    title: '6. Possessive Noun',
    description: 'Nouns that show ownership or possession.',
    content: {
      heading: '6. Possessive Noun',
      body: 'A possessive noun shows ownership or relationship. It is formed by adding an apostrophe + s (\'s) or just an apostrophe to a noun.',
      image: null,
      examples: [
        { items: "Sarah's book, boys' school" },
      ],
    },
  },
];

const CourseData = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const displayedContent =
    activeIndex === null
      ? [courseContents[0], courseContents[1]]
      : [courseContents[activeIndex]];
      const [selectedOption, setSelectedOption] = useState(null)
      const [showSolution, setShowSolution] = useState(false)

  const question = {
    text: 'Which of the following Example is Sigular and Common?',
    options: [
      { label: 'A', text: 'Girl', isCorrect: true },
      { label: 'B', text: 'Water', isCorrect: false },
      { label: 'C', text: 'Fire', isCorrect: false },
      { label: 'D', text: 'Colors', isCorrect: false }
    ]
  }

  const handleOptionClick = (index) => {
    setSelectedOption(index)
  }

  return (
    <section className='lg:px-6 py-4 grid lg:grid-cols-[70%_30%]'>
      <div className="mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-2">
          Noun & its classifications (part-1) - English Grammar
        </h1>
        <p className="text-lg mb-6">Table of Contents</p>
        <div className="bg-white rounded-lg shadow-sm divide-y divide-gray-200">
          {courseContents.map((item, index) => (
            <div key={index}>
              <div
                className="flex items-center justify-between my-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => setActiveIndex(index)}
              >
                <span className="text-[16px] text-gray-800">{item.title}</span>
                {activeIndex === index ? (
                  <FiChevronUp className="text-xl text-gray-500" />
                ) : (
                  <FiChevronDown className="text-xl text-gray-500" />
                )}
              </div>
              {activeIndex === index && (
                <div className="px-4 pb-4 text-sm text-gray-600">
                  {item.description}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="px-6 py-10 space-y-10">
          {displayedContent.map((section, index) => (
            <div key={index}>
              <h1 className="text-[30px] font-bold py-4">
                {section.content.heading}
              </h1>
              <p className="text-[17px] mb-6">{section.content.body}</p>
              {section.content.image && (
                <Image
                  src={section.content.image}
                  alt={section.title}
                  width={600}
                  height={400}
                  className="py-8"
                />
              )}
              {section.content.examples && (
                <>
                  <h1 className="text-[22px] font-bold">Example</h1>
                  <ul className="py-4 space-y-2">
                    {section.content.examples.map((example, idx) => (
                      <li key={idx} className="flex gap-2">
                        {example.label && (
                          <h1 className="font-bold text-[18px]">
                            {example.label}:
                          </h1>
                        )}
                        <p>{example.items}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col min-h-screen px-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <p className="mb-4 font-semibold">
          Try Yourself:
          <span className="font-normal ml-2">{question.text}</span>
        </p>

        <div className="flex flex-col gap-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(index)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-md text-left text-sm
                ${selectedOption === index ? 'bg-black text-white' : 'bg-white text-black border-gray-300'}
              `}
            >
              <span className="font-bold">{option.label}.</span> {option.text}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowSolution(true)}
          className="mt-6 w-full bg-[#222] text-white py-2 rounded-md hover:bg-[#111] transition duration-200"
        >
          View Solution
        </button>

        {showSolution && selectedOption !== null && (
          <div className="mt-4 text-sm">
            {question.options[selectedOption].isCorrect ? (
              <p className="text-green-600">Correct! {question.options[selectedOption].text} is the right answer.</p>
            ) : (
              <p className="text-red-600">Incorrect. The correct answer is <strong>Girl</strong>.</p>
            )}
          </div>
        )}
      </div>

      <div className="mt-10 text-center text-sm italic text-gray-600 max-w-sm">
        Are you planning to get high score in your exam<br />
        <span className="not-italic font-medium text-black">Ecademy</span> will help you to get high score in your exam
      </div>

      <button className="mt-6 bg-black text-white px-6 py-2 rounded-md hover:bg-[#111] transition duration-200 w-[40%] mx-6">
        View plan
      </button>
    </div>
      <UpNext />
      </div>
      <SideShow />
    </section>
  );
};

export default CourseData;
