'use client';

import { FaFacebookF, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { RiHeart3Fill } from "react-icons/ri";


const Footer = () => {
  return (
    <footer className="bg-[#282828] text-white pt-6 mt-36 rounded-4xl">
   
      
        <div className="bg-white text-center rounded-3xl shadow-lg px-6 py-10 mx-auto max-w-3xl -mt-20 sm:-mt-28 lg:-mt-32 w-[90%]">

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          All you need for your next exam, <br />
          get it in your pocket now
        </h2>
        <p className="text-sm font-medium text-gray-800 mt-3">
          Trusted by 14 Million+ students
        </p>
        <div className="mt-6 flex justify-center gap-4 flex-wrap">
          <button className="bg-[#7D287E] hover:bg-[#661f69] text-white px-6 py-3 rounded-lg font-semibold">
            Start Learning for Free
          </button>
          <button className="border border-[#7D287E] text-[#7D287E] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Download Our App
          </button>
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
            <p className='anton font-light'>
              Ecademy stands for Education Revolution. <br />
              Made with Love <RiHeart3Fill className='text-red-500 inline-flex'/>
            </p>
            <p className="text-sm text-gray-400 mt-4">Copyright © 2025 ecademydot.pk</p>
          </div>

          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
            <div>
              <h3 className='font-bold text-white text-lg mb-3 anton'>Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Home</li>
                <li>View All Courses</li>
                <li>FAQ’s</li>
                <li>Pricing</li>
                <li>Ecademy blog</li>
                <li>Contact us</li>
                <li>Career</li>
              </ul>
            </div>

            <div>
              <h3 className='anton font-bold text-white text-lg mb-3'>Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Home</li>
                <li>View All Courses</li>
                <li>FAQ’s</li>
                <li>Pricing</li>
                <li>Ecademy blog</li>
                <li>Contact us</li>
                <li>Career</li>
              </ul>
            </div>

         
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
