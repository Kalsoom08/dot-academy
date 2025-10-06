'use client';
import { useState, useEffect } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import api from "@/../../APIs/api";
import { useSearchParams } from "next/navigation";

const CourseDoubts = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const courseId = searchParams.get("course");

  const ratingLabels = ["Very Bad", "Bad", "Average", "Good", "Excellent"];

 
  const fetchMyReviews = async () => {
    try {
      setLoading(true);
      const res = await api.get("user/api/review/my");
      setMyReviews(res.data.reviews || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyReviews();
  }, []);

  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSendReview = async () => {
    if (!rating || !feedback.trim()) {
      alert("Please provide both rating and feedback");
      return;
    }

    try {
      const res = await api.post("user/api/review", {
        rating,
        comment: feedback,
        // if you want course-specific reviews, also pass courseId here
      });
      setFeedback("");
      setRating(0);
      // refresh list
      fetchMyReviews();
      alert("Review submitted successfully!");
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Failed to submit review. Try again.");
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-white py-2 gap-6 flex-col px-4 rounded-lg text-center shadow-md lg:flex block">
      <div className="flex justify-end">
        <FaTimes className="cursor-pointer" onClick={handleClose} />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Rate This Course</h2>
        <p className="text-sm text-gray-600 mb-4">
          Your feedback will help us improve
        </p>
      </div>

      {/* Rating stars */}
      <div className="flex justify-center mb-2">
        {[1, 2, 3, 4, 5].map((starValue, index) => (
          <span
            key={starValue}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleRatingClick(starValue)}
          >
            <IoStar
              className={`text-[22px] ${
                starValue <= rating ? "text-purple-700" : "text-gray-300"
              }`}
            />
            <p className="text-[10px] text-gray-600 ml-2">
              {ratingLabels[index]}
            </p>
          </span>
        ))}
      </div>

      {/* Input field */}
      <div className="flex justify-between items-center bg-gray-100 px-2 py-2">
        <input
          type="text"
          className="outline-none w-full sm:w-3/4 px-2 py-1"
          placeholder="Tell us how we can improve"
          value={feedback}
          onChange={handleFeedbackChange}
        />
        <FaPaperPlane
          className="text-gray-400 cursor-pointer ml-2"
          onClick={handleSendReview}
        />
      </div>

      {/* My Reviews */}
      <div className="mt-6 text-left">
        <h3 className="font-semibold mb-2">My Reviews</h3>
        {loading && <p className="text-gray-500">Loading...</p>}
        {!loading && myReviews.length === 0 && (
          <p className="text-gray-500">No reviews yet.</p>
        )}
        {!loading &&
          myReviews.map((rev) => (
            <div
              key={rev._id}
              className="border-b py-2 flex flex-col gap-1 text-sm"
            >
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <IoStar
                    key={i}
                    className={`${
                      i < rev.rating ? "text-purple-700" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700">{rev.comment}</p>
              <p className="text-xs text-gray-400">
                {new Date(rev.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CourseDoubts;
