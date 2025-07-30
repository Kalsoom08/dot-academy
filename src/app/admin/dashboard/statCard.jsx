import React from 'react';
import {
  FaUser,
  FaUsers,
  FaSearch,
  FaBook,
  FaBell,
  FaDollarSign,
  FaFileAlt,
  FaCommentDots,
} from 'react-icons/fa';


const dashboard = () => {
  const statCards = [
    { icon: <FaUser />, title: 'Total User', value: '2,895' },
    { icon: <FaUsers />, title: 'Total Subscribed', value: '80' },
    { icon: <FaSearch />, title: 'Total MCQs Attempted', value: '3,500' },
    { icon: <FaBook />, title: 'Total Courses', value: '3000' },
    { icon: <FaBell />, title: 'Total Notification', value: '43' },
    { icon: <FaDollarSign />, title: 'Total Sales', value: '120' },
    { icon: <FaFileAlt />, title: 'Total Documents Viewed', value: '43' },
    { icon: <FaCommentDots />, title: 'Support Requests', value: '1' },
  ];


  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-md flex items-center justify-between space-x-4"
        >
          <div>
          <div className="p-3 rounded-full bg-[#ED9DA0] text-white w-12 h-12 flex items-center justify-center" >
            {card.icon}
          </div>
          <p className="text-sm text-[#A3A3A3] pt-2">{card.title}</p>
            </div>
          <div>
            
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default dashboard
