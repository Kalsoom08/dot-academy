'use client';

import { Inter } from 'next/font/google';
import '../../globals.css';
import LayoutWrapper from './layoutWrapper';
import Protected from '@/components/ProtectedRoute';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

function RootLayout({ children }) {
  return (
    // Remove html and body tags - just return the content directly
    <div className={inter.variable}>
      <LayoutWrapper>{children}</LayoutWrapper>
    </div>
  );
}

export default RootLayout;