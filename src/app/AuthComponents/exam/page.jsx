'use client';

import { useEffect } from 'react';
import Sidebar from '../../../components/AuthSiderbar';
import Header from '../../../components/AuthHeader';
import Footer from '../../../components/AuthFooter';
import ChangeExamModal from './changeExam';
import { useChangeExamModal } from '../../../context/ChangeExamModalContext';

const ChangeExamPage = () => {
  const { openChangeExamModal } = useChangeExamModal();

  useEffect(() => {
    openChangeExamModal();
  }, [openChangeExamModal]);

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={false} onClose={() => {}} />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Header onMenuClick={() => {}} />
        </div>
      </div>
      <Footer />

      <ChangeExamModal />
    </div>
  );
};

export default ChangeExamPage;
