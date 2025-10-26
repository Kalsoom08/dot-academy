'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../../../../slices/authSlice';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react'; // 👈 Added for password toggle

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 14 } },
};

const EditProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [province, setProvince] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👈 Added

  const provinces = ['Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan'];
  const genders = ['Girl', 'Boy', 'Prefer Not to Say'];

  // ✅ Prefill data
  useEffect(() => {
    if (user && user.name) {
      const [first, ...rest] = user.name.split(' ');
      setFirstName(first || '');
      setLastName(rest.join(' ') || '');
      setGender(user.gender || '');
      setProvince(user.province || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: `${firstName} ${lastName}`.trim(),
      gender,
      province,
      ...(password && { password }), // only include password if changed
    };

    const res = await dispatch(updateProfile(updatedData));

    if (res.meta.requestStatus === 'fulfilled') {
      toast.success('Profile updated successfully!');
      setTimeout(() => router.push('/AuthComponents/home'), 2000);
    } else {
      toast.error(res.payload?.error || 'Failed to update profile');
    }
  };

  return (
    <motion.div
      className="min-h-screen p-6 sm:p-8 bg-gray-50 font-inter"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6"
        variants={itemVariants}
      >
        Edit Profile
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto space-y-6"
        variants={containerVariants}
      >
        {/* First & Last Name */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4" variants={itemVariants}>
          <div>
            <label className="text-sm text-gray-700 font-medium">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
              placeholder="Enter first name"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 font-medium">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
              placeholder="Enter last name"
            />
          </div>
        </motion.div>

        {/* Province */}
        <motion.div variants={itemVariants}>
          <label className="text-sm text-gray-700 font-medium">Province</label>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Province</option>
            {provinces.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Gender */}
        <motion.div variants={itemVariants}>
          <label className="text-sm text-gray-700 font-medium">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full mt-1 border rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Gender</option>
            {genders.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Password with Eye Icon */}
        <motion.div variants={itemVariants}>
          <label className="text-sm text-gray-700 font-medium">New Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave empty to keep current password"
              className="w-full mt-1 border rounded-md px-3 py-2 pr-10 focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </motion.div>

        {/* Submit */}
        <motion.div variants={itemVariants}>
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition-colors"
          >
            Save Changes
          </button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default EditProfilePage;
