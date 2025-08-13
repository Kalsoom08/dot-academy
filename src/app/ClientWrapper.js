'use client';

import { usePathname } from 'next/navigation';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { SupportModalProvider } from '../context/SupportModalContext'; 
import SupportModal from './AuthComponents/support/supportModal';
import ChangeExamModal from './AuthComponents/exam/changeExam';
import {ChangeExamModalProvider} from '../context/ChangeExamModalContext';
import AuthEntranceFooter from '@/components/AuthProfile/AuthEntranceFooter';

export default function ClientWrapper({ children }) {
  const pathname = usePathname();

  const hideNavAndFooter = [
    '/AuthComponents/home',
    '/AuthComponents/ExploreCourses',
    '/AuthComponents/pricingPlan',
    '/AuthComponents/exam',
    '/AuthComponents/support',
    '/AuthComponents/profile',
    '/AuthComponents/profile/unattemptedTest',
    '/profile/setupProfile',
    '/admin',
    '/login',
    '/signup'
  ];

  const shouldHide = hideNavAndFooter.some(path => pathname.startsWith(path));

  return (
    <>
      {!shouldHide && <Navbar />}
    <SupportModalProvider>
      <ChangeExamModalProvider>
        {children}
        <SupportModal />
        <ChangeExamModal />
      </ChangeExamModalProvider>
    </SupportModalProvider>
      {!shouldHide && <Footer />}
    </>
  );
}
