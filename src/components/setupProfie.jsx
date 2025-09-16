'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Anton } from 'next/font/google';
import Logo from '../../public/NavBar/logo.png'; // Adjust path if needed

const anton = Anton({ subsets: ['latin'], weight: '400' });

export default function SetupProfile() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreed) return alert('Please accept terms and conditions.');
    if (formData.password !== formData.confirmPassword)
      return alert('Passwords do not match');

    const { password, confirmPassword, agreed, ...userProfile } = formData;
    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    alert('Account created successfully!');
    router.push('/AuthComponents/home'); // Redirect to profile page
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-1 mb-8">
          <Image src={Logo} alt="Logo" className="w-24 h-auto" />
          <h2 className={`${anton.className} text-3xl font-black text-gray-900 mt-2`}>
            Let’s get Started
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Just a few details to complete your profile and get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="flex-1 border border-gray-300 p-2 rounded-full"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="flex-1 border border-gray-300 p-2 rounded-full"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <p className="text-right text-[#959191]">(optional)</p>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded-full"
            value={formData.email}
            onChange={handleChange}
          />
          <p className="text-right text-[#959191]">(optional)</p>

          {/* Gender */}
          <select
            name="gender"
            className="w-full border border-gray-300 p-2 rounded-full text-gray-500"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Gender</option>
            <option value="Girl">Girl</option>
            <option value="Boy">Boy</option>
            <option value="Prefer Not to say">Prefer Not to say</option>
          </select>
          <p className="text-right text-[#959191]">(optional)</p>

          {/* Province */}
          <select
            name="province"
            className="w-full border border-gray-300 p-2 rounded-full text-gray-500"
            value={formData.province}
            onChange={handleChange}
          >
            <option value="">Province</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
            <option value="Balochistan">Balochistan</option>
          </select>

          {/* Passwords */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="w-full border border-gray-300 p-2 rounded-full pr-10"
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="absolute top-2.5 right-4 text-gray-500 cursor-pointer"
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
                className="w-full border border-gray-300 p-2 rounded-full pr-10"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span
                className="absolute top-2.5 right-4 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              className="mt-1 p-2"
            />
            <p>
              By clicking this icon you agree to our{' '}
              <span className="text-purple-700 underline cursor-pointer">terms and conditions</span>
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="bg-[#7D287E] w-full text-white py-2 rounded-full font-medium mt-2"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
