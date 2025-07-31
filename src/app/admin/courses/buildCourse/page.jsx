'use client';
import React, { useState } from 'react';
import CourseInfo from '@/components/admin/courseInfo';
import { FaTimes } from 'react-icons/fa';
import TagsSelector from '@/components/admin/tagsSelector';

const LessonForm = ({ onClose }) => {
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonType, setLessonType] = useState('video');

  return (
    <div className="bg-white rounded-xl shadow-md w-full p-6 sm:p-8 space-y-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Add Lesson</h3>
        <button
          onClick={onClose}
          className="text-white bg-black rounded-full p-2 hover:bg-gray-800 transition"
        >
          <FaTimes size={16} />
        </button>
      </div>

      <div className="flex items-center border border-gray-300 rounded-lg p-3">
        <svg className="w-6 h-6 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
        </svg>
        <input
          type="text"
          placeholder="Noun, Pronoun Difference"
          className="flex-grow outline-none text-lg text-gray-800 placeholder-gray-400"
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center text-gray-700">
        <span className="font-medium">Lesson Type:</span>
        {['Video', 'Article', "MCQ'S", 'PDF'].map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="lessonType"
              value={type.toLowerCase().replace(/'/g, '').replace(/\s/g, '')}
              checked={lessonType === type.toLowerCase().replace(/'/g, '').replace(/\s/g, '')}
              onChange={(e) => setLessonType(e.target.value)}
              className="h-4 w-4 accent-[#7D287E]"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {lessonType === 'video' && (
          <div className="col-span-1 border border-gray-300 rounded-xl p-6 text-center space-y-4">
            <p className="font-semibold text-gray-700">Videos</p>
            <div className="bg-[#F2F2F2] flex justify-between px-4 py-2 rounded-lg">
             <label className="bg-[#7D287E] text-white px-4 py-2 rounded hover:bg-purple-800 cursor-pointer">
            Upload
            <input type="file" accept="video/*" className="hidden" />
            </label>

              <button className="text-[#7D287E] hover:underline">Link</button>
            </div>
            <div className="border border-dashed border-gray-300 rounded-lg w-full h-32 flex flex-col items-center justify-center text-gray-500">
              <p>Upload PDF Notes</p>
              <p className="text-sm">PDF Files up to 10MB</p>
            </div>
          </div>
        )}

        {lessonType === 'pdf' && (
          <div className="col-span-1 border border-dashed border-gray-300 rounded-xl p-6 text-center space-y-4">
            <p className="font-semibold text-gray-700">PDF Notes</p>
            <div className="border border-dashed border-gray-300 rounded-lg w-full h-32 flex flex-col items-center justify-center text-gray-500">
              <label className="bg-[#7D287E] text-white px-4 py-2 rounded hover:bg-purple-800 cursor-pointer">
            Upload
            <input type="file" accept="pdf*" className="hidden" />
            </label>

              <p className="text-sm">PDF Files up to 10MB</p>
            </div>
          </div>
        )}

        {lessonType === 'mcqs' && (
          <div className="col-span-1 border border-dashed border-gray-300 rounded-xl p-6 text-center space-y-4">
            <p className="font-semibold text-gray-700">MCQ's</p>
            <button className="bg-[#7D287E] text-white px-4 py-2 rounded hover:bg-purple-800">Add New MCQ's</button>
            <div className="border border-dashed border-gray-300 rounded-lg w-full h-32 flex flex-col items-center justify-center text-gray-500">
              <p>Choose Excel or CSV File</p>
              <p className="text-sm">Excel or CSV File only</p>
            </div>
            <button className="bg-[#7D287E] text-white px-4 py-2 rounded hover:bg-purple-800">Upload & Import</button>
          </div>
        )}

        {lessonType === 'article' && (
          <div className="col-span-full">
            <p className="font-semibold text-gray-700 mb-2">Article</p>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 h-48 resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Write your article here..."
            />
          </div>
        )}
      </div>
    </div>
  );
};

const BuildCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [priceType, setPriceType] = useState('free');
  const [examCategory, setExamCategory] = useState('');
  const [tags, setTags] = useState('');
  const [showLessonForm, setShowLessonForm] = useState(false);

  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 space-y-6">
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

      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6 border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-gray-200">
          <h2 className="text-lg text-gray-800">Build Course</h2>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6">
          <span className="text-lg font-medium text-gray-700">Section 1 - Noun</span>
          <div className="flex gap-3">
            <button
              onClick={() => setShowLessonForm(true)}
              className="flex items-center px-4 py-2 bg-[#7D287E] text-white rounded-lg shadow hover:bg-purple-800 transition"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Lesson
            </button>

            <button className="p-2 text-gray-600 hover:text-[#7D287E] hover:bg-gray-100 rounded-lg transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>

            <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {showLessonForm && (
        <LessonForm onClose={() => setShowLessonForm(false)} />
      )}

      <TagsSelector tags={tags} setTags={setTags} />
    </div>
  );
};

export default BuildCourse;
