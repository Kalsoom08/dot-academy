import React, { useState } from 'react';
import Pic from '../../../public/Posts/post.png';
import PostCard from '../../sections/BlogPost/PostCard';
import { useRouter } from 'next/router';

function App() {
  const posts = Array.from({ length: 12 }).map((_, index) => ({
    id: index,
    date: '21 Jun 2025',
    views: '29K Views',
    title: 'Class 10 Maths MCQs with Answers (PDF Download)',
    description: 'You can find CBSE Class 10 Maths MCQ in PDF format here.',
    imageUrl: Pic,
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
 
      <header className="flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl sm:text-4xl text-[#282828] anton mb-6">
          Blog Post
        </h1>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full max-w-2xl">
          <div className="relative w-full sm:w-3/4">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-4 p-4 py-3 bg-[#F2F2F2] rounded-full shadow-sm"
            />
          </div>
          <div className="flex w-full sm:w-1/4 space-x-2">
            <button className="w-1/2 lg:relative right-26 bg-[#282828] text-white py-2 px-6 rounded-full shadow-sm">
              Go
            </button>
            <select className="w-full bg-[#E6E6E6] rounded-full px-2 py-2 shadow-sm">
            <option selected>Sort</option>
              <option>Sort by - All</option>
              <option>Latest</option>
              <option>Popular</option>
            </select>
          </div>
        </div>
      </header>

    
      <section className="mt-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-2xl text-[#282828] anton mb-6">Recent posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" >
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;