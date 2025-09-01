'use client';
import { useState } from 'react';
import Sidebar from '../../../components/AuthSiderbar';
import Header from '../../../components/AuthHeader';
import Footer from '../../../components/AuthFooter';
import PriceSection from '../pricingPlan/priceSection';
import AboutPrice from './aboutPrice';
import Protected from '@/components/ProtectedRoute';



const page = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
      <div className="flex h-screen flex-col bg-white">
         
          <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            <div className="flex-1 flex flex-col overflow-y-auto">
              <Header onMenuClick={() => setSidebarOpen(true)} />
              <main className="flex-1">
                <PriceSection/>
                <AboutPrice/>
    
              </main>
            </div>
          </div>
    
          <Footer/>
        </div>
  )
}

export default Protected(page)