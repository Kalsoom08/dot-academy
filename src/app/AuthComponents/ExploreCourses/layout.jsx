'use client';

import { Inter } from 'next/font/google';
import '../../globals.css';
import LayoutWrapper from './layoutWrapper';
import Protected from '@/components/ProtectedRoute';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

export default (RootLayout);
