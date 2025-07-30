'use client';

import { useState } from 'react';
import Sidebar from '@/components/adminSiderbar';
import ProfileSection from '@/components/adminProfile';
import { CiMenuBurger } from "react-icons/ci";

export default function AdminLayoutWrapper({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100 font-inter">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

     
      <main className="flex-1 p-4 md:p-8">
       
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
  );
}
