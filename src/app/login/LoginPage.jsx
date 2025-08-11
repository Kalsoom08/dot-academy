'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { TfiEmail } from 'react-icons/tfi';
import { IoCallOutline } from 'react-icons/io5';
import Image from 'next/image';
import Logo from '../../../public/NavBar/logo.png'; 
import { useRouter } from 'next/navigation';

export default function LoginPage({ redirectTo }) {
    const router = useRouter();
    const [activeModal, setActiveModal] = useState(null); 
    const [email, setEmail] = useState('');
    const [emailPassword, setEmailPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [phonePassword, setPhonePassword] = useState('');

    const handleLoginSuccess = () => {
        localStorage.setItem('isLoggedIn', 'true');
        router.push(redirectTo);
    };

    const handleFakeLogin = (type) => {
        if (type === 'email') {
            console.log(`Login with Email: ${email}, Password: ${emailPassword}`);
        } else if (type === 'phone') {
            console.log(`Login with Phone: ${phone}, Password: ${phonePassword}`);
        }
        handleLoginSuccess();
    };

    const handleSwitchToSignup = () => {
        router.push(`/signup?redirect=${encodeURIComponent(redirectTo)}`);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl  sm:w-[50%] lg:w-[30%] p-6 relative">

                <div className="flex flex-col items-center gap-2 mb-10 mt-6">
                    <Image src={Logo} alt="Ecademy Dot" className="w-32" />
                    <h2 className="text-2xl anton text-gray-900">Welcome back 👋</h2>
                </div>

                {!activeModal && (
                    <div className="space-y-4">
                        <LoginButton icon={<FcGoogle />} label="Continue with Google" onClick={() => alert('Mock Google Login')} />
                        <LoginButton icon={<TfiEmail />} label="Continue with Email" onClick={() => setActiveModal('email')} />
                        <LoginButton icon={<IoCallOutline />} label="Continue with Number" onClick={() => setActiveModal('phone')} />
                    </div>
                )}

                {activeModal === 'email' && (
                    <form onSubmit={(e) => { e.preventDefault(); handleFakeLogin('email'); }} className="space-y-4">
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
                            <a href="#" className="text-purple-600 hover:underline">Forget Password?</a>
                        </div>
                        <button type="submit" className="bg-[#7D287E] w-full text-white py-2 rounded-full">
                            Login
                        </button>
                    <p className="text-center text-sm text-gray-700 mt-6">
                        Don’t have an account?{' '}
                        <button onClick={handleSwitchToSignup} className="text-purple-700 font-medium hover:underline">
                            Signup
                        </button>
                    </p>
                    </form>
                )}

                {activeModal === 'phone' && (
                    <form onSubmit={(e) => { e.preventDefault(); handleFakeLogin('phone'); }} className="space-y-4">
                        <input
                            type="tel"
                            placeholder="Number"
                            className="w-full border p-2 rounded-full"
                            value={phone}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value) && value.length <= 13) {
                                    setPhone(value);
                                }
                            }}
                            maxLength={13}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border p-2 rounded-full"
                            value={phonePassword}
                            onChange={(e) => setPhonePassword(e.target.value)}
                            required
                        />
                        <div className="flex justify-between items-center text-sm">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" />
                                <span>Remember Me</span>
                            </label>
                            <a href="#" className="text-purple-600 hover:underline">Forget Password?</a>
                        </div>
                        <button type="submit" className="bg-[#7D287E] w-full text-white py-2 rounded-full">
                            Login
                        </button>
                                    <p className="text-center text-sm text-gray-700 mt-6">
                        Don’t have an account?{' '}
                        <button onClick={handleSwitchToSignup} className="text-purple-700 font-medium hover:underline">
                            Signup
                        </button>
                    </p>
                    </form>
                )}

                {!activeModal && (
                    <p className="text-center text-sm text-gray-700 mt-6">
                        Don’t have an account?{' '}
                        <button onClick={handleSwitchToSignup} className="text-purple-700 font-medium hover:underline">
                            Signup
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
}

function LoginButton({ icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-3 px-4 py-2 border border-gray-100 rounded-full shadow-sm hover:bg-gray-50 transition"
        >
            <span className="text-lg">{icon}</span>
            <span className="flex-1 text-center text-sm font-medium">{label}</span>
        </button>
    );
}
