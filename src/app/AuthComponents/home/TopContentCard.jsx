'use client';

import Image from 'next/image';
import Pic from '../../../../public/dashboard/write.png';
import { motion } from 'framer-motion';

const TopContentCard = () => {
  const cardData = [
    {
      title: "Listening Practice Test - 1",
      views: "1.8k views",
      image: Pic
    },
    {
      title: "Listening Practice Test - 2",
      views: "2.3k views",
      image: Pic
    },
    {
      title: "Listening Practice Test - 3",
      views: "2.1k views",
      image: Pic
    },
    {
      title: "Listening Practice Test - 4",
      views: "2.7k views",
      image: Pic
    }
  ];

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="text-lg font-semibold mb-4">Top Content This Week</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="flex gap-4 border rounded-lg p-3 hover:shadow-md transition border-gray-300"
          >
            <Image
              src={card.image}
              alt={card.title}
              className="w-36 h-24 object-cover rounded"
            />
            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium">{card.title}</p>
              <p className="text-xs text-gray-500">{card.views}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopContentCard;
