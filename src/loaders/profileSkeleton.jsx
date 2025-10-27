'use client';
import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ width = '100%', height = '20px', className = 'rounded-md', style }) => {
  return (
    <motion.div
      className={`bg-gray-200 animate-pulse ${className}`}
      style={{ width, height, ...style }}
      initial={{ opacity: 0.6 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
    />
  );
};

export default Skeleton;
