'use client';

import Image from 'next/image';
import Notes from '../../../../public/dashboard/notes.png';
import Planes from '../../../../public/dashboard/plans.png';
import Course from '../../../../public/dashboard/course.png';
import Student from '../../../../public/dashboard/student.png';

const OtherOptions = () => {
  const optionData = [
    {
      title: "All Unattempted Tests",
      description: "View them at one place",
      icon: Notes,
    },
    {
      title: "Our Pricing Plan",
      description: "Check pricing plan with lower price",
      icon: Planes,
    },
    {
      title: "Explore Courses",
      description: "Check courses of all exams and classes",
      icon: Course,
    },
    {
      title: "Refer and Earn",
      description: "Invite friends and get RS.120",
      icon: Student,
    },
  ];

  return (
    <div className="mt-12 px-4 sm:px-6 lg:px-10">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 ">Other Options</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {optionData.map((data, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-5 hover:shadow-lg transition duration-300 border border-gray-300"
          >
            <div className="flex justify-center mb-4 ">
              <Image src={data.icon} alt={data.title} className="w-12 h-12" />
            </div>
            <h2 className="text-lg font-semibold text-center  mb-2">{data.title}</h2>
            <p className="text-sm text-gray-600 text-center">{data.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherOptions;
