'use client'
import React from 'react';

const CourseInfo = ({
  courseName,
  setCourseName,
  coursePrice,
  setCoursePrice,
  priceType,
  setPriceType,
  examCategory,
  setExamCategory,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-lg text-gray-800 mb-4">Course Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
        <div>
          <label htmlFor="courseName" className="block text-gray-700 text-sm font-medium mb-2">
            Course Name*
          </label>
          <input
            type="text"
            id="courseName"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>

    
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="coursePrice" className="text-gray-700 text-sm font-medium mb-2">
              Price*
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="free"
                  checked={priceType === 'free'}
                  onChange={(e) => setPriceType(e.target.value)}
                  className="form-radio h-4 w-4 text-purple-600"
                />
                <span className="ml-1 text-sm text-gray-700">Free</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="premium"
                  checked={priceType === 'premium'}
                  onChange={(e) => setPriceType(e.target.value)}
                  className="form-radio h-4 w-4 text-purple-600"
                />
                <span className="ml-1 text-sm text-gray-700">Premium</span>
              </label>
            </div>
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-500">
            <span className="px-3 py-2 bg-gray-50 text-gray-600 rounded-l-lg">PKR</span>
            <input
              type="text"
              className="flex-grow px-4 py-2 rounded-r-lg focus:outline-none"
              placeholder="1200"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="examCategory" className="block text-gray-700 text-sm font-medium mb-2">
            Select Exam Category*
          </label>
          <select
            id="examCategory"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            value={examCategory}
            onChange={(e) => setExamCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
