'use client';

import { useState, useEffect } from 'react';
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

import Modal from './modal';
import ExamPopup from './examPopup';
import { motion } from 'framer-motion';
import Protected from '@/components/ProtectedRoute';


function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showExploreModal, setShowExploreModal] = useState(true); 


  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExploreModal(true);
    }, 200); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <Modal isOpen={showExploreModal} onClose={() => setShowExploreModal(false)}>
        <ExamPopup />
      </Modal>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col overflow-y-auto">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center py-12 px-6"
            >
              <Image src={Banner} alt="banner" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <CourseCard />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TopContent />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <StudyPkg />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <DoubtsCard />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Options />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <DashboardFooter />
            </motion.div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Protected(Home)
