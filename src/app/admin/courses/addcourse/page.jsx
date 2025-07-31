'use client'
import React, { useState } from 'react';
import { HiOutlineBookOpen } from "react-icons/hi";
import CourseInfo from '@/components/admin/courseInfo';
import { FaTimes } from 'react-icons/fa';
import TagsSelector from '@/components/admin/tagsSelector';

const AddCourseForm = () => {
  const [courseName, setCourseName] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [priceType, setPriceType] = useState('free');
  const [examCategory, setExamCategory] = useState('');
  const [tags, setTags] = useState('');
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [sectionTitle, setSectionTitle] = useState('');

  const handleCreateSection = () => setShowSectionModal(true);
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

      <CourseInfo
        courseName={courseName}
        setCourseName={setCourseName}
        coursePrice={coursePrice}
        setCoursePrice={setCoursePrice}
        priceType={priceType}
        setPriceType={setPriceType}
        examCategory={examCategory}
        setExamCategory={setExamCategory}
      />

      <div className="bg-white rounded-xl shadow-lg p-6 relative"> 
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg text-gray-800">Build Course</h2>
          <button
            onClick={handleCreateSection}
            className="flex items-center bg-[#7D287E] hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-lg shadow-md"
          >
            Create Section
          </button>
        </div>

    
        {showSectionModal && (
          <div className="absolute top-0 left-0 w-full h-full flex items-start justify-center pt-20 z-10"> 
            <div className="bg-white rounded-xl shadow-2xl p-6 w-11/12 md:w-1/2 lg:w-2/3"> 
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Section Title*</h3>
                <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                 <FaTimes/>
                </button>
              </div>
              <input
                type="text"
                placeholder="Enter Section Title"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-[#7D287E]"
              />
              <div className="flex justify-center">
                <button
                  onClick={handleAddSection}
                  className="bg-[#7D287E] hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-lg shadow-md"
                >
                  Add Section
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
          <HiOutlineBookOpen size={50} />
          <p className="text-[#282828] mb-4">No section added yet</p>
          <p className="text-[#A3A3A3] text-sm mb-6">
            Start building your Course by adding your first section
          </p>
          <button
            onClick={handleCreateSection}
            className="flex items-center bg-[#7D287E] hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-lg shadow-md"
          >
            Create Section
          </button>
        </div>
      </div>

      <TagsSelector tags={tags} setTags={setTags} />
    </div>
  );
};

export default AddCourseForm;