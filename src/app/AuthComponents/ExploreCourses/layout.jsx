import { Inter } from 'next/font/google';
import '../../globals.css';
import LayoutWrapper from './layoutWrapper';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'My Shared Layout App',
  description: 'A Next.js app with consistent layout across pages',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
