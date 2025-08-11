import { useState } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { IoStar } from "react-icons/io5";

const CourseReview = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isVisible, setIsVisible] = useState(true);  

  const ratingLabels = ["Very Bad", "Bad", "Average", "Good", "Excellent"];

  const handleRatingClick = (ratingValue) => {
    setRating(ratingValue);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleClose = () => {
    setIsVisible(false);  
  };

  const handleSendReview = () => {
    alert(`Review sent: ${feedback}`);
  };

  if (!isVisible) {
    return null; 
  }

  return (
    <div className="bg-white py-2 gap-6 flex-col px-4 rounded-lg text-center shadow-md rounded-md lg:flex block">
      <div className="flex justify-end">
        <FaTimes
          className="cursor-pointer"
          onClick={handleClose}
        />
      </div>

      <div className="">
        <h2 className="text-2xl font-semibold mb-2">Rate This Course</h2>
        <p className="text-sm text-gray-600 mb-4">Your Feedback will help us to improve</p>
      </div>

      <div className="flex justify-center mb-2">
        {[1, 2, 3, 4, 5].map((starValue, index) => (
          <span
            key={starValue}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleRatingClick(starValue)}
          >
            <IoStar
              className={`text-[22px] ${starValue <= rating ? "text-purple-700" : "text-gray-300"}`}
            />
            <p className="text-[10px] text-gray-600 ml-2">{ratingLabels[index]}</p>
          </span>
        ))}
      </div>

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
    </div>
  );
};

export default CourseReview;
