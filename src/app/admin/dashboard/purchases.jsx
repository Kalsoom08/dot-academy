'use client'
import React, { useState } from 'react';

const LatestPurchasesCard = () => {
  const [showAll, setShowAll] = useState(false);

  const purchases = [
    { id: 1, plan: 'Weekly Plan', user: 'Noman', device: 'Android', amount: 'RS. 500' },
    { id: 2, plan: 'Monthly Plan', user: 'Noman', device: 'Android', amount: 'RS. 500' },
    { id: 3, plan: 'Weekly Plan', user: 'Noman', device: 'IOS', amount: 'RS. 500' },
    { id: 4, plan: 'Weekly Plan', user: 'Noman', device: 'Android', amount: 'RS. 500' },
    { id: 5, plan: 'Weekly Plan', user: 'Noman', device: 'IOS', amount: 'RS. 500' },
    { id: 6, plan: 'Monthly Plan', user: 'Sara', device: 'Android', amount: 'RS. 1000' },
    { id: 7, plan: 'Annual Plan', user: 'Ali', device: 'IOS', amount: 'RS. 5000' },
  ];


  const visiblePurchases = showAll ? purchases : purchases.slice(0, 5);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full border border-[#E6E6E6]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="md:text-xl font-semibold text-[#282828]">Latest Purchases</h2>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-[#7D287E] hover:text-purple-800 font-medium text-sm focus:outline-none rounded-md px-2 py-1"
        >
          {showAll ? 'Show Less' : 'View All'}
        </button>
      </div>

      <div className="space-y-4">
        {visiblePurchases.map((purchase) => (
          <div key={purchase.id} className="flex items-center justify-between gap-10">
            <div>
              <p className="text-[#282828] md:font-medium">{purchase.plan}</p>
              <p className="text-[#A3A3A3] text-sm">{purchase.user} | {purchase.device}</p>
            </div>
            <div className="text-[#7D287E] font-semibold">
              {purchase.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestPurchasesCard;
