'use client';
import React from 'react';
import { PiClock } from 'react-icons/pi'; 
import Image from 'next/image'; 
import Pic from '../../../public/profile/eng.png';
import Pic2 from '../../../public/profile/eng2.png';

const YourActivityTab = ({ setActiveTab }) => {

  const activities = [
    {
      id: 1,
      title: 'NEET',
      imageSrc: Pic,
   
      action: 'View Report',
      
    },
    {
      id: 2,
      title: 'Grammar Course',
      imageSrc: Pic,
    
      action: 'View Plan',
    
    },
 
  ];


  const docs = [
    {
      title: "Worksheet: Noun and it’s classification",
      img: Pic2,
      updatedAt : '4 Days Ago '
    },
    {
      title: "Pronoun and its Types",
      img: Pic2,
      updatedAt : '2 Days Ago '
    },
  ]
  return (
    <div className="space-y-6"> 
      <h2 className="text-xl font-bold text-gray-800">Attempted Tests</h2>

      {activities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
          {activities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start sm:justify-between gap-4">
             
              <div className="flex items-center">
                <Image
                  src={activity.imageSrc} 
                  alt={`${activity.title} Logo`}
                  className="w-12 h-12 rounded-lg mr-4 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                
                </div>

              </div>

              
              <div className="flex justify-center gap-4 mt-4 sm:mt-0">
             
                <button className="px-4 py-1 border border-gray-300 rounded-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  Explore
                </button>
                <button className="px-4 py-1 bg-black text-white rounded-sm hover:bg-purple-700 transition-colors duration-200">
                  {activity.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
      
        <div className="bg-white rounded-lg shadow-md p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
          <PiClock className="h-24 w-24 text-blue-500 mb-4" />
          <p className="text-gray-600 mb-6">No activity recorded yet. Start exploring or taking tests to see your progress here!</p>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
            onClick={() => setActiveTab('your analysis')} 
          >
            Go to Your Analysis
          </button>
        </div>
      )}


    {/* Doc */}

    <h2 className="text-xl font-bold text-gray-800 mt-8">Docs & Videos</h2>

      {docs.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-1  gap-5">
          {docs.map((doc, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex  items-start sm:justify-between gap-4">
              <div className="flex items-center">
                <div>
                <Image
                  src={doc.img}
                  alt={`${doc.title} thumbnail`}
                  className="w-12 h-12 rounded-lg mr-4 object-cover"
                  width={48} 
                  height={48}
                />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{doc.title}</h3>
                  {doc.updatedAt && <p className="text-sm text-gray-600">{doc.updatedAt}</p>}
                </div>
              </div>
           
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
          <PiClock className="h-24 w-24 text-gray-400 mb-4" /> 
          <p className="text-gray-600 mb-6">You haven't viewed any documents or videos yet. Start learning!</p>
          <button
            className="px-6 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
            onClick={() => {}}
          >
            Start Learning
          </button>
        </div>
      )}
    </div>
  );
};

export default YourActivityTab;
