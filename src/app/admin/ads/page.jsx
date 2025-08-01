'use client';
import React, { useState } from 'react';
import {
  IoImageOutline as ImageIcon,
  IoRadioButtonOff as CircleDot,
  IoEyeOutline as Eye,
  IoTimeOutline as History,
  IoAdd as Plus,
} from 'react-icons/io5';
import Ads from '../../../../public/ads.png';
import Image from 'next/image';
import UploadBannerModal from './bannerModal'

const statCards = [
  { title: 'Total Banner', value: '5', icon: ImageIcon, color: 'text-pink-500' },
  { title: 'Active Banner', value: '1', icon: CircleDot, color: 'text-green-500' },
  { title: 'Total Click', value: '1,090', icon: Eye, color: 'text-amber-500' },
  { title: 'Avg. CTR', value: '1.45%', icon: History, color: 'text-purple-500' },
];

const bannerData = [
  { id: 1, title: 'Get 10% off on 6 month course', aspectRatio: '16:9', image: Ads, isActive: true },
  { id: 2, title: 'Get 10% off on 6 month course', aspectRatio: '16:9', image: Ads, isActive: false },
  { id: 3, title: 'Get 10% off on 6 month course', aspectRatio: '16:9', image: Ads, isActive: true },
  { id: 4, title: 'Get 10% off on 6 month course', aspectRatio: '16:9', image: Ads, isActive: false },
  { id: 5, title: 'Get 10% off on 6 month course', aspectRatio: '16:9', image: Ads, isActive: false },
];

const AdsPage = () => {
  const [banners, setBanners] = useState(bannerData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggle = (id) => {
    setBanners(banners.map(banner =>
      banner.id === id ? { ...banner, isActive: !banner.isActive } : banner
    ));
  };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 font-['Inter']">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-[#282828]">Ads Setting</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 bg-[#7D287E] text-white font-medium py-2 px-4 rounded-lg shadow hover:bg-purple-900 transition-colors"
          >
            <Plus size={16} />
            <span>Upload Banner</span>
          </button>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card, index) => (
            <div key={index} className="flex items-start justify-between p-4 bg-gray-100 rounded-lg shadow-sm">
              <div>
                <p className="text-sm font-medium text-[#A3A3A3]">{card.title}</p>
                <p className="text-xl font-bold text-gray-800">{card.value}</p>
              </div>
              <div className="p-2 rounded-full">
                <card.icon className={`w-6 h-6 ${card.color}`} />
              </div>
            </div>
          ))}
        </div>


        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-200">
          <h2 className="font-semibold text-gray-800 mb-4">Banner Advertisements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {banners.map((banner) => (
              <div
                key={banner.id}
                className="relative bg-[#F2F2F2] rounded-lg overflow-hidden border border-gray-300 shadow-sm flex flex-col"
              >
                <div className="flex justify-between items-start p-3">
                  <div className="flex-grow">
                    <p className="text-sm font-semibold text-gray-800">{banner.title}</p>
                    <span className="text-xs bg-[#D6D6D6] text-gray-700 rounded-md px-2 py-0.5 inline-block mt-1">{banner.aspectRatio}</span>
                  </div>
                  <label className="relative inline-flex cursor-pointer ml-2">
                    <input
                      type="checkbox"
                      checked={banner.isActive}
                      onChange={() => handleToggle(banner.id)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-gray-200 rounded-full peer-checked:bg-[#7D287E] peer-checked:after:translate-x-full after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                  </label>
                </div>
                <Image
                  src={banner.image}
                  alt={`Banner for ${banner.title}`}
                  className="w-full h-auto object-cover p-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <UploadBannerModal isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
      onSave={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default AdsPage;
