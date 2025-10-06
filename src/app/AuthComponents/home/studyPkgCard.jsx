"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, enrollInCourse } from "../../../../slices/courseSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const PkgCard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { courses, loading, error } = useSelector((state) => state.courses);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === "string" ? error : error.message || "Failed to load courses"
      );
    }
  }, [error]);

  const toggleCourseView = () => {
    setIsExpanded(!isExpanded);
    document.getElementById("pkg-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const visibleCourses = isExpanded ? courses : courses?.slice(0, 4) || [];

  const handleBuyNow = async (courseId) => {
   router.push(`/AuthComponents/pricingPlan`)
  };

  const handleExplore = (courseId) => {
    router.push(`/AuthComponents/ExploreCourses/CourseDetail/${courseId}`);
  };

  return (
    <div
      id="pkg-section"
      className="bg-white rounded-xl p-4 sm:p-6 mx-4 sm:mx-8 mt-10 shadow-md"
    >
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="w-full mb-6 text-center sm:text-left">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          Your Courses
        </h2>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading courses...</p>
      ) : courses.length === 0 ? (
        <p className="text-center text-gray-500">No courses available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 transition-all duration-500">
          {visibleCourses.map((course) => (
            <div
              key={course._id}
              className="border border-gray-200 rounded-lg p-4 flex flex-col h-full shadow-md bg-white hover:shadow-lg transition"
            >
              <div className="w-full h-32 flex items-center justify-center mb-4">
                {course.image ? (
                  <Image
                    src={course.image}
                    alt={course.name || "Course"}
                    width={150}
                    height={150}
                    className="object-contain w-auto h-full rounded-md"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm rounded-md">
                    No Image
                  </div>
                )}
              </div>

              <div className="text-sm font-semibold text-center sm:text-left mb-4 text-gray-800">
                {course.name || "Untitled Course"}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-auto">
                <button
                  onClick={() => handleBuyNow(course._id)}
                  className="w-full sm:w-1/2 px-4 py-2 text-sm font-medium bg-[#661f69] text-white rounded hover:bg-purple-700 transition"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => handleExplore(course._id)}
                  className="w-full sm:w-1/2 px-4 py-2 text-sm font-medium border border-[#661f69] text-[#661f69] rounded hover:bg-gray-100 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {courses.length > 4 && (
        <div className="text-center mt-6">
          <button
            onClick={toggleCourseView}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D6D6D6] text-sm rounded-full hover:bg-gray-300 transition"
          >
            {isExpanded ? (
              <>
                View Less <FiChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View More Courses <FiChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PkgCard;
