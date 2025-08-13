import React from 'react'
import { FaApple } from "react-icons/fa";
import { IoLogoGooglePlaystore } from "react-icons/io5";

function AuthEntranceFooter() {
  return (
    <div className='bg-black py-6 px-4 grid lg:grid-cols-2 justify-between items-center text-white'>
      <h1 className='anton text-[20px] text-white'>Job Ya Entrance Test ki Tyari Without Stress ❤</h1>
      <div className='flex justify-center items-center gap-4'>
        <div className=' flex justify-center items-center gap-4'>
            <FaApple />
            <div className=''>
                <p>Download on the</p>
                <h1 className='text-[20px] font-semi-bold'>App Store</h1>
            </div>
        </div>
        <div className='flex justify-center items-center gap-4'>
            <IoLogoGooglePlaystore />
            <div className=''>
                <p>GET IT ON</p>
                <h1 className='text-[20px] font-semi-bold'>Google Play</h1>
            </div>
        </div>
      </div>
    </div>
  )
}

export default AuthEntranceFooter
