'use client';
import React, { useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import { FaPlayCircle } from 'react-icons/fa';
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
    <section className='lg:px-6 py-4 grid lg:grid-cols-[70%_30%]'>
      <div className='mx-auto px-6 py-8'>
        <h1 className="text-2xl font-bold mb-2">
          Noun & its classifications (part-1) - English Grammar
        </h1>
        <p className="text-lg mb-6">Table of Contents</p>
        
        <div className="relative">
          {isVideoPlaying ? (
            <video
              width="100%"
              height="400"
              controls
              src="https://www.w3schools.com/html/mov_bbb.mp4" 
              title="Course Video"
            />
          ) : (
            <div className="w-full h-full relative">
              <Image
                src={courseVideoThumbnail}
                alt="Video Thumbnail"
                className="object-cover w-full h-full"
              />
              <div
                className="absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer"
                onClick={handlePlayVideo}
              >
                <FaPlayCircle size={50} className="text-white opacity-75" />
              </div>
            </div>
          )}
        </div>

        <UpNext />
      </div>
      <div className='flex flex-col justify-between mb-24'>
        <SideShow />
        <CourseReview />
      </div>
    </section>
  );
}

export default CourseVideo;
