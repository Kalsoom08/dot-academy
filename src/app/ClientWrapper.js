'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { SupportModalProvider } from '../context/SupportModalContext';
import SupportModal from './AuthComponents/support/supportModal';
import ChangeExamModal from './AuthComponents/exam/changeExam';
import { ChangeExamModalProvider } from '../context/ChangeExamModalContext';
import LoginModal from '@/components/LoginModal';
import SignupModal from '@/components/SignupModal';

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const hideNavAndFooter = [
    '/AuthComponents/home', '/AuthComponents/ExploreCourses',
    '/AuthComponents/pricingPlan', '/AuthComponents/exam',
    '/AuthComponents/support', '/AuthComponents/profile',
    '/AuthComponents/profile/unattemptedTest',
    '/profile/setupProfile', '/admin'
  ];

  const shouldHide = hideNavAndFooter.some(path => pathname.startsWith(path));


  useEffect(() => {
    const openLogin = () => setShowLogin(true);
    const closeLogin = () => setShowLogin(false);

    window.addEventListener("open-login-modal", openLogin);
    window.addEventListener("close-login-modal", closeLogin);

    return () => {
      window.removeEventListener("open-login-modal", openLogin);
      window.removeEventListener("close-login-modal", closeLogin);
    };
  }, []);

  return (
    <>
      {!shouldHide && <Navbar />}
      <SupportModalProvider>
        <ChangeExamModalProvider>
          {children}

    
          {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
          {showSignup && <SignupModal onClose={() => setShowSignup(false)} />}
          <SupportModal />
          <ChangeExamModal />
        </ChangeExamModalProvider>
      </SupportModalProvider>
      {!shouldHide && <Footer />}
    </>
  );
}
