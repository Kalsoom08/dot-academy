'use client';
import React, { useLayoutEffect, useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { FaPlayCircle, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import courseVideoThumbnail from '../../../../../public/Courses/courseVideo.png';
import UpNext from '../UpNext';
import SideShow from '../SideShow';
import CourseReview from '../CourseReview';
import LoadingSpinner from '@/components/loadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonContent } from '../../../../../slices/courseSlice';
import { useSearchParams, useRouter } from 'next/navigation';

function CourseVideoClient() {
  const [isClient, setIsClient] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const courseId  = searchParams?.get('course')  || null;
  const sectionId = searchParams?.get('section') || null;
  const lessonId  = searchParams?.get('lesson')  || null;

  const { currentLesson, loading, error } = useSelector((state) => state.courses);

  useLayoutEffect(() => setIsClient(true), []);

  useEffect(() => {
    if (courseId && lessonId) {
      dispatch(fetchLessonContent({ courseId, lessonId }));
    }
  }, [courseId, lessonId, dispatch]);

  const selectedVideo = useMemo(() => {
    if (!currentLesson) return null;
    const typeRaw = String(currentLesson.type || currentLesson.contentType || '').toLowerCase();
    if (!/video/.test(typeRaw)) return null;

    const videoUrl = currentLesson.videoUrl;
    const isValidVideoUrl =
      videoUrl &&
      typeof videoUrl === 'string' &&
      videoUrl.trim().length > 0 &&
      (videoUrl.startsWith('http') ||
        videoUrl.startsWith('/') ||
        videoUrl.startsWith('blob:'));

    if (!isValidVideoUrl) return null;

    return {
      title: currentLesson.title || 'Course Lesson',
      videoUrl: videoUrl.trim(),
      thumbnail: currentLesson.thumbnail || currentLesson.image || courseVideoThumbnail,
    };
  }, [currentLesson]);

  useEffect(() => {
    setIsVideoPlaying(false);
  }, [currentLesson?._id, currentLesson?.id]);

  const handleGoBack = () => {
    router.back();
  };

  const pageTitle = selectedVideo?.title || currentLesson?.title || 'Course Lesson';

  if (!isClient) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Loading lesson content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded m-6">
        <strong>Error loading lesson:</strong>{' '}
        {typeof error === 'string' ? error : error?.message || 'Failed to load lesson'}
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded m-6">
        <strong>Lesson not found</strong>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="lg:px-6 py-4 grid lg:grid-cols-[70%_30%]"
    >
      {/* Go Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-2 px-6 mb-4"
      >
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#6b21a8' }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGoBack}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <FaArrowLeft className="text-sm" />
          <span>Go Back</span>
        </motion.button>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto px-6 py-8 w-full"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold mb-2"
        >
          {pageTitle}
        </motion.h1>

        {!selectedVideo ? (
          <div className="w-full p-6 rounded-lg border border-red-300 bg-red-50 text-red-800 mb-6">
            🚫 No video URL found for this lesson.
          </div>
        ) : (
          <div className="relative mb-8">
            <AnimatePresence mode="wait">
              {isVideoPlaying ? (
                <motion.div
                  key="video"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <video
                    width="100%"
                    height="400"
                    controls
                    autoPlay
                    src={selectedVideo.videoUrl}
                    title={selectedVideo.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="thumbnail"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full relative rounded-lg overflow-hidden shadow-lg"
                >
                  <Image
                    src={selectedVideo.thumbnail}
                    alt="Video Thumbnail"
                    width={800}
                    height={400}
                    className="object-cover w-full h-full"
                    priority
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute inset-0 flex justify-center items-center cursor-pointer bg-black bg-opacity-30"
                    onClick={() => setIsVideoPlaying(true)}
                    aria-label="Play video"
                    role="button"
                  >
                    <FaPlayCircle size={70} className="text-white opacity-90 drop-shadow-lg" />
                  </motion.div>
                  <div className="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-3 py-1 rounded text-sm">
                    Click to play
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <UpNext />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col justify-between mb-24"
      >
        <SideShow />
        <CourseReview />
      </motion.div>
    </motion.section>
  );
}

export default CourseVideoClient;