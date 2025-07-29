'use client';

import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Logo from '../../public/NavBar/logo.png';
import StepStart from '../sections/SignUp/StepStart';
import StepEmailForm from '../sections/SignUp/StepEmailForm';
import StepPhoneNumber from '../sections/SignUp/StepPhoneNumber';
import StepOtp from '../sections/SignUp/StepOtp';
import { useRouter } from 'next/navigation';

export default function SignupModal({ isOpen, onClose, defaultTab = null, onSwitchToLogin }) {
   const router = useRouter();
  const [step, setStep] = useState('start');
  const [formData, setFormData] = useState({ email: '', password: '', phone: '', otp: '' });
  const [generatedOtp, setGeneratedOtp] = useState('');

  useEffect(() => {
    setStep('start');
    setFormData({ email: '', password: '', phone: '', otp: '' });
  }, [defaultTab, isOpen]);

  if (!isOpen) return null;

  const handleGoogleSignup = async () => {
    alert('Google Signup: implement logic');
    onClose();
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (formData.otp === generatedOtp) {
      alert('Signup successful!');
      router.push('/profile/setupProfile'); 
      onClose();
    } else {
      alert('Invalid OTP');
    }
  };

  const handleEmailFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return alert('Enter email');
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    console.log('Email OTP:', otp);
    setStep('otp');
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!formData.phone) return alert('Enter phone');
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    console.log('Phone OTP:', otp);
    setStep('otp');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-30 backdrop-blur-[2px]">
      <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 bg-black text-white rounded-full p-1">
          <FaTimes size={12} />
        </button>

        <div className="flex flex-col items-center gap-2 mb-8 mt-6">
          <Image src={Logo} alt="Logo" className="w-24 h-auto" />
          <h2 className="text-xl font-extrabold text-gray-900 text-center">
            {step === 'start'
              ? 'Create your Account'
              : step === 'otp'
              ? 'Please Check your Number'
              : 'OTP Verification'}
          </h2>
        </div>

        {step === 'start' && (
          <StepStart
            onGoogle={handleGoogleSignup}
            onEmail={() => setStep('email')}
            onPhone={() => setStep('phone')}
          />
        )}

        {step === 'email' && (
          <StepEmailForm formData={formData} setFormData={setFormData} onSubmit={handleEmailFormSubmit} />
        )}

        {step === 'phone' && (
          <StepPhoneNumber formData={formData} setFormData={setFormData} onSubmit={handlePhoneSubmit} />
        )}

        {step === 'otp' && (
          <StepOtp formData={formData} setFormData={setFormData} onSubmit={handleOtpSubmit} />
        )}

        <p className="text-center text-sm text-gray-700 mt-6">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-purple-700 font-medium hover:underline">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}