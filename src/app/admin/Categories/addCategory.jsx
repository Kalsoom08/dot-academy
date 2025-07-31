import React, { useState } from 'react';
import { MdCancel } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

function AddCategory({ onClose }) {
  const [type, setType] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const options = ['Category', 'Subject', 'Topic'];

  const handleSelect = (value) => {
    setType(value);
    setShowDropdown(false);
  };

  return (
    <section className='flex justify-center items-center w-full min-h-screen'>
      <div className="rounded-md w-[360px] bg-white shadow-xl z-50 p-4">
        <div className="flex justify-end">
          <MdCancel
            className="text-2xl cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={onClose}
          />
        </div>

        <h1 className="text-lg font-semibold mb-4">Add New Category</h1>
        <form className="flex flex-col gap-4">
          <label htmlFor="name" className="flex flex-col">
            <p className="text-sm font-medium">Name</p>
            <input
              type="text"
              id="name"
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            />
          </label>
          <div className="flex flex-col relative">
            <p className="text-sm font-medium mb-1">Type</p>
            <div
              className="border border-gray-300 rounded-md px-3 py-2 flex justify-between items-center cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className={`text-gray-700 ${!type && 'text-gray-400'}`}>
                {type || 'Select Type'}
              </span>
              <FaChevronDown className="text-gray-500 ml-2" />
            </div>
            {showDropdown && (
              <div className="absolute top-[100%] left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                {options.map((opt) => (
                  <div
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className="px-4 py-2 hover:bg-gray-100 text-sm text-gray-700 cursor-pointer"
                  >
                    {opt}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-medium mb-1">Thumbnail</p>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center text-center text-gray-400 cursor-pointer">
              <svg
                className="w-10 h-10 mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16V4m0 0L8 8m4-4l4 4m1 5h.01M4 16a4 4 0 014-4h8a4 4 0 014 4v4H4v-4z"
                />
              </svg>
              <p className="text-blue-500">Upload Image</p>
              <p className="text-xs text-gray-400">PDF Files up to 10MB</p>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded-md text-sm"
              onClick={onClose}
            >
              + Cancel
            </button>
            <button
              type="submit"
              className="bg-purple-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddCategory;
