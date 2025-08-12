'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const EditProfilePage = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [designation, setDesignation] = useState('');
  const [province, setProvince] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  const provincesList = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan'];
  const gendersList = ['Girl', 'Boy', 'Prefer Not to Say'];

  const handleSaveChanges = () => {
    const updatedProfileData = {
      firstName,
      lastName,
      accountType,
      designation,
      province,
      gender,
      email,
      number,
    };

    localStorage.setItem('userProfile', JSON.stringify(updatedProfileData));

    alert('Profile updated successfully!');
    router.push('/AuthComponents/profile');
  };

  return (
    <motion.div
      className="min-h-screen p-4 sm:p-6 lg:p-8 font-inter"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-8"
        variants={itemVariants}
      >
        Edit your profile
      </motion.h1>

      <motion.div
        className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto"
        variants={containerVariants}
      >
        <motion.div className="flex items-center mb-8" variants={itemVariants}>
          <img
            src="https://placehold.co/100x100/a78bfa/ffffff?text=HA"
            alt="User Profile"
            className="w-24 h-24 rounded-full mr-6 shadow-md"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="firstName"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">&nbsp;</label>
            <input
              type="text"
              id="lastName"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">Account Type</label>
            <div className="mt-1 flex items-center justify-between border-b border-gray-300 pb-2">
              <span className="text-gray-800">{accountType}</span>
              <button className="text-purple-600 text-sm font-medium">Upgrade</button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              type="text"
              id="designation"
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </motion.div>
        </motion.div>

        <motion.div className="mb-6 relative" variants={itemVariants}>
          <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Province</label>
          <div onClick={() => setShowProvinceDropdown(!showProvinceDropdown)} className="cursor-pointer">
            <div className="w-full px-3 py-2 border rounded-md shadow-sm flex justify-between items-center">
              <span>{province}</span>
              <svg className={`w-4 h-4 transform ${showProvinceDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {showProvinceDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
                {provincesList.map((item) => (
                  <div key={item} className="px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                    setProvince(item);
                    setShowProvinceDropdown(false);
                  }}>{item}</div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div className="mb-6 relative" variants={itemVariants}>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <div onClick={() => setShowGenderDropdown(!showGenderDropdown)} className="cursor-pointer">
            <div className="w-full px-3 py-2 border rounded-md shadow-sm flex justify-between items-center">
              <span>{gender}</span>
              <svg className={`w-4 h-4 transform ${showGenderDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {showGenderDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto">
                {gendersList.map((item) => (
                  <div key={item} className="px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => {
                    setGender(item);
                    setShowGenderDropdown(false);
                  }}>{item}</div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        <motion.div className="mb-6" variants={itemVariants}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </motion.div>

        <motion.div className="mb-6" variants={itemVariants}>
          <label htmlFor="number" className="block text-sm font-medium text-gray-700">Number</label>
          <input
            type="tel"
            id="number"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </motion.div>

        <motion.div className="mb-8" variants={itemVariants}>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <div className="mt-1 flex items-center justify-between border-b border-gray-300 pb-2">
            <span className="text-gray-800">{password}</span>
            <button className="text-purple-600 text-sm font-medium">Change password</button>
          </div>
        </motion.div>

        <motion.div className="flex justify-center" variants={itemVariants}>
          <button
            onClick={handleSaveChanges}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors"
          >
            Save Changes
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EditProfilePage;
