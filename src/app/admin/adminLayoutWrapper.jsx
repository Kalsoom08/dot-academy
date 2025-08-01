'use client';

import { useState } from 'react';
import Sidebar from '@/components/admin/adminSiderbar';
import ProfileSection from '@/components/admin/adminProfile';
import { CiMenuBurger } from "react-icons/ci";

export default function AdminLayoutWrapper({ children }) {
 const [sidebarOpen, setSidebarOpen] = useState(false);

 return (
 <div className="flex h-screen overflow-hidden bg-gray-100 font-inter">
 <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

  <div className="flex flex-col flex-1 overflow-y-auto">
<main className="p-4 md:p-8">
 <button
 className="md:hidden mb-4 text-2xl"
 onClick={() => setSidebarOpen(!sidebarOpen)}
 >
 <CiMenuBurger />
 </button>

 <ProfileSection />
 {children}
</main>
 </div>
 </div>
 );
}

