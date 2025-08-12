'use client';

import React from 'react';
import Pic from '../../../public/Posts/post.png';
import PostCard from './PostCard';
import { motion } from 'framer-motion';

function App() {
  const posts = Array.from({ length: 12 }).map((_, index) => ({
    id: index,
    date: '21 Jun 2025',
    views: '29K Views',
    title: 'Class 10 Maths MCQs with Answers (PDF Download)',
    description: 'You can find CBSE Class 10 Maths MCQ in PDF format here.',
    imageUrl: Pic,
  }));

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
 
<header className="flex flex-col items-center justify-center py-8">
  <h1 className="text-3xl sm:text-4xl text-[#282828] anton mb-6">
    Blog Post
  </h1>

  <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-2xl">
   
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search"
        className="w-full pl-4 pr-16 py-3 bg-[#F2F2F2] rounded-full shadow-sm"
      />
      <button
        className="absolute right-1 top-1 bottom-1 bg-[#282828] text-white px-4 rounded-full hover:opacity-90 transition"
      >
        Go
      </button>
    </div>

  
    <select className="w-full sm:w-auto bg-[#E6E6E6] rounded-full px-3 py-2 shadow-sm">
      <option defaultValue>Sort</option>
      <option>Sort by - All</option>
      <option>Latest</option>
      <option>Popular</option>
    </select>
  </div>
</header>



      <section className="mt-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-2xl text-[#282828] anton mb-6">Recent posts</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={cardVariants}>
              <PostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

export default App;
