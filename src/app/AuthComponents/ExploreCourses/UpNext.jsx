'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { FiChevronRight, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaFileDownload } from 'react-icons/fa';
import { BsTags } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourses } from '../../../../slices/courseSlice';
import fallbackImg from '../../../../public/Courses/4.png';

const faqData = [
  { question: '1. What is a noun and why is it important in English grammar?', answer: 'A noun is a word used to identify people, places, things, or ideas in a sentence.' },
  { question: '2. What is a Difference between common & proper Noun?', answer: 'Common nouns refer to general items, while proper nouns name specific ones like John or London.' },
  { question: '3. How do singular noun differ from plural noun?', answer: 'A singular noun refers to one person, place, or thing, while a plural noun refers to more than one.\nExample: cat (singular), cats (plural).' },
  { question: '4. What is a Difference between common & proper Noun?', answer: 'Common nouns refer to general items, while proper nouns name specific ones like John or London.' },
];

const defaultUpNext = [
  { id: 'fallback-1', image: fallbackImg, title: 'Sample course A', weight: 'Docs | 5 Pages', isFree: true },
  { id: 'fallback-2', image: fallbackImg, title: 'Sample course B', weight: 'Docs | 3 Pages', isFree: false },
];

function UpNext({ currentCourseId }) {
  const [openIndex, setOpenIndex] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  // your slice shape: { courses, loading, error, ... }
  const { courses = [], loading } = useSelector((s) => s.courses);

  // Ensure we have enough data to pick “next two”
  useEffect(() => {
    if (!courses || courses.length < 3) {
      dispatch(fetchCourses({ page: 1, limit: 12, sort: 'newest' }));
    }
  }, [dispatch, courses?.length]);

  // Compute the two right after the opened one (wrap-around)
  const upNext = useMemo(() => {
    if (!Array.isArray(courses) || courses.length === 0) return defaultUpNext;

    const idx = courses.findIndex((c) => c?._id === currentCourseId);

    // not found? just first two
    if (idx === -1) {
      const firstTwo = courses.slice(0, 2);
      if (firstTwo.length < 2) return defaultUpNext;
      return firstTwo.map(toCardData);
    }

    // next two indices with wrap
    const idx1 = (idx + 1) % courses.length;
    const idx2 = (idx + 2) % courses.length;

    const picked = [courses[idx1], courses[idx2]]
      .filter(Boolean)
      .filter((c) => c?._id !== currentCourseId);

    if (picked.length < 2) {
      // top up (rare)
      const extras = courses.filter((c) => c?._id !== currentCourseId);
      while (picked.length < 2 && extras.length) {
        const cand = extras.shift();
        if (cand && !picked.some((p) => p?._id === cand?._id)) picked.push(cand);
      }
    }

    return picked.length >= 2 ? picked.slice(0, 2).map(toCardData) : defaultUpNext;
  }, [courses, currentCourseId]);

  const handleUpNextClick = (id, isFree) => {
    if (!id) return;
    
    if (isFree) {
      // Redirect free courses to detail page
      router.push(`/AuthComponents/ExploreCourses/CourseDetail/${id}`);
    } else {
      // Redirect premium courses to pricing plan
      router.push('/AuthComponents/pricingPlan');
    }
  };

  const handlePricingPlanClick = () => {
    router.push('/AuthComponents/pricingPlan');
  };

  const toggleAnswer = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  // Optional skeleton when nothing yet
  if (loading && courses.length === 0) {
    return (
      <div className="py-16 bg-white text-[#282828] font-sans">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6" />
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4 items-center border p-2 rounded-md mb-4">
              <div className="w-[60px] h-[60px] bg-gray-200 rounded-md" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white text-[#282828] font-sans">
      <div className="py-8">
        <h1 className="font-bold text-[22px] my-6">Up Next</h1>

        <div className="flex flex-col gap-4">
          {upNext.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 items-center border p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => handleUpNextClick(item.id, item.isFree)}
            >
              <Image
                src={item.image || fallbackImg}
                alt={item.title}
                width={60}
                height={60}
                className="w-[60px] h-[60px] object-cover rounded-md"
              />
              <div className="flex justify-between w-full items-center">
                <div className="flex-1">
                  <h2 className="text-sm sm:text-base font-medium">{item.title}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.isFree ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {item.isFree ? 'Free' : 'Premium'}
                    </span>
                    {item.weight && <p className="text-xs text-gray-500">{item.weight}</p>}
                  </div>
                </div>
                <FiChevronRight className="text-gray-500 text-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <h2 className="text-[22px] font-bold text-[#282828] mb-2">Other Option</h2>
      <div className="flex gap-6 items-center mb-8 text-sm text-[#c51691] font-semibold">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={handlePricingPlanClick}
        >
          <BsTags />
          <span>View pricing Plan</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <FaFileDownload />
          <span>Download this PDF</span>
        </div>
      </div>

      <h1 className="text-[28px] md:text-[32px] font-bold leading-snug mb-8">
        FAQ&apos;s on noun and it&apos;s <br />
        classifications (part-1) English <br />
        Grammer
      </h1>

      <div className="flex flex-col gap-4">
        {faqData.map((item, index) => (
          <div key={index} className="border rounded-md overflow-hidden">
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left bg-white transition-all"
            >
              <span className="font-medium">{item.question}</span>
              {openIndex === index ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 bg-[#f9f9f9] text-sm text-gray-700 whitespace-pre-line">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UpNext;

// ---------- helpers ----------
function toCardData(c) {
  const isFree = (c?.priceType || '').toLowerCase() === 'free';
  
  return {
    id: c?._id || '',
    image: c?.image || c?.thumbnail || fallbackImg,
    title: c?.name || c?.title || 'Untitled Course',
    isFree: isFree,
    // optional small caption; keep generic so it doesn't break if pages missing
    weight: smallCaption(c),
  };
}

function smallCaption(c) {
  // Prefer pages if present, else duration/level, else blank
  if (c?.pages) return `Docs | ${c.pages} Pages`;
  if (c?.duration) return `Duration | ${c.duration}`;
  if (c?.level) return `Level | ${c.level}`;
  return '';
}