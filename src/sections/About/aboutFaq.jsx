'use client';

import { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';


export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "What we offer?",
      answer: "Our services include photography, video editing, and picture editing. We also offer models. Visit our services page for more."
    },
    {
      question: "Our Price",
      answer: "Please contact us for a customized quote based on your specific needs."
    },
    {
      question: "How to Contact us?",
      answer: "You can reach us via email at contact@example.com or call us at (123) 456-7890."
    },
    {
      question: "How to visit our portfolio?",
      answer: "Check out our portfolio section on our website or visit our social media pages."
    }
  ];

  return (
    <div className="flex flex-col items-center px-4 sm:px-6 md:px-10 lg:px-20 py-12 w-full">
      <div className="w-full max-w-2xl">
        <h1 className='anton text-2xl sm:text-3xl md:text-4xl  text-center text-gray-800 mb-10'>
          FAQ's
        </h1>
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-xl overflow-hidden ">
              <button
                className={`w-full px-4 sm:px-6 py-4 text-left flex justify-between items-center transition-colors duration-200 `}
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-base sm:text-lg font-semibold text-gray-800">{item.question}</span>
                <motion.div
                  key={activeIndex === index ? 'minus' : 'plus'}
                  initial={{ rotate: 0, opacity: 0 }}
                  animate={{ rotate: 180, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                {activeIndex === index ? (
                  <FaMinus className="text-gray-500 w-5 h-5" />
                ) : (
                  <FaPlus className="text-gray-500 w-5 h-5" />
                )}
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
              {activeIndex === index && (
                    <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                <div className="px-4 sm:px-6 py-4 bg-white ">
                  <p className="text-sm sm:text-base text-gray-600">{item.answer}</p>
                </div>
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
