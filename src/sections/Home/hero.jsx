'use client';
import Image from 'next/image';
import heroImage from '../../../public/Hero/hero.png';
import icon from '../../../public/Hero/icon.jpg';
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import LoginModal from '@/components/LoginModal';
import api from '../../../APIs/api'; 
const Hero = () => {
  const [isClient, setIsClient] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [banner, setBanner] = useState(null);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    setIsClient(true);
    const fetchBanner = async () => {
      try {
        const res = await api.get("/user/api/ads/hero");
        if (res.data?.length > 0) {
          setBanner(res.data[0]); 
        }
      } catch (err) {
        console.error("Banner fetch error:", err);
      }
    };
    fetchBanner();
  }, []);

  const router = useRouter();
  const handleButton = () => setIsLoginOpen(true);

  return (
    <section className="py-18 px-6 md:px-10 lg:px-20 relative">

<AnimatePresence>
  {banner && showBanner && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-[1px]"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-white rounded-xl shadow-2xl w-[90%] max-w-md overflow-hidden"
      >
        <button
          onClick={() => setShowBanner(false)}
          className="absolute top-2 right-2 text-gray-600 font-bold text-2xl hover:text-gray-900"
        >
          &times;
        </button>

  
        <Image
          src={banner.fileUrl}
          alt={banner.title}
          width={500}
          height={280}
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{banner.title}</h3>
          {banner.clickUrl && (
            <a
              href={banner.clickUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-600 hover:underline"
            >
              Learn more
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


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
