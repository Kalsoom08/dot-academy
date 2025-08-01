'use client';
import React from 'react';
import { IoClose as CloseIcon, IoCloudUploadOutline } from 'react-icons/io5';

const aspectRatios = ['16:9', '2.9', '2.9'];
const positions = ['Home Hero', 'Course List Header', 'Course Side bar'];

const UploadBannerModal = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[1px] px-4">
      <div className="bg-white w-full max-w-md sm:max-w-sm rounded-2xl p-6 relative shadow-xl 
                      max-h-[90vh] overflow-y-auto"> 

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-[#282828]"
        >
          <CloseIcon size={20} className="bg-black text-white rounded-full" />
        </button>

        <h3 className="font-semibold mb-4 mt-4 text-lg">Upload New Banner</h3>

        <div className="space-y-4">

          <div>
            <label className="text-sm font-medium text-[#282828] block mb-1">Banner Title*</label>
            <input className="w-full px-4 py-2 bg-[#E6E6E6] rounded-lg text-sm" placeholder="Title Here" />
          </div>

          <div>
            <label className="text-sm font-medium text-[#282828] block mb-1">Aspect Ratio</label>
            <select className="w-full px-4 py-2 bg-[#E6E6E6] rounded-lg text-sm">
              <option disabled selected>Select Aspect Ratio</option>
              {aspectRatios.map((ratio, i) => (
                <option key={i}>{ratio}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-[#282828] block mb-1">Banner Image</label>
            <div className="w-full border border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer">
              <IoCloudUploadOutline size={22} className="text-gray-400 mb-2" />

              <label htmlFor="upload" className="text-[#00A1FF] cursor-pointer">Upload Banner</label>

              <input
                id="upload"
                type="file"
                className="mt-1 w-full text-sm text-center text-[#7D287E] 
                  file:mr-0 file:px-4 file:py-1 file:rounded-full file:border-0 
                  file:text-sm file:font-semibold file:bg-[#7D287E] 
                  file:text-white hover:file:bg-purple-800"
              />

              <p className="text-xs text-gray-400 mt-2">PDF Files up to 10MB</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#282828] block mb-1">Click URL</label>
            <input className="w-full px-4 py-2 bg-[#E6E6E6] rounded-lg text-sm" placeholder="Link here" />
          </div>

          <div>
            <label className="text-sm font-medium text-[#282828] block mb-1">Display Position</label>
            <select className="w-full px-4 py-2 bg-[#E6E6E6] rounded-lg text-sm">
              <option disabled selected>Select Position</option>
              {positions.map((pos, i) => (
                <option key={i}>{pos}</option>
              ))}
            </select>
          </div>

          <div className="text-right">
            <button
              onClick={onSave}
              className="bg-[#7D287E] text-white font-medium px-6 py-2 rounded-md hover:bg-purple-900 transition"
            >
              Save
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UploadBannerModal;
