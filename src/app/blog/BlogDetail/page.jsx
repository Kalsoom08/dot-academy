'use client';

import { motion } from 'framer-motion';
import DropDown from "@/sections/BlogPost/dropdown";
import Card from "@/sections/BlogPost/card";
import MCQs from "@/sections/BlogPost/mcqs";

const page = () => {
  return (
    <div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <DropDown />
      </motion.div>
      <motion.div
        className="grid grid-cols-[75%_25%] px-8 gap-6 justify-between"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      >
        <Card />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
      >
        <MCQs />
      </motion.div>
    </div>
  );
};

export default page;
