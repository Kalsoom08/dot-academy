'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from '../../../public/NavBar/logo.png';

import {
  FaHome,
  FaBook,
  FaBookmark,
  FaTags,
  FaUsers,
  FaBell,
  FaShoppingCart,
  FaBullhorn,
  FaStar,
  FaCommentDots,
  FaCog,

} from 'react-icons/fa';

export default function AdminSidebar({ isOpen = true, onClose }) {
  const pathname = usePathname();
  const router = useRouter();



  const navItems = [
    { name: 'Dashboard', icon: <FaHome size={18} />, path: '/admin/dashboard' },
    { name: 'Courses', icon: <FaBook size={18} />, path: '/admin/courses' },
    { name: 'Categories', icon: <FaBookmark size={18} />, path: '/admin/Categories' },
    { name: 'Tags', icon: <FaTags size={18} />, path: '/admin/tags' },
    { name: 'Users', icon: <FaUsers size={18} />, path: '/admin/users' },
    { name: 'Notifications', icon: <FaBell size={18} />, path: '/admin/notifications' },
    { name: 'Purchases', icon: <FaShoppingCart size={18} />, path: '/admin/purchases' },
    { name: 'Ads', icon: <FaBullhorn size={18} />, path: '/admin/ads' },
    { name: 'Reviews', icon: <FaStar size={18} />, path: '/admin/reviews' },
    { name: 'Doubts', icon: <FaCommentDots size={18} />, path: '/admin/doubts' },
    { name: 'Settings', icon: <FaCog size={18} />, path: '/admin/settings' },

  ];

  return (
    <aside
      className={`bg-white border-r p-6 fixed md:static top-0 left-0 h-full w-64 z-40 transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      
      <div className="flex justify-between items-center mb-6">
        <Image src={Logo} width={100} height={30} alt="Logo" />
        {onClose && (
          <button onClick={onClose} className="md:hidden text-2xl font-bold text-gray-800">
            ×
          </button>
        )}
      </div>

    
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          if (item.onClick) {
            return (
              <button
                key={item.name}
                onClick={item.onClick}
                className="flex items-center gap-3 px-3 py-1 rounded-md text-gray-800 hover:text-[#7D287E] transition font-medium"
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
              className={`flex items-center gap-3 px-3 py-1 rounded-4xl transition font-medium
                ${
                  isActive
                    ? 'text-[#7D287E] border border-[#7D287E] bg-purple-50'
                    : 'text-gray-800 hover:text-[#7D287E]'
                }`}
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
