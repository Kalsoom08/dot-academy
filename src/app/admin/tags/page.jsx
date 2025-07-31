'use client';
import React, { useState } from 'react';
import { FiEdit, FiPlus, FiTrash2 } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';

const Tags = () => {
  const [tags, setTags] = useState(['MDCAT', 'MDCAT', 'MDCAT', 'MDCAT', 'MDCAT', 'MDCAT']);
  const [showTagModal, setShowTagModal] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => setShowTagModal(true);
  const handleCloseModal = () => {
    setNewTag('');
    setShowTagModal(false);
  };
  const handleSaveTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
      setShowTagModal(false);
    }
  };
  const handleEditTag = () => alert('Edited');
  const handleDeleteTag = () => alert('Deleted');

  return (
    <div className="font-sans px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto rounded-lg relative">
      
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Tags</h1>
        <button
          className="bg-[#7D287E] hover:bg-purple-900 text-white font-semibold py-2 px-4 sm:px-5 rounded-md flex items-center justify-center transition duration-200 ease-in-out w-full sm:w-auto"
          onClick={handleAddTag}
        >
          <FiPlus className="mr-2 text-lg sm:text-xl" /> Add Tags
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {tags.map((tag, index) => (
          <div key={index} className="flex flex-col justify-between sm:flex-row sm:items-center py-3 border-b border-[#A3A3A3] gap-3">
            <div className='flex justify-center items-center'>
            <div className="w-8 h-8 flex justify-center items-center rounded-full text-[#7D287E] font-bold">
              {index + 1}
            </div>
            <div className="flex-grow text-sm sm:text-lg text-gray-700">{tag}</div>
            </div>

            <div className="flex gap-2 sm:gap-3">
              <button
                className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition"
                onClick={() => handleEditTag(index)}
              >
                <FiEdit className="text-xl text-[#7D287E]" />
              </button>
              <button
                className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition"
                onClick={() => handleDeleteTag(index)}
              >
                <FiTrash2 className="text-xl text-[#7D287E]" />
              </button>
            </div>
          </div>
        ))}
      </div>


      {showTagModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add Tag</h3>
              <button onClick={handleCloseModal} className="text-white bg-black rounded-full p-1">
                <FaTimes size={10} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter Tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-[#7D287E]"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSaveTag}
                className="bg-[#7D287E] hover:bg-purple-800 text-white font-medium py-2 px-4 rounded-lg shadow-md"
              >
                Create Tag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tags;
