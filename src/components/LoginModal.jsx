'use client';

import { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { TfiEmail } from 'react-icons/tfi';
import { FaTimes, FaPhone } from 'react-icons/fa';
import Image from 'next/image';
import Logo from '../../public/NavBar/logo.png';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';

import { loginUser, fetchCurrentUser } from '../../slices/authSlice';

export default function LoginModal({ isOpen, onClose, defaultTab = null, onSwitchToSignup }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [activeModal, setActiveModal] = useState(defaultTab);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    setActiveModal(defaultTab || null);
    setEmail('');
    setPhone('');
    setPassword('');
  }, [defaultTab, isOpen]);

  if (!isOpen) return null;

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert('Enter email and password');

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      await dispatch(fetchCurrentUser()).unwrap();
      alert('Login successful!');
      router.push('/AuthComponents/home');
      onClose();
    } catch (err) {
      alert(err.error || 'Login failed');
    }
  };

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    if (!phone || !password) return alert('Enter phone and password');
    alert(`Phone login with ${phone} & ${password}`);
  };

const handleGoogleLogin = () => {
  window.location.href = `http://localhost:7000/api/auth/google`;
};


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[1px] bg-black/30">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white rounded-2xl shadow-xl sm:w-[50%] lg:w-[30%] p-6 relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 bg-black text-white rounded-full p-1">
          <FaTimes size={12} />
        </button>

        <div className="flex flex-col items-center gap-2 mb-10 mt-6">
          <Image src={Logo} alt="Logo" className="w-32" />
          <h2 className="text-2xl anton text-gray-900">Welcome back 👋</h2>
        </div>

        <AnimatePresence mode="wait">
          {!activeModal && (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <LoginButton icon={<FcGoogle />} label="Continue with Google" onClick={handleGoogleLogin} />
              <LoginButton icon={<TfiEmail />} label="Continue with Email" onClick={() => setActiveModal('email')} />
              <LoginButton icon={<FaPhone />} label="Continue with Phone" onClick={() => setActiveModal('phone')} />

              <p className="text-center text-sm text-[#777676] mt-6">
                Don’t have an account?{' '}
                <button onClick={onSwitchToSignup} className="text-[#7d2a7e] font-medium hover:underline">
                  Signup
                </button>
              </p>
            </motion.div>
          )}

          {activeModal === 'email' && (
            <motion.form
              key="emailForm"
              onSubmit={handleEmailLogin}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-600 p-2 rounded-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-600 p-2 rounded-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </label>
<button
  type="button"
  className="text-[#7D287E] hover:underline"
  onClick={() => {
    onClose(); 
    router.push("/forgotPassword"); 
  }}
>
  Forgot Password?
</button>

              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#7D287E] w-full text-white py-2 rounded-full"
              >
                Login
              </motion.button>
              <p className="text-center text-sm text-[#777676] mt-6">
                Don’t have an account?{' '}
                <button onClick={onSwitchToSignup} className="text-[#7d2a7e] font-medium hover:underline">
                  Signup
                </button>
              </p>
            </motion.form>
          )}

          {activeModal === 'phone' && (
            <motion.form
              key="phoneForm"
              onSubmit={handlePhoneLogin}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <input
                type="tel"
                placeholder="Phone"
                className="w-full border border-gray-600 p-2 rounded-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-600 p-2 rounded-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </label>
                <button
                  type="button"
                  className="text-[#7D287E] hover:underline"
                  onClick={() => alert('Forgot password flow')}
                >
                  Forget Password?
                </button>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#7D287E] w-full text-white py-2 rounded-full"
              >
                Login
              </motion.button>
              <p className="text-center text-sm text-[#777676] mt-6">
                Don’t have an account?{' '}
                <button onClick={onSwitchToSignup} className="text-[#7d2a7e] font-medium hover:underline">
                  Signup
                </button>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function LoginButton({ icon, label, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full flex items-center gap-3 px-4 py-2 border border-gray-100 rounded-full shadow-sm hover:bg-gray-50 transition"
    >
      <span className="text-lg">{icon}</span>
      <span className="flex-1 text-center text-sm font-medium">{label}</span>
    </motion.button>
  );
}
