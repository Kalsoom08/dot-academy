'use client';
import Image from 'next/image';
import Logo from '../../public/NavBar/logo.png';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import {
  CiHome,
  CiCreditCard1,
  CiSettings,
  CiHeadphones,
  CiUser,
  CiLogout
} from "react-icons/ci";
import { FiBook } from "react-icons/fi";
import { FaChartBar } from "react-icons/fa";

import { FiLogOut } from "react-icons/fi";

import { useSupportModal } from '../context/SupportModalContext'; 
import { useChangeExamModal } from '../context/ChangeExamModalContext';


import DetailPopup from '@/app/AuthComponents/ExploreCourses/CourseDetail/detailPopup';
import CourseAnalysis from '@/app/AuthComponents/ExploreCourses/CourseAnalysis';

export default function Sidebar({ isOpen = true, onClose }) {
  const router = useRouter();
  const pathname = usePathname();

  const { openModal } = useSupportModal(); 
  const { openChangeExamModal } = useChangeExamModal();

  const [showDetailPopup, setShowDetailPopup] = useState(false);
  const [showAnalysisPopup, setShowAnalysisPopup] = useState(false);

  const handleLeaveCourse = () => {
  router.push('/AuthComponents/home'); 
};

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/');
  };

  const navItems = [
    { name: "Home", icon: <CiHome size={20} />, path: "/AuthComponents/home" },
    { name: "Explore Courses", icon: <FiBook size={20} />, path: "/AuthComponents/ExploreCourses" },
    { name: "Pricing Plans", icon: <CiCreditCard1 size={20} />, path: "/AuthComponents/pricingPlan" },
    { name: "Change Exam", icon: <CiSettings size={20} />, onClick: openChangeExamModal }, 
    { name: "Support", icon: <CiHeadphones size={20} />, onClick: openModal },           
    { name: "Profile", icon: <CiUser size={20} />, path: "/AuthComponents/profile" },       
    { name: "Log out", icon: <CiLogout size={20} />, onClick: handleLogout }
  ];

  const courseOptions = [
    { name: "About the course", icon: <FiBook size={20} />, onClick: () => setShowDetailPopup(true) },
    { name: "Course Analysis", icon: <FaChartBar size={20} />, onClick: () => setShowAnalysisPopup(true) },
    { name: "Leave Course", icon: <FiLogOut size={20} />, onClick: handleLeaveCourse },
  ];

  return (
    <>
<aside
  className={`bg-white border-r p-6 fixed md:static top-0 left-0 h-full w-64 z-40 transition-transform duration-300
    ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 overflow-y-auto`}
>

        <div className="flex justify-between items-center mb-6">
          <Image src={Logo} width={150} height={150} alt="logo" />
          {onClose && (
            <button onClick={onClose} className="md:hidden text-xl font-bold">×</button>
          )}
        </div>

        <nav className="flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive = item.path && pathname.includes(item.path);

            if (item.onClick) {
              return (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="flex items-center gap-4 px-3 py-2 rounded-md text-gray-800 hover:text-purple-700 transition font-medium"
                >
                  {item.icon}
                  {item.name}
                </button>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-4 px-3 py-2 rounded-full transition font-medium
                  ${isActive ? 'text-[#7D287E] border border-[#7D287E] bg-gray-200' : 'text-[#282828]'}`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}

          {pathname.includes("/AuthComponents/ExploreCourses") && (
            <div className="mt-4 border-t border-[#E6E6E6] pt-4">
              <h2 className="text-md font-semibold mb-2">Course Option</h2>
              {courseOptions.map((item) => {
                if (item.onClick) {
                  return (
                    <button
                      key={item.name}
                      onClick={item.onClick}
                      className="flex items-center text-[14px] gap-4 px-3 py-4 rounded-md text-gray-800 hover:text-purple-900 transition font-medium"
                    >
                      {item.icon}
                      {item.name}
                    </button>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="flex items-center gap-4 px-3 py-2 rounded-md text-gray-800 hover:text-purple-700 transition font-medium"
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>
      </aside>

     
      {showDetailPopup && (
        <DetailPopup
          courseData={{ teacher: "John Doe" }}
          onClose={() => setShowDetailPopup(false)}
        />
      )}
      {showAnalysisPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
          <CourseAnalysis
            itemData={{}}
            onClose={() => setShowAnalysisPopup(false)}
          />
        </div>
      )}
    </>
  );
}