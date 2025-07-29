'use client';

import Image from 'next/image';
import heroImage from '../../../public/Hero/hero.png';
import icon from '../../../public/Hero/icon.jpg';
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { FaApple } from "react-icons/fa";



const Hero = () => {
  return (
    <section className=" py-18 px-6 md:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 ">
        
        <div className="md:w-1/2 text-center md:text-left">
        <h1 className='anton text-4xl  sm:text-5xl  leading-tight'>
            Unlock <span className="text-[#7D287E]">Success</span><br />
            Step by Step{" "}
            <span className="inline-block align-middle">
                <Image src={icon} alt="check" width={32} height={32} className="inline-block" />
            </span>
        </h1>

          
          <p className="mt-4 text-md font-bold">
            Job ya Entry Test <span className="text-[#7D287E] ">Tayari Without Stress</span>
          </p>

          <button className="mt-6 bg-black text-white px-6 py-3 rounded-md text-base font-medium hover:opacity-90 transition">
            Start Learning for Free
          </button>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2 sm:gap-4">
            <p className="text-sm">Download Our App:</p>
            <div className="flex items-center gap-3">
              <IoLogoGooglePlaystore size={28} className='bg-[#f7f0f0] p-1 shadow-2xl rounded-4xl'/>
              <FaApple size={28} className='bg-[#f7f0f0] p-1 shadow-2xl rounded-4xl' />
            </div>
          </div>
        </div>

     
        <div className="md:w-1/2 flex justify-center">
          <Image
            src={heroImage}
            alt="Learning Illustration"
            className="w-[80%] max-w-sm sm:max-w-md md:max-w-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
