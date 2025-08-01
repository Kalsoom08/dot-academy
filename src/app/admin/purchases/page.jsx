'use client'
import React, { useState, useEffect } from 'react';
import { RxChevronDown as ChevronDown, RxMixerHorizontal as SlidersHorizontal } from 'react-icons/rx';

const initialData = [
  { user: 'Ali Raza', email: 'Aliraza330@gmail.com', plan: 'Weekly Plan', status: 'expired', price: 'Rs. 590', platform: 'Android', purchasedAt: '20 May 2025 10:17 AM' },
  { user: 'Ali Raza', email: 'Aliraza330@gmail.com', plan: 'Weekly Plan', status: 'expired', price: 'Rs. 5590', platform: 'IOS', purchasedAt: '2 May 2025 10:17 AM' },
  { user: 'Ali Raza', email: 'Aliraza330@gmail.com', plan: 'Weekly Plan', status: 'expired', price: 'Rs. 5590', platform: 'Android', purchasedAt: '20 May 2025 10:17 AM' },
  { user: 'Ali Raza', email: 'Aliraza330@gmail.com', plan: 'Weekly Plan', status: 'Active', price: 'Rs. 5590', platform: 'IOS', purchasedAt: '20 May 2025 10:17 AM' },
  { user: 'Ali Raza', email: 'Aliraza330@gmail.com', plan: 'Weekly Plan', status: 'Active', price: 'Rs. 5590', platform: 'Android', purchasedAt: '20 May 2025 10:17 AM' },
  { user: 'Ali Raza', email: 'Aliraza330@gmail.com', plan: 'Weekly Plan', status: 'Active', price: 'Rs. 5590', platform: 'Android', purchasedAt: '20 May 2025 10:17 AM' },
  { user: 'Ali Raza', email: 'Aliraza330@gmail.com', plan: 'Weekly Plan', status: 'expired', price: 'Rs. 5590', platform: 'Android', purchasedAt: '20 May 2025 10:17 AM' },
];

const Purchases = () => {
  const [data, setData] = useState(initialData);
  const [sortBy, setSortBy] = useState('All');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    let sortedData = [...initialData];

    if (sortBy === 'Price') {
      sortedData.sort((a, b) => {
        const priceA = parseFloat(a.price.replace('Rs. ', ''));
        const priceB = parseFloat(b.price.replace('Rs. ', ''));
        return sortDirection === 'asc' ? priceA - priceB : priceB - priceA;
      });
    } else if (sortBy === 'Recent') {
      sortedData.sort((a, b) => {
        const dateA = new Date(a.purchasedAt);
        const dateB = new Date(b.purchasedAt);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }

    setData(sortedData);
  }, [sortBy, sortDirection]);

  const handleSortChange = (e) => setSortBy(e.target.value);

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">Purchase History</h1>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg py-2 px-3 text-sm font-medium text-gray-700 relative cursor-pointer group hover:bg-gray-200 transition-colors">
              <SlidersHorizontal className="h-4 w-4 text-gray-500" />
              <label htmlFor="sort-dropdown" className="sr-only">Sort By</label>
              <span className="pr-4">Sort By - {sortBy}</span>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-hover:rotate-180 transition-transform" />
              <select
                id="sort-dropdown"
                className="absolute inset-0 opacity-0 cursor-pointer"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="All">All</option>
                <option value="Recent">Recent</option>
                <option value="Price">Price</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-200 text-[#7D287E] text-sm font-medium">
                <th className="py-3 pr-4">User</th>
                <th className="py-3 pr-4">Subscription plan</th>
                <th className="py-3 pr-4">Price</th>
                <th className="py-3 pr-4">Platform</th>
                <th className="py-3 pr-4 text-right">Purchased At</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => {
                const [date, time] = item.purchasedAt.split(' ').length >= 4
                  ? [item.purchasedAt.split(' ').slice(0, 3).join(' '), item.purchasedAt.split(' ').slice(3).join(' ')]
                  : [item.purchasedAt, ''];

                return (
                  <tr key={index} className="border-b border-[#A3A3A3] last:border-b-0 text-sm sm:text-base">
                    <td className="py-4 pr-4">
                      <div className="flex flex-col ">
                        <span className="font-semibold text-[#282828]">{item.user}</span>
                        <span className="text-sm text-[#A3A3A3]">{item.email}</span>
                      </div>
                    </td>

                    <td className="py-4 pr-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <span className="text-[#282828]">{item.plan}</span>
                        <span className={`text-sm font-medium ${item.status === 'expired' ? 'text-[#D96060]' : 'text-[#2DA771]'}`}>
                          ({item.status})
                        </span>
                      </div>
                    </td>

                    <td className="py-4 pr-4 text-[#282828]">{item.price}</td>
                    <td className="py-4 pr-4 text-[#282828]">{item.platform}</td>
                    <td className="py-4 pr-4 text-right text-[#282828] text-sm">
                      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-end sm:space-x-1">
                        <span>{date}</span>
                        <span className="sm:inline block">{time}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Purchases;
