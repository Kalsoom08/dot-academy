'use client';

import { Inter } from 'next/font/google';
import '../../globals.css';
import LayoutWrapper from './layoutWrapper';
import Protected from '@/components/ProtectedRoute';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Add this for better loading
});

function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

export default RootLayout;