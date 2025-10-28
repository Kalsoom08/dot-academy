'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../../../components/AuthSiderbar';
import Header from '../../../components/AuthHeader';
import Footer from '../../../components/AuthFooter';
import PricingPlanModal from './priceSection';

const PricingPlanPage = () => {
  const [showPricingModal, setShowPricingModal] = useState(false);

  useEffect(() => {
    setShowPricingModal(true);
  }, []);

  const handleClosePricingModal = () => {
    setShowPricingModal(false);
    // Optionally redirect back or close the page
    window.history.back();
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={false} onClose={() => {}} />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Header onMenuClick={() => {}} />
          {/* Main content area - can have background content */}
          <div className="flex-1 p-4 bg-gray-50">
            <div className="max-w-4xl mx-auto mt-8 text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Pricing Plans</h1>
              <p className="text-gray-600">Select from our affordable pricing options</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {showPricingModal && (
        <PricingPlanModal 
          isOpen={showPricingModal} 
          onClose={handleClosePricingModal} 
        />
      )}
    </div>
  );
};

export default PricingPlanPage;