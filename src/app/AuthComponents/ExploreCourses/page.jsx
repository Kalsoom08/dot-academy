'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import api from "../../../../APIs/api";
import { motion, AnimatePresence } from "framer-motion";
import Explore from "../ExploreCourses/explore";
import Footer from '../../../components/AuthFooter';
import QuizQuestionCard from '../../../components/Quiz/QuizQuestionCard';
import Courses from '../ExploreCourses/Courses';

export default function ExploreCoursesPage() {
  const [banner, setBanner] = useState(null);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const fetchHeaderBanner = async () => {
      try {
        const res = await api.get("/user/api/ads/course");
        if (res.data?.length > 0) {
          setBanner(res.data[0]);
        }
      } catch (err) {
        console.error("Course header ads fetch error:", err);
      }
    };
    fetchHeaderBanner();
  }, []);

  return (
    <div className="flex h-screen flex-col">
      {/* Banner Modal */}
      <AnimatePresence>
        {banner && showBanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px]"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative bg-white rounded-xl shadow-2xl w-[90%] max-w-md overflow-hidden"
            >
              {/* Close button */}
              <button
                onClick={() => setShowBanner(false)}
                className="absolute top-2 right-2 text-gray-600 font-bold text-2xl hover:text-gray-900"
              >
                &times;
              </button>

              {/* Banner Content */}
              <Image
                src={banner.fileUrl}
                alt={banner.title}
                width={500}
                height={280}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {banner.title}
                </h3>
                {banner.clickUrl && (
                  <a
                    href={banner.clickUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Learn more
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <main className="flex-1">
        <Courses />
        {/* <Explore /> */}
      </main>

 \
    </div>
  );
}
