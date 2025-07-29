'use client';
import { useState } from 'react';
import Sidebar from '../../../components/AuthSiderbar';
import Header from '../../../components/AuthHeader';
import Footer from '../../../components/AuthFooter';
import ProfileDashboard from './profileDashboard';
import Test from './test/page';


const page = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
      <div className="flex h-screen flex-col">
         
          <div className="flex flex-1 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            
            <div className="flex-1 flex flex-col overflow-y-auto">
              <Header onMenuClick={() => setSidebarOpen(true)} />
              <main className="flex-1">
                <ProfileDashboard/>
                {/* <Test/> */}
            
                
               
              </main>
            </div>
          </div>
    
          <Footer/>
        </div>
  )
}

export default page