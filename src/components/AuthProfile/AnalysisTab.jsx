'use client';
import React from 'react';
import Image from 'next/image';
import { PiFileTextLight } from 'react-icons/pi';
import { FaCheckCircle } from 'react-icons/fa';
import Profile from '../../../public/profile/profile.png';

const YourAnalysisTab = ({ router, courses, quizAttempts, unattemptedTests, docViews }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} className="bg-white rounded-lg shadow-md p-6 grid gap-5 justify-between">
                <div className="flex items-center">
                  <img
                    src={course.image || "https://placehold.co/50x50/e0e0e0/000000?text=C"}
                    alt={course.name}
                    className="w-12 h-12 rounded-lg mr-4"
                  />
                  <span className="text-lg font-semibold text-gray-800">{course.name}</span>
                </div>
                <div className="flex space-x-3 justify-center mt-4 sm:mt-0">
                  <button
                    onClick={() => router.push(`/AuthComponents/ExploreCourses/CourseDetail/${course._id}`)}
                    className="px-4 py-1 bg-black text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    Explore
                  </button>
                </div>
              </div>
            ))
          ) : (
           <div className="col-span-full flex justify-center items-center">
          <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] bg-white rounded-lg shadow-md p-8 text-center">
            <h1 className="text-lg font-semibold text-gray-700">No courses enrolled yet</h1>
          </div>
        </div>

          )}
        </div>

        {/* <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md">
          <PiFileTextLight className="h-24 w-24 text-yellow-600 mb-4" />
          {quizAttempts && quizAttempts.length > 0 ? (
            <>
              <p className="text-gray-600 text-center mb-6">
                You have attempted {quizAttempts.length} test(s)
              </p>
              <button
                className="px-8 py-3 bg-[#7C287D] text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-200"
                onClick={() => router.push('/AuthComponents/profile/attemptedTest')}
              >
                View Attempted Tests
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-600 text-center mb-6">You haven't attempted any test yet</p>
              <button
                className="px-8 py-3 bg-[#7C287D] text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-200"
                onClick={() => router.push('/AuthComponents/profile/test')}
              >
                View All Unattempted Tests
              </button>
            </>
          )}
        </div> */}

        {/* <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-800">Docs and videos</h3>
          {docViews && docViews.length > 0 ? (
            <ul className="space-y-3">
              {docViews.map((doc) => (
                <li key={doc._id} className="p-4 bg-white rounded-lg shadow-md">
                  <p className="font-semibold">{doc.lesson?.title}</p>
                  <p className="text-gray-600 text-sm">{doc.course?.name}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md text-center">
              <Image src={Profile} alt="empty" className="w-20 h-20 mb-6 opacity-70" />
              <p className="text-gray-600 mb-6">You haven't viewed any document and video yet</p>
              <button className="px-6 py-2 bg-black text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors duration-200">
                Start Learning
              </button>
            </div>
          )}
        </div> */}
      </div>

      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Plan Started Rs. 500 monthly</h2>
          <ul className="space-y-3 mb-6">
            {[
              'Access To lock Content',
              'Unlimited Practice Test',
              'Personalized Analysis',
              'Remove Ads',
            ].map((item, index) => (
              <li key={index} className="flex items-center text-gray-700">
                <FaCheckCircle className="text-purple-600 mr-2" style={{ color: '#8a40af' }} />
                {item}
              </li>
            ))}
          </ul>
          <button className="w-full py-3 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default YourAnalysisTab;
