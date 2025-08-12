'use client';

import { useState } from 'react';
import Image from 'next/image';
import Logo from '../../public/NavBar/logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Anton } from 'next/font/google';
import { useRouter } from 'next/navigation';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});

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

  const handleChange = (field) => (e) => {
    const value = field === 'agreed' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agreed) {
      alert('Please accept terms and conditions.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // ✅ Save data (excluding password) to localStorage
    const { password, confirmPassword, agreed, ...userProfile } = formData;
    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    alert('Account created successfully!');

    // Redirect to profile/dashboard
    router.push('/AuthComponents/profile'); // or '/dashboard' if needed
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 ">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-1 mb-8">
          <Image src={Logo} alt="Logo" className="w-24 h-auto" />
          <h2 className={`${anton.className} text-3xl font-black text-gray-900 mt-2`}>Let’s get Started</h2>
          <p className="text-sm text-gray-600 mt-1">
            Just a few details to complete your profile and get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="flex-1 border border-gray-300 p-2 rounded-full"
              value={formData.firstName}
              onChange={handleChange('firstName')}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="flex-1 border border-gray-300 p-2 rounded-full"
              value={formData.lastName}
              onChange={handleChange('lastName')}
            />
          </div>
          <p className="text-right text-[#959191]">(optional)</p>

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-2 rounded-full"
            value={formData.email}
            onChange={handleChange('email')}
          />

          <p className="text-right text-[#959191]">(optional)</p>
          <select
            className="w-full border border-gray-300 p-2 rounded-full text-gray-500"
            value={formData.gender}
            onChange={handleChange('gender')}
          >
            <option value="">Gender</option>
            <option value="Girl">Girl</option>
            <option value="Boy">Boy</option>
            <option value="Prefer Not to say">Prefer Not to say</option>
          </select>

          <p className="text-right text-[#959191]">(optional)</p>
          <select
            className="w-full border border-gray-300 p-2 rounded-full text-gray-500"
            value={formData.province}
            onChange={handleChange('province')}
          >
            <option value="">Province</option>
            <option value="Punjab">Punjab</option>
            <option value="Sindh">Sindh</option>
            <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
            <option value="Balochistan">Balochistan</option>
          </select>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full border border-gray-300 p-2 rounded-full pr-10"
                value={formData.password}
                onChange={handleChange('password')}
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
                placeholder="Confirm Password"
                className="w-full border border-gray-300 p-2 rounded-full pr-10"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
              />
              <span
                className="absolute top-2.5 right-4 text-gray-500 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              className="mt-1 p-2"
              checked={formData.agreed}
              onChange={handleChange('agreed')}
            />
            <p>
              By clicking this icon you will be agree with our{' '}
              <span className="text-purple-700 underline cursor-pointer">terms and condition</span>
            </p>
          </div>

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
