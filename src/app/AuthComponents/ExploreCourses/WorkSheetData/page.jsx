'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UpNext from '../UpNext';
import SideShow from '../SideShow';

const worksheetData = [
  {
    id: 1,
    question: 'Pick out the nouns in the following sentences and classify them.',
    options: [
      'MT. Everest is the highest peak in the world',
      'There are fifty student in our class',
      'The bible is a sacred book for the Christians',
      'Beauty is a rare quality',
      'Prevention is better than cure',
    ],
    correctAnswer: 'The bible is a sacred book for the Christians',
    information:
      'The green box means your answer is correct, and the red box means your answer is incorrect.',
  },
  {
    id: 2,
    question: 'Pick out the nouns in the following sentences and classify them.',
    options: [
      'MT. Everest is the highest peak in the world',
      'There are fifty student in our class',
      'The bible is a sacred book for the Christians',
      'Beauty is a rare quality',
      'Prevention is better than cure',
    ],
    correctAnswer: 'Prevention is better than cure',
  },
  {
    id: 3,
    question: 'Pick out the nouns in the following sentences and classify them.',
    options: [
      'MT. Everest is the highest peak in the world',
      'The bible is a sacred book for the Christians',
      'Beauty is a rare quality',
      'Prevention is better than cure',
      'There are fifty student in our class',
    ],
    correctAnswer: 'There are fifty student in our class',
  },
  {
    id: 4,
    question: 'Pick out the nouns in the following sentences and classify them.',
    options: [
      'MT. Everest is the highest peak in the world',
      'The bible is a sacred book for the Christians',
      'There are fifty student in our class',
      'Prevention is better than cure',
    ],
    correctAnswer: 'There are fifty student in our class',
  },
  {
    id: 5,
    question: "State whether the underlined nouns are countable (C) or uncountable (U).",
    problem: [
      {
        statment: "The children are playing in the park",
        answers: ["Countable", "Uncountable", "Both"],
        correctAnswer: "Countable",
        information: 'The green box means your answer is correct, and the red box means your answer is incorrect.',
      },
      {
        statment: "The bottle is in the cupboard",
        answers: ["Countable", "Uncountable", "Both"],
        correctAnswer: "Countable",
      },
      {
        statment: "I'm drinking milk",
        answers: ["Countable", "Uncountable", "Both"],
        correctAnswer: "Countable",
      },
      {
        statment: "I put too much oil in the dish",
        answers: ["Countable", "Uncountable", "Both"],
        correctAnswer: "Both",
      },
      {
        statment: "Could you give me some glue, please",
        answers: ["Countable", "Uncountable", "Both"],
        correctAnswer: "Uncountable",
      },
      {
        statment: "I'm drinking milk",
        answers: ["Countable", "Uncountable", "Both"],
        correctAnswer: "Both",
      },
    ],
  },
   {
    id: 6,
    question: 'Everyone appreciated the ______ of the idea. (novel)',
    options: ['Novelty', 'Novel-ing', 'Novelist'],
    correctAnswer: 'Novelty',
    information: 'The green circle means your answer is correct, and the red circle means your answer is incorrect.',
  },
  {
    id: 7,
    question: 'Everyone appreciated the ______ of the idea. (novel)',
    options: ['Novelty', 'Novel-ing', 'Novelist'],
    correctAnswer: 'Novelty',
  },
];

const WorkSheetData = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleSelect = (questionKey, selectedOption) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionKey]: selectedOption }));
  };
   
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <motion.section 
      className="lg:px-6 py-4 grid lg:grid-cols-[70%_30%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="lg:px-6 px-2"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-bold text-[22px] mb-4">Worksheet: Noun & it's classification</h1>
        <div className="flex flex-col gap-6 py-10">
          {worksheetData.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="flex flex-col gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <h2 className="font-semibold">Q{item.id}: {item.question}</h2>

              {item.options && (
                <div className="flex flex-col gap-2">
                  {item.options.map((option, idx) => {
                    const isSelected = selectedAnswers[item.id] === option;
                    const isCorrect = option === item.correctAnswer;

                    return (
                      <motion.div
                        key={idx}
                        onClick={() => handleSelect(item.id, option)}
                        className="flex items-center gap-3 cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div
                          className="w-5 h-5 border border-gray-400 rounded-sm flex items-center justify-center text-white text-[12px]"
                          style={{
                            backgroundColor: isSelected
                              ? isCorrect
                                ? '#155724'
                                : '#D96060'
                              : 'white',
                            color: isSelected ? 'white' : 'black',
                            borderColor: isSelected ? 'transparent' : '#ccc',
                          }}
                        >
                          {isSelected && (isCorrect ? '✓' : '✕')}
                        </div>
                        <p
                          style={{
                            color: isSelected ? (isCorrect ? '#155724' : '#D96060') : 'black',
                          }}
                        >
                          {option}
                        </p>
                      </motion.div>
                    );
                  })}
                  {item.information && (
                    <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-600 italic mt-1 flex items-center gap-1 flex-wrap">
                        The green box
                        <span className="w-2 h-2 bg-[#155724] rounded-full inline-block"></span>
                        means your answer is correct, and the red box
                        <span className="w-2 h-2 bg-[#D96060] rounded-full inline-block"></span>
                        means your answer is incorrect
                    </p>
                  )}
                </div>
              )}

              {item.problem && (
                <div className="flex flex-col gap-6">
                  {item.problem.map((subItem, idx) => {
                    const key = `q${item.id}_${idx}`;
                    return (
                      <motion.div 
                        key={idx} 
                        className="flex flex-col gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                      >
                        <p className="font-medium">{idx + 1}. {subItem.statment}</p>
                        <div className="flex flex-col gap-4 flex-wrap">
                          {subItem.answers.map((answer, aIdx) => {
                            const isSelected = selectedAnswers[key] === answer;
                            const isCorrect = answer === subItem.correctAnswer;

                            return (
                              <motion.div
                                key={aIdx}
                                onClick={() => handleSelect(key, answer)}
                                className="flex items-center gap-2 cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div
                                  className="w-4 h-4 rounded-full border border-gray-400"
                                  style={{
                                    backgroundColor: isSelected
                                      ? isCorrect
                                        ? '#155724'
                                        : '#D96060'
                                      : 'white',
                                    borderColor: isSelected ? 'transparent' : '#ccc',
                                  }}
                                ></div>
                                <p
                                  style={{
                                    color: isSelected
                                      ? isCorrect
                                        ? '#155724'
                                        : '#D96060'
                                      : 'black',
                                  }}
                                >
                                  {answer}
                                </p>
                              </motion.div>
                            );
                          })}
                        </div>
                        {subItem.information && (
                          <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-600 italic mt-1 flex items-center gap-1 flex-wrap">
                            The green box
                            <span className="w-2 h-2 bg-[#155724] rounded-full inline-block"></span>
                            means your answer is correct, and the red box
                            <span className="w-2 h-2 bg-[#D96060] rounded-full inline-block"></span>
                            means your answer is incorrect
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        <motion.div 
          className='flex flex-col'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <p className='italic text-gray-600'>ECADEMY DOT is your go-to online learning platform designed to help you learn something valuable every day. Whether you're a student, a professional, or just curious.</p>
            <p className='italic text-gray-600'> With flexible and affordable subscription plans, you get unlimited access to all learning materials anytime, anywhere. Start learning with ECADEMY DOT and turn your goals into achievements!</p>
            <motion.button 
              className='bg-[#282828] shadow-md px-6 py-2 text-white rounded-md my-4 m-auto cursor-pointer'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Plan
            </motion.button>
        </motion.div>
        
        <UpNext />
      </motion.div>
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <SideShow />
      </motion.div>
    </motion.section>
  );
};

export default WorkSheetData;
