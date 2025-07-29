'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../public/NavBar/logo.png';
import { IoMenu } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const openLoginModal = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const openSignupModal = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-28 py-3 flex justify-between items-center">
        <Link href="/">
          <Image src={Logo} alt="Ecademy Logo" width={120} height={40} />
        </Link>

   
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/blog" className="text-gray-700 hover:text-[#7D287E] transition">Blog Post</Link>
          <Link href="/about" className="text-gray-700 hover:text-[#7D287E] transition">About Us</Link>
          <button
            onClick={openLoginModal}
            className="text-gray-700 border border-[#7D287E] px-4 py-2 rounded-md hover:text-[#7D287E] font-medium transition"
          >
            Login
          </button>
          <button
            onClick={openSignupModal}
            className="bg-[#7D287E] text-white px-4 py-2 rounded-md hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </div>

      
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-700 focus:outline-none">
          {mobileMenuOpen ? <RxCross2 size={28} /> : <IoMenu size={28} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-3">
            <Link href="/blog" className="text-gray-700 hover:text-[#7D287E] transition">Blog Post</Link>
            <Link href="/about" className="text-gray-700 hover:text-[#7D287E] transition">About Us</Link>
            <button onClick={() => { setMobileMenuOpen(false); openLoginModal(); }} className="text-gray-700 hover:text-[#7D287E] font-medium text-left transition">Login</button>
            <button onClick={() => { setMobileMenuOpen(false); openSignupModal(); }} className="bg-[#7D287E] text-white px-4 py-2 rounded-md hover:opacity-90 transition text-left">Sign Up</button>
          </div>
        </div>
      )}

      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={() => {
          setShowLoginModal(false);
          setShowSignupModal(true);
        }}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModal(true);
        }}
      />
    </nav>
  );
};

export default Navbar;