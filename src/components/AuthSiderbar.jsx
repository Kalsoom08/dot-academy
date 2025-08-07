'use client';
import Image from 'next/image';
import Logo from '../../public/NavBar/logo.png';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
  CiHome,
  CiCreditCard1,
  CiSettings,
  CiHeadphones,
  CiUser,
  CiLogout
} from "react-icons/ci";
import { FiBook } from "react-icons/fi";

import { useSupportModal } from '../context/SupportModalContext'; 
import { useChangeExamModal } from '../context/ChangeExamModalContext';


export default function Sidebar({ isOpen = true, onClose }) {
  const router = useRouter();
  const pathname = usePathname();

  const { openModal } = useSupportModal(); 
  const { openChangeExamModal } = useChangeExamModal();


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


  return (
    <aside
      className={`bg-white border-r p-6 fixed md:static top-0 left-0 h-full w-64 z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      <div className="flex justify-between items-center mb-6">
        <Image src={Logo} width={150} height={150} alt="logo" />
        {onClose && (
          <button onClick={onClose} className="md:hidden text-xl font-bold">×</button>
        )}
      </div>

      <nav className="flex flex-col gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

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
              className={`flex items-center gap-4 px-3 py-2 rounded-md transition font-medium
                ${isActive ? 'text-purple-700 border-l-4 border-purple-600 bg-purple-50' : 'text-gray-800 hover:text-purple-700'}`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
