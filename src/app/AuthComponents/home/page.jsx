'use client';

import { useState } from 'react';
import Sidebar from '../../../components/AuthSiderbar';
import Header from '../../../components/AuthHeader';
import CourseCard from '../../AuthComponents/home/CourseCard';
import Footer from '../../../components/AuthFooter';
import Image from 'next/image';
import Banner from '../../../../public/dashboard/banner.png';
import TopContent from '../../AuthComponents/home/TopContentCard';
import StudyPkg from '../../AuthComponents/home/studyPkgCard';
import DoubtsCard from '../../AuthComponents/home/doubtsCard';
import Options from '../../AuthComponents/home/otherOptions';
import DashboardFooter from '../../AuthComponents/home/footer';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
     
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1">
            <div className="flex justify-center py-12 px-6">
              <Image src={Banner} alt="banner" />
            </div>
            <CourseCard />
            <TopContent />
            <StudyPkg />
            <DoubtsCard/>
            <Options/>
            <DashboardFooter/>

          </main>
        </div>
      </div>

      <Footer/>
    </div>
  );
}






