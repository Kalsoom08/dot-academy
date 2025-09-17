'use client';

import Image from 'next/image';
import heroImage from '../../../public/Hero/hero.png';
import icon from '../../../public/Hero/icon.jpg';
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginModal from '@/components/LoginModal'; 
const Hero = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false); 

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  const handleButton = () => {
    setIsLoginOpen(true);
  };

  return (
    <section className=" py-18 px-6 md:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 ">
        
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className='anton text-4xl sm:text-5xl leading-tight'>
            Unlock <span className="text-[#7D287E]">Success</span><br />
            Step by Step{" "}
            <span className="inline-block align-middle">
              <Image src={icon} alt="check" width={32} height={32} className="inline-block" />
            </span>
          </h1>

          <p className="mt-4 text-md font-bold">
            Job ya Entry Test <span className="text-[#7D287E]">Tayari Without Stress</span>
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 bg-black text-white px-6 py-3 rounded-md text-base font-medium hover:opacity-90 transition"
            onClick={handleButton}
          >
            Start Learning for Free
          </motion.button>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-4">
            <p className="text-sm">Download Our App:</p>
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.1 }}>
                <IoLogoGooglePlaystore size={28} className='bg-[#f7f0f0] p-1 shadow-2xl rounded-4xl'/>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <FaApple size={28} className='bg-[#f7f0f0] p-1 shadow-2xl rounded-4xl' />
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <Image
            src={heroImage}
            alt="Learning Illustration"
            className="w-[80%] max-w-sm sm:max-w-md md:max-w-lg"
            priority
          />
        </motion.div>
      </div>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </section>
  );
};

export default Hero;
