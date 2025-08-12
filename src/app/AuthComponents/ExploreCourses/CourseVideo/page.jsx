'use client';
import React, { useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { FaPlayCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import courseVideoThumbnail from '../../../../../public/Courses/courseVideo.png';
import UpNext from '../UpNext';
import SideShow from '../SideShow';
import CourseReview from '../CourseReview';

function CourseVideo() {
  const [isClient, setIsClient] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useLayoutEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className='lg:px-6 py-4 grid lg:grid-cols-[70%_30%]'
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='mx-auto px-6 py-8'
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold mb-2"
        >
          Noun & its classifications (part-1) - English Grammar
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg mb-6"
        >
          Table of Contents
        </motion.p>
        
        <div className="relative">
          <AnimatePresence mode="wait">
            {isVideoPlaying ? (
              <motion.video
                key="video"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                width="100%"
                height="400"
                controls
                src="https://www.w3schools.com/html/mov_bbb.mp4" 
                title="Course Video"
              />
            ) : (
              <motion.div
                key="thumbnail"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full relative"
              >
                <Image
                  src={courseVideoThumbnail}
                  alt="Video Thumbnail"
                  className="object-cover w-full h-full"
                />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer"
                  onClick={handlePlayVideo}
                >
                  <FaPlayCircle size={50} className="text-white opacity-75" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <UpNext />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col justify-between mb-24'
      >
        <SideShow />
        <CourseReview />
      </motion.div>
    </motion.section>
  );
}

export default CourseVideo;
