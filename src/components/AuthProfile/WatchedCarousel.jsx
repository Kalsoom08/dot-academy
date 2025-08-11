"use client";
import { useRef, useState } from "react";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";


const thumbnails = [
  {
    id: 1,
    title: "Learn HTML Basics",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "/profile/video.jpg",
  },
  {
    id: 2,
    title: "How to start MDCAT Exam?",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "/profile/video.jpg",
  },
  {
    id: 3,
    title: "Start CSS in 10 Minutes",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "/profile/video.jpg",
  },
  {
    id: 4,
    title: "How to start MD Exam?",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "/profile/video.jpg",
  },
  {
    id: 5,
    title: "Extra Lecture",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "/profile/video.jpg",
  },
  {
    id: 6,
    title: "Advanced Topic",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    poster: "/profile/video.jpg",
  },
];

export default function WatchedCarousel() {
  const scrollContainerRef = useRef(null);
  const [progressMap, setProgressMap] = useState({});
  const [isPlaying, setIsPlaying] = useState({});
  const videoRefs = useRef([]);

  const scrollByAmount = 300;

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({
      left: -scrollByAmount,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({
      left: scrollByAmount,
      behavior: "smooth",
    });
  };

  const handleTimeUpdate = (id, current, duration) => {
    const progress = (current / duration) * 100;
    setProgressMap((prev) => ({ ...prev, [id]: progress }));
  };

  const handlePlay = (id) => {
    setIsPlaying((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="py-6 relative">
      <h2 className="text-xl font-semibold mb-4">Your Watched</h2>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-[50%] -translate-y-1/2 z-10 bg-white p-2 shadow rounded-full"
      >
        <FaAngleLeft />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-[50%] -translate-y-1/2 z-10 bg-white p-2 shadow rounded-full"
      >
        <FaAngleRight />
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth  px-12 pb-4"
      >
        {thumbnails.map((video) => (
          <div key={video.id} className="w-64 flex-shrink-0">
            <div className="relative mb-2">
              <video
                ref={(el) => (videoRefs.current[video.id] = el)}
                src={video.video}
                poster={video.poster}
                width={256}
                height={144}
                className="rounded-lg"
                controls
                muted
                onTimeUpdate={(e) =>
                  handleTimeUpdate(
                    video.id,
                    e.currentTarget.currentTime,
                    e.currentTarget.duration
                  )
                }
                onPlay={() => handlePlay(video.id)}
              />
              <div className="relative mt-2 h-8 rounded-full overflow-hidden border border-gray-300 shadow-sm">
                <div
                  className="absolute top-0 left-0 w-full h-full bg-repeat-x bg-[length:40px_100%]"
                  style={{
                    backgroundImage: `url("/profile/video.jpg")`,
                  }}
                />
                <div
                  className="absolute top-0 h-full w-[2px] bg-white z-20"
                  style={{
                    left: `calc(${progressMap[video.id] || 0}% - 1px)`,
                    transition: isPlaying[video.id] ? "left 0.1s linear" : "none",
                  }}
                />
              </div>
            </div>
            <p className="text-sm font-medium mt-4">{video.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
