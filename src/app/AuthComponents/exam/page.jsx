'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../../components/AuthSiderbar';
import Header from '../../../components/AuthHeader';
import Footer from '../../../components/AuthFooter';
import ChangeExamModal from './changeExam'; 
import Protected from '@/components/ProtectedRoute';


const ChangeExamPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Header onMenuClick={() => setSidebarOpen(true)} />
       
        </div>
      </div>
      <Footer />

      <ChangeExamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Protected(ChangeExamPage);
