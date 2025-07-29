'use client';

import Image from 'next/image';
import QRCode from '../../../public/AppSection/qr.jpg'; 
import AppStore from '../../../public/AppSection/appStore.png'; 
import GooglePlay from '../../../public/AppSection/googlePlay.png';
import DevicesMockup from '../../../public/AppSection/Group.png'; 


export default function AppDownloadSection() {
  return (
    <section className="py-16 px-4 bg-white max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        
        <div className="relative w-full lg:w-1/2 flex justify-center">
         
          <div className="absolute inset-0 -z-10">
            <div className="w-[300px] h-[300px] bg-purple-300 rounded-full absolute top-10 left-10 opacity-30 blur-2xl" />
            <div className="w-[250px] h-[250px] bg-purple-600 rounded-full absolute top-20 left-20 blur-xl opacity-20" />
            <div className="w-[20px] h-[20px] bg-purple-800 rounded-full absolute top-[60%] left-[70%]" />
            <div className="w-[10px] h-[10px] bg-black rounded-full absolute top-[40%] left-[30%]" />
          </div>

        
          <Image
            src={DevicesMockup}
            alt="Device Mockup"
            className="w-full max-w-md lg:max-w-x"
            priority
          />
        </div>

      
        <div className="text-center lg:text-left w-full lg:w-1/2">
          <h2 className='anton text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900'>
            Learn from{' '}
            <span className="text-[#7D287E] ">anywhere</span>
            <br />
            Get the App
          </h2>
          <p className="mt-4 text-gray-700">
            Available on Android, iOS and Website
          </p>

      
          <div className="my-4 flex justify-center lg:justify-start">
            <Image
              src={QRCode}
              alt="QR Code"
              width={80}
              height={80}
              className="w-20 h-20"
            />
          </div>
          <p className="text-sm text-gray-600 mb-4">
            (Scan the QR code to download the app)
          </p>

         
          <div className="flex gap-4 justify-center lg:justify-start">
            <Image src={AppStore} alt="App Store" width={140} height={50} />
            <Image src={GooglePlay} alt="Google Play" width={140} height={50} />
          </div>
        </div>
      </div>
    </section>
  );
}
