'use client'
import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { HiOutlineBookOpen } from "react-icons/hi";

const AddCourseForm = () => {
  const [courseName, setCourseName] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [priceType, setPriceType] = useState('free'); 
  const [examCategory, setExamCategory] = useState('');
  const [tags, setTags] = useState('');
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [sectionTitle, setSectionTitle] = useState('');

  const handleCreateSection = () => {
    setShowSectionModal(true);
  };

  const handleCloseModal = () => {
    setShowSectionModal(false);
    setSectionTitle('');
  };

  const handleAddSection = () => {
    console.log('Section Title:', sectionTitle);
    handleCloseModal();
  };

  return (
    <div className="w-full space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add Course</h1>

  
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
                    id="free"
                    name="priceType"
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
                    id="premium"
                    name="priceType"
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
                id="coursePrice"
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

    
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-gray-800">Build Course</h2>
          <button
            onClick={handleCreateSection}
            className="flex items-center bg-[#7D287E] hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
          >
            Create Section
          </button>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
          <HiOutlineBookOpen size={50} />
          <p className="text-[#282828] mb-4">No section added yet</p>
          <p className="text-[#A3A3A3] text-sm mb-6">
            Start building your Course by adding your first section
          </p>
          <button
            onClick={handleCreateSection}
            className="flex items-center bg-[#7D287E] hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
          >
            Create Section
          </button>
        </div>
      </div>

      {/* Tags Section */}
      <div className="rounded-xl p-6 w-sm">
        <h2 className="text-lg text-[#282828] mb-4">Tags</h2>
        <select
          id="examTags"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        >
          <option value="">Select</option>
          <option value="tag1">tag 1</option>
          <option value="tag2">tag 2</option>
          <option value="tag3">tag 3</option>
        </select>
      </div>

     
      {showSectionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Section Title*</h3>
            <input
              type="text"
              placeholder="Enter Section Title"
              value={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleAddSection}
              className="bg-[#7D287E] hover:bg-purple-800 text-white w-full py-2 rounded-lg"
            >
              Add Section
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCourseForm;
