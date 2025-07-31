"use client";
import React, { useState } from 'react';
import { FaEye, FaBars, FaSort } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import User from '../user';

const userList = [
  { name: 'Ahmed', number: '+923844105908', email: 'ahmed@gmail.com', courses: 5, platform: 'Android', subscription: 'None' },
  { name: 'Fiza m.', number: '+923844105908', email: 'fiza@gmail.com', courses: 6, platform: 'Android', subscription: 'Weekly' },
  { name: 'Hamza', number: '+923344109765', email: 'hamza@gmail.com', courses: 1, platform: 'Android', subscription: 'None' },
  { name: 'Sara Ali', number: '+923451112233', email: 'sara@gmail.com', courses: 4, platform: 'iOS', subscription: 'Monthly' },
  { name: 'Zeeshan', number: '+923456789000', email: 'zeeshan@gmail.com', courses: 2, platform: 'Web', subscription: 'None' },
  { name: 'Rabia Khan', number: '+923459876543', email: 'rabia@gmail.com', courses: 3, platform: 'Android', subscription: 'Weekly' },
  { name: 'Usman Tariq', number: '+923400123456', email: 'usman@gmail.com', courses: 7, platform: 'iOS', subscription: 'Yearly' },
];

function UserData() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('All');
  const [openActionIndex, setOpenActionIndex] = useState(null);
  const [visibleRows, setVisibleRows] = useState(userList.map(() => true));
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleActionToggle = index => {
    setOpenActionIndex(openActionIndex === index ? null : index);
  };

  const handleSort = () => {
    const newSort = sortBy === 'All' ? 'Courses' : 'All';
    setSortBy(newSort);
  };

  const sortedUsers = [...userList].sort((a, b) => {
    if (sortBy === 'Courses') {
      return b.courses - a.courses;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user => user.email.includes(search));

  const toggleVisibility = index => {
    const updated = [...visibleRows];
    updated[index] = !updated[index];
    setVisibleRows(updated);
  };

  return (
    <section className="p-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-semibold">User</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search By email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-2 w-64 focus:outline-none"
            />
            {search && (
              <MdClose
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                onClick={() => setSearch('')}
              />
            )}
          </div>
          <div className="relative">
            <button
              className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-full text-black"
              onClick={handleSort}
            >
              <FaSort className="text-sm" /> Sort By - {sortBy}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <table className="min-w-[800px] w-full border-separate border-spacing-y-0 m-auto">
          <thead>
            <tr className="text-purple-700 text-center font-normal">
              <th className="px-4 py-3 font-normal text-[14px]">User</th>
              <th className="px-4 py-3 font-normal text-[14px]">Number</th>
              <th className="px-4 py-3 font-normal text-[14px]">Email</th>
              <th className="px-4 py-3 font-normal text-[14px]">Enrolled Courses</th>
              <th className="px-4 py-3 font-normal text-[14px]">Platform</th>
              <th className="px-4 py-3 font-normal text-[14px]">Subscription</th>
              <th className="px-4 py-3 font-normal text-[14px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              visibleRows[index] && (
                <tr key={index} className="bg-white text-center">
                  <td className="px-4 py-6 border-b border-gray-200 text-[14px]">{user.name}</td>
                  <td className="px-4 py-6 border-b border-gray-200 text-[14px]">{user.number}</td>
                  <td className="px-4 py-6 border-b border-gray-200 text-[14px]">{user.email}</td>
                  <td className="px-4 py-6 border-b border-gray-200 text-[14px]">{user.courses}</td>
                  <td className="px-4 py-6 border-b border-gray-200 text-[14px]">{user.platform}</td>
                  <td className="px-4 py-6 border-b border-gray-200 text-[14px]">{user.subscription}</td>
                  <td className="px-4 py-6 border-b border-gray-200 text-[14px] relative">
                    <div className="flex items-center gap-3 justify-center">
                      <FaEye
                        className="text-purple-700 cursor-pointer"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowUserPopup(true);
                        }}
                      />
                      <FaBars
                        className="text-purple-700 cursor-pointer"
                        onClick={() => handleActionToggle(index)}
                      />
                    </div>
                    {openActionIndex === index && (
                      <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 shadow-md rounded z-10">
                        <ul className="text-sm text-gray-700">
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Copy user ID</li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Download user data</li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Disable user ID</li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
      {showUserPopup && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg/10 backdrop-blur-[1px]">
          <User onClose={() => setShowUserPopup(false)} user={selectedUser} />
        </div>
      )}
    </section>
  );
}

export default UserData;
