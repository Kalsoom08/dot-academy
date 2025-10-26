"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../../../../slices/courseSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiChevronDown, FiChevronUp, FiStar } from "react-icons/fi";

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

 
  const premiumCourses = (courses || []).filter(
    (course) => course.priceType === "premium"
  );
  const visibleCourses = isExpanded ? premiumCourses : premiumCourses.slice(0, 4);

  const toggleCourseView = () => {
    setIsExpanded(!isExpanded);
    document.getElementById("pkg-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleBuyNow = (course) => {
    const queryParams = new URLSearchParams({
      courseId: course._id,
      courseName: course.name || "Premium Course",
    }).toString();
    router.push(`/AuthComponents/pricingPlan?${queryParams}`);
  };

  return (
    <div
      id="pkg-section"
      className="bg-gradient-to-b from-[#faf5fa] via-white to-[#faf5fa] rounded-3xl p-6 sm:p-10 mx-4 sm:mx-8 mt-10 shadow-xl border border-gray-100"
    >
      <ToastContainer position="top-right" autoClose={2000} />

     
      <div className="text-center sm:text-left mb-10">
        <h2 className="text-xl font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-2">
          <FiStar className="text-[#661f69]" />
          Premium Courses
        </h2>
        <p className="text-gray-500 text-sm mt-2">
          Elevate your learning with exclusive, high-quality content
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading premium courses...</p>
      ) : premiumCourses.length === 0 ? (
        <p className="text-center text-gray-500">No premium courses available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {visibleCourses.map((course) => (
            <div
              key={course._id}
              className="group relative bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col"
            >
              <div className="relative w-full h-40 overflow-hidden">
                {course.image ? (
                  <Image
                    src={course.image}
                    alt={course.name || "Course"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                    No Image
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-[#661f69] to-[#8b3b8d] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  PREMIUM
                </div>
              </div>

     
              <div className="flex flex-col flex-grow p-5">
                <h3 className="font-semibold text-gray-900 text-base mb-2 line-clamp-2">
                  {course.name || "Untitled Course"}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-3 mb-5">
                  {course.description || "No description available"}
                </p>

          
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-lg font-bold text-[#661f69]">
                    {course.currency || "PKR"}{" "}
                    {course.price ? (course.price / 100).toLocaleString() : "0"}
                  </span>
                  <button
                    onClick={() => handleBuyNow(course)}
                    className="px-5 py-2 bg-gradient-to-r from-[#661f69] to-[#8b3b8d] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all shadow-md"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

     
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#661f69]/20 via-[#8b3b8d]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          ))}
        </div>
      )}

 
      {premiumCourses.length > 4 && (
        <div className="text-center mt-12">
          <button
            onClick={toggleCourseView}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#661f69] to-[#8b3b8d] text-white text-sm rounded-full hover:shadow-lg transition-all"
          >
            {isExpanded ? (
              <>
                View Less <FiChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View More <FiChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PkgCard;
