'use client';

import React, { useState } from 'react';
import { FiBell, FiEye, FiPlus, FiX } from 'react-icons/fi';
import AddNotificationModal from './notificationModal';
import Image from 'next/image';

const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Welcome Update',
      description: 'We have launched a new feature for better user experience.',
      imagePreview: null,
      timestamp: 'July 30, 2025, 10:15 AM',
    },
    {
      id: 2,
      title: 'Maintenance Notice',
      description: 'Scheduled maintenance will occur on August 5th, 2:00 AM - 4:00 AM.',
      imagePreview: null,
      timestamp: 'July 28, 2025, 4:30 PM',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewData, setViewData] = useState(null);

  const handleAddNotificationClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCloseViewModal = () => {
    if (viewData?.imagePreview) {
      URL.revokeObjectURL(viewData.imagePreview);
    }
    setIsViewModalOpen(false);
    setViewData(null);
  };

  const handleAddNewNotification = ({ title, description, thumbnailFile }) => {
    const imagePreview = thumbnailFile ? URL.createObjectURL(thumbnailFile) : null;
    const newNotification = {
      id: notifications.length + 1,
      title,
      description,
      imagePreview,
      timestamp: new Date().toLocaleString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setNotifications([newNotification, ...notifications]);
    setViewData(newNotification);
    setIsViewModalOpen(true);
  };

  const handleViewNotification = (notification) => {
    setViewData(notification);
    setIsViewModalOpen(true);
  };

  return (
    <div className="font-sans p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Notification</h1>
        <button
          className="bg-[#7D287E] text-white font-semibold py-2 px-4 sm:px-5 rounded-md flex items-center"
          onClick={handleAddNotificationClick}
        >
          <FiPlus className="mr-2 text-xl" /> Add Notification
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex flex-col sm:flex-row p-4 sm:p-5 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <div className="flex-shrink-0 flex items-start sm:items-start mb-2 sm:mb-0 sm:mr-4">
              <div className="w-8 h-8 flex items-center justify-center bg-[#D9D9D9] rounded-full">
                <FiBell className="text-xl text-[#7D287E]" />
              </div>
            </div>

            <div className="flex-grow">
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {notification.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">
                {notification.description}
              </p>
              <p className="text-gray-500 text-xs">{notification.timestamp}</p>
            </div>

            <div className="mt-2 sm:mt-0 sm:ml-4">
              <button
                className="p-2 rounded-full text-[#D9D9D9]"
                onClick={() => handleViewNotification(notification)}
              >
                <FiEye className="text-xl text-[#7D287E]" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddNotificationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleAddNewNotification}
      />

{isViewModalOpen && viewData && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 p-2 sm:p-4">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-screen overflow-y-auto p-4 sm:p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Notification Preview</h2>
        <button onClick={handleCloseViewModal}>
          <FiX size={28} className="bg-black text-white rounded-full p-1" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start gap-2 p-3 border-b border-gray-200">
          <h3 className="font-semibold text-base sm:text-lg text-gray-500 min-w-[70px]">Title:</h3>
          <p className="font-semibold text-gray-800">{viewData.title}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start gap-2 p-3 border-b border-gray-200">
          <h3 className="font-semibold text-base sm:text-lg text-gray-500 min-w-[100px]">Description:</h3>
          <p className="font-semibold text-gray-800">{viewData.description}</p>
        </div>

        {viewData.imagePreview && (
          <div className="relative w-full h-48 sm:h-64">
            <Image
              src={viewData.imagePreview}
              alt={`Thumbnail for ${viewData.title}`}
              fill
              className="rounded-lg border object-cover"
            />
          </div>
        )}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Notification;
