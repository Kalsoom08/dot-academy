
'use client'; 

import React, { useState } from 'react';
import { FiX, FiEye, FiUploadCloud } from 'react-icons/fi'; 

const AddNotificationModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      description,
      thumbnailFile,
    });
    onSubmit({ title, description, thumbnailFile });

    setTitle('');
    setDescription('');
    setThumbnailFile(null);
    onClose(); 
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <div className="flex justify-between items-center mb-6">
            <button
              className="p-2 rounded-full"
              onClick={onClose}
            ><FiX size={18} className=" bg-black text-white rounded-full" />
            </button>

             <button className='p-2 rounded-full'>
              <FiEye size={20} className="text-[#7D287E] bg-[#D9D9D9] rounded-full p-1" />
            </button>
          
        </div>

   
        <form onSubmit={handleSubmit}>
       
          <div className="mb-4">
            <label htmlFor="notificationTitle" className="block text-sm font-medium text-[#282828] mb-1">
              Notification Title*
            </label>
            <input
              type="text"
              id="notificationTitle"
              placeholder="Title Here"
              className="w-full p-2 border bg-[#E6E6E6] rounded-md outline-none border-transparent"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

      
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-[#282828] mb-1">
              Description*
            </label>
            <textarea
              id="description"
              placeholder="Description here"
              rows="3"
              className="w-full p-3 border bg-[#E6E6E6] rounded-md outline-none border-transparent resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

     
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#282828] mb-1">
              Thumbnail
            </label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-2 text-center cursor-pointer hover:border-purple-500 transition duration-150 ease-in-out"
              onClick={() => document.getElementById('thumbnailUpload').click()}
            >
              <input
                type="file"
                id="thumbnailUpload"
                className="hidden"
                accept="application/pdf, image/*" 
                onChange={handleFileChange}
              />
              <FiUploadCloud className="mx-auto  text-gray-400 mb-2" />
              <p className="text-[#00A1FF] font-semibold mb-1">Upload Thumbnail</p>
              {thumbnailFile ? (
                <p className="text-sm text-gray-500">{thumbnailFile.name}</p>
              ) : (
                <p className="text-sm text-gray-500">PDF Files up to 10MB</p>
              )}
            </div>
          </div>

      
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#7D287E] hover:bg-purple-900 text-white font-semibold py-2 px-6 rounded-md transition duration-200 ease-in-out"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNotificationModal;