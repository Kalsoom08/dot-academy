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

  const handleCreateSection = () => {
    console.log('Create Section clicked!');
  };

  return (
    <div className="w-full max-w-7xl space-y-6">
     
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Add Course</h1>

    
     <div className="bg-white rounded-xl shadow-lg p-6">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">Course Information</h2>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

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
          Course Price*
        </label>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="free"
              name="priceType"
              value="free"
              checked={priceType === 'free'}
              onChange={(e) => setPriceType(e.target.value)}
              className="form-radio h-4 w-4 text-purple-600"
            />
            <label htmlFor="free" className="ml-1 text-gray-700 text-sm">Free</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="premium"
              name="priceType"
              value="premium"
              checked={priceType === 'premium'}
              onChange={(e) => setPriceType(e.target.value)}
              className="form-radio h-4 w-4 text-purple-600"
            />
            <label htmlFor="premium" className="ml-1 text-gray-700 text-sm">Premium</label>
          </div>
        </div>
      </div>

      <div className="flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-purple-500">
        <span className="px-3 py-2 bg-gray-50 text-gray-600 rounded-l-lg border-r border-gray-300">PKR</span>
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
          <h2 className="text-lg font-semibold text-gray-800">Build Course</h2>
          <button
            onClick={handleCreateSection}
            className="flex items-center bg-purple-700 hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
          >
            
            Create Section
          </button>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
         <HiOutlineBookOpen size={50}/>
          <p className="text-gray-600 mb-4">No section added yet</p>
          <p className="text-gray-500 text-sm mb-6">
            Start building your Course by adding your first section
          </p>
          <button
            onClick={handleCreateSection}
            className="flex items-center bg-purple-700 hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
          >
            
            Create Section
          </button>
        </div>
      </div>

   
      <div className=" rounded-xl  p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Tags</h2>
        <div>
          <label htmlFor="tags" className="sr-only"><FaPlus/> Select Tags</label> 
          <select
            id="tags"
            className="w-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none pr-8"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          >
            
            <option value="">Select Tags</option>
            <option value="tag1">Tag 1</option>
            <option value="tag2">Tag 2</option>
            <option value="tag3">Tag 3</option>
          </select>
        </div>
      </div>
    </div>
  );
};


export default AddCourseForm