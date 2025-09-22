'use client';
import React, { useLayoutEffect, useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { FaPlayCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import courseVideoThumbnail from '../../../../../public/Courses/courseVideo.png';
import UpNext from '../UpNext';
import SideShow from '../SideShow';
import CourseReview from '../CourseReview';

import LoadingSpinner from '@/components/loadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseDetails } from '../../../../../slices/courseSlice';
import { useSearchParams } from 'next/navigation';

function CourseVideo() {
  const [isClient, setIsClient] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const courseId  = searchParams?.get('course')  || null;
  const sectionId = searchParams?.get('section') || null;
  const lessonId  = searchParams?.get('lesson')  || null;

  const { currentCourse, loading, error } = useSelector((state) => state.courses);

  useLayoutEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (courseId) {
      const currentId = currentCourse?._id || currentCourse?.id || currentCourse?.courseId || null;
      if (!currentCourse || String(currentId) !== String(courseId)) {
        dispatch(fetchCourseDetails(courseId));
      }
    }
  }, [courseId, currentCourse, dispatch]);

  // Find lesson by section + lesson
  const selectedLesson = useMemo(() => {
    if (!currentCourse || !lessonId) return null;

    if (sectionId && Array.isArray(currentCourse.sections)) {
      const sec = currentCourse.sections.find(s => String(s._id || s.id) === String(sectionId));
      const les = sec?.lessons?.find(l => String(l._id || l.id) === String(lessonId));
      return les || null;
    }

    const les = (currentCourse.lessons || []).find(l => String(l._id || l.id) === String(lessonId));
    return les || null;
  }, [currentCourse, sectionId, lessonId]);

  const selectedVideo = useMemo(() => {
    if (!selectedLesson) return null;
    const typeRaw = String(selectedLesson.type || selectedLesson.contentType || '').toLowerCase();
    if (!/video/.test(typeRaw)) return null;

    // Try common fields
    const candidates = [
      selectedLesson.videoUrl,
      selectedLesson.url,
      selectedLesson.source,
      selectedLesson.fileUrl,
      selectedLesson.mediaUrl,
      selectedLesson.file?.url,
      selectedLesson.asset?.url,
      selectedLesson.media?.src,
      Array.isArray(selectedLesson.sources) ? selectedLesson.sources[0]?.url : null,
    ].filter(Boolean);

    const videoUrl = candidates.find(Boolean) || '';

    return {
      title: selectedLesson.title || selectedLesson.name || 'Course Lesson',
      videoUrl,
      thumbnail: selectedLesson.thumbnail || selectedLesson.image || courseVideoThumbnail
    };
  }, [selectedLesson]);

  useEffect(() => setIsVideoPlaying(false), [selectedLesson?._id, selectedLesson?.id]);

  const pageTitle = selectedVideo?.title || 'Course Lesson';

  if (!isClient) return null;

  const isBusy = loading || (!currentCourse && !!courseId) || (!selectedLesson && !error);

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
        className='mx-auto px-6 py-8 w-full'
      >
        {isBusy && (
          <div className="flex justify-center items-center py-10">
            <LoadingSpinner />
          </div>
        )}
        {!isBusy && error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {typeof error === 'string' ? error : (error?.message || 'Failed to load course')}
          </div>
        )}

        {!isBusy && (
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl font-bold mb-2"
          >
            {pageTitle}
          </motion.h1>
        )}

        {!isBusy && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg mb-6"
          >
            Table of Contents
          </motion.p>
        )}

        {!isBusy && selectedLesson && (
          <>
            {!selectedVideo?.videoUrl ? (
              <div className="w-full p-4 rounded border border-yellow-300 bg-yellow-50 text-yellow-800">
                No video file is attached to this lesson. Please attach a video (e.g. set
                <code className="px-1">videoUrl</code> /
                <code className="px-1">fileUrl</code> /
                <code className="px-1">asset.url</code>) on this lesson.
              </div>
            ) : (
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
                      src={selectedVideo.videoUrl}
                      title={selectedVideo.title}
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
                        src={selectedVideo.thumbnail}
                        alt="Video Thumbnail"
                        className="object-cover w-full h-full"
                      />
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute top-0 left-0 w-full h-full flex justify-center items-center cursor-pointer"
                        onClick={() => setIsVideoPlaying(true)}
                        aria-label="Play video"
                        role="button"
                      >
                        <FaPlayCircle size={50} className="text-white opacity-75" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </>
        )}

        {!isBusy && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <UpNext />
          </motion.div>
        )}
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