'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Anton } from 'next/font/google';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../slices/authSlice';
import Logo from '../../public/NavBar/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SetupProfile() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    province: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreed) {
      toast.warning('Please accept terms and conditions.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
    const user = await dispatch(updateProfile(formData)).unwrap();

if (user) {
  localStorage.setItem(
    'userProfile',
    JSON.stringify({
      firstName: user.firstName,
      lastName: user.lastName,
      studentId: user.studentId,
    })
  );
}

toast.success('Account created successfully! Redirecting to Dashboard ', { autoClose: 1500 });
setTimeout(() => router.push('/AuthComponents/home'), 1800);

    } catch (err) {
      toast.error(err.error || 'Failed to complete profile.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100 px-4 py-10">
      <ToastContainer position="top-center" />

      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col items-center gap-1 mb-8 text-center">
          <Image src={Logo} alt="Logo" className="w-20 h-auto mb-3" />
          <h2
            className='text-3xl font-extrabold text-gray-900 tracking-wide anton'
          >
            Let’s get Started
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Just a few details to complete your profile and get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Inputs */}
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div>
    <input
      type="text"
      name="firstName"
      placeholder="First Name"
      className="w-full border border-gray-300 p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      value={formData.firstName}
      onChange={handleChange}
      required
    />
  </div>

  <div>
    <input
      type="text"
      name="lastName"
      placeholder="Last Name"
      className="w-full border border-gray-300 p-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
      value={formData.lastName}
      onChange={handleChange}
    />
  </div>
</div>

          <p className="text-right text-xs text-[#959191]">(optional)</p>

          {/* Gender */}
          <select
            name="gender"
            className="w-full border border-gray-300 p-2.5 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Gender</option>
            <option value="Girl">Girl</option>
            <option value="Boy">Boy</option>
            <option value="Prefer Not to say">Prefer Not to say</option>
          </select>
          <p className="text-right text-xs text-[#959191]">(optional)</p>

          {/* Province */}
          <select
            name="province"
            className="w-full border border-gray-300 p-2.5 rounded-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={formData.province}
            onChange={handleChange}
          >
            <option value="">Province</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
            <option value="Balochistan">Balochistan</option>
          </select>

          {/* Password Fields */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="w-full border border-gray-300 p-2.5 rounded-full pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="absolute top-3 right-4 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <div className="relative flex-1 w-full">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full border border-gray-300 p-2.5 rounded-full pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className="absolute top-3 right-4 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2 text-sm text-gray-600 mt-2">
            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              className="mt-1 accent-purple-600"
            />
            <p>
              By clicking this icon you agree to our{' '}
              <span className="text-purple-700 underline cursor-pointer">
                terms and conditions
              </span>
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#7D287E] hover:bg-[#5e1e5f] w-full text-white py-2.5 rounded-full font-medium mt-4 transition-transform hover:scale-[1.02] active:scale-95"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
