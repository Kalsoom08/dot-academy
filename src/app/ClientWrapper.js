'use client';

import { usePathname } from 'next/navigation';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

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
    
    '/login',
    '/signup'
  ];

  const shouldHide = hideNavAndFooter.some(path => pathname.startsWith(path));

  return (
    <>
      {!shouldHide && <Navbar />}
      {children}
      {!shouldHide && <Footer />}
    </>
  );
}
