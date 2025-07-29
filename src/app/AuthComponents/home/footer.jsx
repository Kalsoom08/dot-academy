'use client';

import React from 'react';
import AppStore from '../../../../public/AppSection/appStore.png';
import GooglePlay from '../../../../public/AppSection/googlePlay.png';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className="bg-black text-white px-4 py-2 sm:px-8 lg:px-12 mt-5">
      <div className="flex flex-col sm:flex-row justify-between items-center ">
       
        <h1 className="text-md sm:text-xl lg:text-xl font-semibold text-center sm:text-left">
          Job Ya Entrance Test Tayari <br /> Without Stress ❤️
        </h1>

   
        <div className="flex gap-4">
          <Image src={AppStore} alt="App Store" className="w-32 sm:w-36" />
          <Image src={GooglePlay} alt="Google Play" className="w-32 sm:w-36" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
