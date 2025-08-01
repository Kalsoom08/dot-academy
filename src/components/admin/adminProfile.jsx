import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

const ProfileSection = () => {
  return (
    <header className="flex justify-end items-center mb-8">
      <div className="flex items-center space-x-3 p-2 rounded-full  pr-4">
        <img
          src="https://placehold.co/40x40/E0BBE4/FFFFFF?text=PK"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-medium text-gray-700">Psychologist Kashif</span>
        <FaChevronDown className="w-4 h-4 text-gray-500" />
      </div>
    </header>
  );
};

export default ProfileSection;
