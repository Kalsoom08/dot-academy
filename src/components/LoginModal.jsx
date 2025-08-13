'use client';

import { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { TfiEmail } from 'react-icons/tfi';
import { IoCallOutline } from 'react-icons/io5';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';
import Logo from '../../public/NavBar/logo.png';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginModal({ isOpen, onClose, defaultTab = null, onSwitchToSignup }) {
    const router = useRouter();
    const [activeModal, setActiveModal] = useState(defaultTab);
    const [email, setEmail] = useState('');
    const [emailPassword, setEmailPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [phonePassword, setPhonePassword] = useState('');

useEffect(() => {
  setActiveModal(defaultTab || null);
  setEmail('');
  setEmailPassword('');
  setPhone('');
  setPhonePassword('');
}, [defaultTab, isOpen]);


    if (!isOpen) return null;

    const handleFakeLogin = (type) => {
        if (type === 'email') {
            alert(`Logged in with Email:\nEmail: ${email}\nPassword: ${emailPassword}`);
        } else if (type === 'phone') {
            alert(`Logged in with Phone:\nPhone: ${phone}\nPassword: ${phonePassword}`);
        }

        localStorage.setItem('isLoggedIn', 'true');
        router.push('/AuthComponents/home'); 
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[1px]">
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
                    <Image src={Logo} alt="Ecademy Dot" className="w-32" />
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
                            <LoginButton icon={<FcGoogle />} label="Continue with Google" onClick={() => alert('Mock Google Login')} />
                            <LoginButton icon={<TfiEmail />} label="Continue with Email" onClick={() => setActiveModal('email')} />
                            <LoginButton icon={<IoCallOutline />} label="Continue with Number" onClick={() => setActiveModal('phone')} />
                        </motion.div>
                    )}

                    {activeModal === 'email' && (
                        <motion.form
                            key="emailForm"
                            onSubmit={(e) => { e.preventDefault(); handleFakeLogin('email'); }}
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
                                value={emailPassword}
                                onChange={(e) => setEmailPassword(e.target.value)}
                                required
                            />
                            <div className="flex justify-between items-center text-sm">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" />
                                    <span>Remember Me</span>
                                </label>
                                <a href="#" className="text-[#7D287E] hover:underline">Forget Password?</a>
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
                            onSubmit={(e) => { e.preventDefault(); handleFakeLogin('phone'); }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4 }}
                            className="space-y-4"
                        >
                            <input
                                type="tel"
                                placeholder="Number"
                                className="w-full border border-gray-600 p-2 rounded-full"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full border border-gray-600 p-2 rounded-full"
                                value={phonePassword}
                                onChange={(e) => setPhonePassword(e.target.value)}
                                required
                            />
                            <div className="flex justify-between items-center text-sm">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" />
                                    <span>Remember Me</span>
                                </label>
                                <a href="#" className="text-[#7D287E] hover:underline">Forget Password?</a>
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

                {!activeModal && (
                    <p className="text-center text-sm text-[#777676] mt-6">
                        Don’t have an account?{' '}
                        <button onClick={onSwitchToSignup} className="text-[#7d2a7e] font-medium hover:underline">
                            Signup
                        </button>
                    </p>
                )}
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
