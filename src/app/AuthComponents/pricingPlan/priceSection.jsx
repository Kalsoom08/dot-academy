'use client';

import Head from 'next/head';
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { Anton } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const anton = Anton({ subsets: ['latin'], weight: '400' });

const PackageCard = ({
  duration,
  validity,
  originalPrice,
  currentPrice,
  saveText,
  bestValue,
  isSelected,
  onSelect,
  index
}) => {
  return (
    <motion.div
      className={`relative p-1 rounded-xl border-2 cursor-pointer transition duration-200 ease-in-out
        ${isSelected ? 'border-[#7D287E] bg-purple-50' : 'border-[#a558a671] hover:border-gray-300'}
      `}
      onClick={onSelect}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {bestValue && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="absolute -top-3 left-4 bg-yellow-400 text-[#7D287E] text-xs font-semibold px-3 py-1 rounded-full uppercase shadow"
        >
          Best Value
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4
              ${isSelected ? 'bg-[#7D287E] border-[#7D287E]' : 'bg-white border-[#7D287E]'}
            `}
          >
            {isSelected && <FaCheckCircle className="text-white text-base" />}
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">For {duration}</p>
            <p className="text-sm text-gray-500">Valid Till {validity}</p>
          </div>
        </div>

        <div className="text-right">
          {originalPrice && (
            <p className="text-sm text-gray-400 line-through">Rs. {originalPrice}</p>
          )}
          <p className="text-xl font-bold text-[#7D287E]">Rs. {currentPrice}</p>
          {saveText && (
            <p className="text-xs text-blue-500 mt-1">{saveText}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState('6_month');

  const packages = [
    {
      id: '1_month',
      duration: '1 month',
      validity: 'August 10, 2025',
      originalPrice: 1816,
      currentPrice: 500,
      saveText: null,
    },
    {
      id: '3_month',
      duration: '3 Month',
      validity: 'October 10, 2025',
      originalPrice: 2044,
      currentPrice: 680,
      saveText: 'Save 80% Monthly',
    },
    {
      id: '6_month',
      duration: '6 Month',
      validity: 'January 10, 2025',
      originalPrice: 3407,
      currentPrice: 1135,
      saveText: 'Save 66% Monthly',
      bestValue: true,
    },
    {
      id: '1_year',
      duration: '1 Year',
      validity: 'January 10, 2025',
      originalPrice: 3407,
      currentPrice: 1135,
      saveText: 'Save 66% Monthly',
    },
  ];

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Head>
        <title>Ecademy Infinity Package</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.main
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 12 }}
      >
        <motion.h1
          className={`${anton.className} text-center text-2xl md:text-3xl font-bold text-[#7D287E] mb-2`}
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Ecademy Infinity Package for IELTS
        </motion.h1>
        <motion.p
          className="text-center text-gray-600 mb-8"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Including 20+ courses
        </motion.p>

        <div className="space-y-4">
          <AnimatePresence>
            {packages.map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                {...pkg}
                index={index}
                isSelected={selectedPackage === pkg.id}
                onSelect={() => setSelectedPackage(pkg.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#7D287E] hover:bg-purple-800 text-white font-bold py-3 px-4 rounded-full text-lg transition duration-300 ease-in-out"
            onClick={() =>
              router.push('/AuthComponents/pricingPlan/paymentMethod')
            }
          >
            Buy Now
          </motion.button>
        </motion.div>
      </motion.main>
    </motion.div>
  );
}
