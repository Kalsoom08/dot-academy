'use client';

import { FiChevronDown, FiChevronUp, FiBook, FiClock, FiUsers, FiTag } from "react-icons/fi";
import { useState, useEffect } from "react";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchCourses } from "../../../../slices/courseSlice";
import DashboardCardSkeleton from "@/loaders/DashboardSkeleton";

const CourseCard = ({ course }) => {
  const router = useRouter();

  const formatPrice = (course) => {
    if (!course) return "Free";
    if (course.priceType === "free") return "Free";
    return `${course.currency || 'PKR'} ${course.price ? (course.price / 100).toLocaleString() : '0'}`;
  };

  const formatDuration = (duration) => duration || "Self-paced";

  if (!course) return null;

  const handleClick = () => {
    if (course.priceType === "premium") {
      router.push("/AuthComponents/pricingPlan");
    } else {
      router.push(`/course/${course._id}`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl cursor-pointer overflow-hidden group border border-gray-200"
      style={{ width: '100%', minWidth: '280px', maxWidth: '320px', height: '420px' }}
      onClick={handleClick}
    >
      {course.image ? (
        <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={course.image}
            alt={course.name || "Course image"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute top-3 left-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                course.priceType === "premium"
                  ? "bg-[#661f69] text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {course.priceType === "premium" ? "PREMIUM" : "FREE"}
            </motion.div>
          </div>
          {course.examCategory && (
            <div className="absolute top-3 right-3">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-bold shadow-lg"
              >
                {course.examCategory}
              </motion.div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 w-full p-4 text-white">
            <h3 className="font-bold text-lg leading-tight line-clamp-2">
              {course.name || "Untitled Course"}
            </h3>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-48 bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden rounded-t-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <FiBook className="w-7 h-7 text-white" />
          </div>
        </div>
      )}

      <div className="p-5 space-y-3">
        <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
          {course.description || "No description available"}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FiClock className="w-4 h-4" />
            <span>{formatDuration(course.duration)}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiUsers className="w-4 h-4" />
            <span>{course.students || 0} students</span>
          </div>
        </div>
        {course.tags && course.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            <FiTag className="w-3 h-3 text-gray-400" />
            {course.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                {typeof tag === 'object' ? tag.name : tag}
              </span>
            ))}
            {course.tags.length > 2 && (
              <span className="text-gray-400 text-xs">
                +{course.tags.length - 2} more
              </span>
            )}
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className={`text-lg font-bold ${course.priceType === "premium" ? "text-[#661f69]" : "text-green-600"}`}>
            {formatPrice(course)}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => { e.stopPropagation(); handleClick(); }}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-colors ${
              course.priceType === "premium"
                ? "bg-[#661f69] text-white hover:bg-[#7b297a]"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {course.priceType === "premium" ? "Enroll Now" : "Start Learning"}
          </motion.button>
        </div>
      </div>
      <div className={`absolute top-2 right-2 w-3.5 h-3.5 rounded-full ${course.status === "published" ? "bg-green-500" : "bg-yellow-500"}`} />
    </motion.div>
  );
};

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState("All Courses");
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => { dispatch(fetchCourses()); }, [dispatch]);

  const tabs = ["All Courses", "FCS", "Premium", "Published", "Math", "Science", "English"];
  const filteredCourses =
    activeTab === "All Courses"
      ? courses
      : courses.filter(course => {
          if (activeTab === "Premium") return course.priceType === "premium";
          if (activeTab === "Published") return course.status === "published";
          if (activeTab === "FCS") return course.examCategory === "FCS";
          return course.tags?.some(tag =>
            typeof tag === 'object' ? tag.name === activeTab : tag === activeTab
          ) || course.name?.toLowerCase().includes(activeTab.toLowerCase());
        });

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const visibleCourses = isExpanded ? filteredCourses : filteredCourses.slice(0, 6);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const cardVariants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } } };

  return (
    <motion.section className="px-6 py-16 max-w-7xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}>
      <motion.div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8"
        initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {/* <div className="w-12 h-12 bg-gradient-to-br from-[#661f69] to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <FiBook className="w-6 h-6 text-white" />
            </div> */}
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
               Courses
              </h2>
              <p className="text-gray-600 mt-2">Master new skills with our expert-led courses</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-wrap gap-3 mb-12">
        {tabs.map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setIsExpanded(false); }}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${
              activeTab === tab ? "bg-[#661f69] text-white shadow-lg border-transparent" : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200 hover:border-[#661f69] shadow-md hover:shadow-lg"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Array.from({ length: 6 }).map((_, index) => (<DashboardCardSkeleton key={index} />))}
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><span className="text-2xl">⚠️</span></div>
            <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to load courses</h3>
            <p className="text-red-600 text-sm">{String(error)}</p>
          </div>
        </div>
      ) : (
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" variants={containerVariants} initial="hidden" animate="visible" key={activeTab}>
          <AnimatePresence mode="popLayout">
            {visibleCourses.map(course => (
              <motion.div key={course._id} variants={cardVariants} initial="hidden" animate="visible" exit="hidden">
                <CourseCard course={course} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {!loading && filteredCourses.length > 6 && (
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleExpand}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#661f69] text-white rounded-xl font-semibold shadow-lg shadow-[#661f69]/25 hover:shadow-xl hover:shadow-[#661f69]/40 transition-all duration-300 group"
          >
         {isExpanded ? (
  <>Show Less <FiChevronUp className="w-5 h-5 group-hover:scale-110 transition-transform" /></>
) : (
  <>View More Courses <FiChevronDown className="w-5 h-5 group-hover:scale-110 transition-transform" /></>
)}

          </motion.button>
        </div>
      )}
    </motion.section>
  );
}
