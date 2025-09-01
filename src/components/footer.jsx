'use client';

import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { RiHeart3Fill } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const Footer = () => {
  const router = useRouter();
  const footerRef = useRef(null);

  // Trigger animation at 40% visibility
  const isInView = useInView(footerRef, { amount: 0.4, once: true });

  return (
    <motion.footer
      ref={footerRef}
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 100, scale: 0.95 }
      }
      transition={{
        duration: 0.8,
        type: 'spring',
        stiffness: 80,
        damping: 15
      }}
      className="bg-[#282828] text-white pt-6 mt-36 rounded-t-4xl"
    >
      <div className="bg-white text-center rounded-3xl shadow-lg px-6 py-10 mx-auto max-w-3xl -mt-20 sm:-mt-28 lg:-mt-32 w-[90%]">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          All you need for your next exam, <br />
          get it in your pocket now
        </h2>
        <p className="text-sm font-medium text-gray-800 mt-3">
          Trusted by 14 Million+ students
        </p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#7D287E] hover:bg-[#661f69] text-white px-6 py-3 rounded-lg font-semibold"
          >
            Start Learning for Free
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-[#7D287E] text-[#7D287E] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
          >
            Download Our App
          </motion.button>
        </div>
      </div>

      <div className="mt-16 px-6 sm:px-10 lg:px-20 pb-10">
        <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-between items-start gap-10">
          <div className="max-w-sm">
            <p className="text-sm text-gray-300 mb-4">CONNECT WITH US ON</p>
            <div className="flex items-center gap-4 mb-4">
              <FaFacebookF className="w-5 h-5 cursor-pointer" />
              <FaInstagram className="w-5 h-5 cursor-pointer" />
              <FaXTwitter className="w-5 h-5 cursor-pointer" />
            </div>
            <h1 className="anton">
              Ecademy stands for Education Revolution. <br />
              Made with Love <RiHeart3Fill className="text-red-500 inline-flex" />
            </h1>
            <p className="text-sm text-gray-400 mt-4">
              Copyright © 2025 ecademydot.pk
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
            <div>
              <h3 className="text-white text-lg mb-3 anton">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li className='hover:cursor-pointer' onClick={() => router.push('/')}>Home</li>
                <li className='hover:cursor-pointer' onClick={() => router.push('/privacy')}>Privacy Policy</li>
                <li className='hover:cursor-pointer' onClick={() => router.push('/refund')}>Refund Policy</li>
                <li className='hover:cursor-pointer' onClick={() => router.push('/service')}>Service Policy</li>
                <li className='hover:cursor-pointer' onClick={() => router.push('/termsAndCondition')}>Terms & Conditions</li>
               
              </ul>
            </div>

            <div>
              <h3 className="anton text-white text-lg mb-3">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li className='hover:cursor-pointer' onClick={() => router.push('/')}>Home</li>
                <li className='hover:cursor-pointer'>View All Courses</li>
                <li className='hover:cursor-pointer'>FAQ’s</li>
                <li className='hover:cursor-pointer'>Pricing</li>
                <li className='hover:cursor-pointer'>Ecademy blog</li>
                <li className='hover:cursor-pointer'>Contact us</li>
                <li className='hover:cursor-pointer'>Career</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
