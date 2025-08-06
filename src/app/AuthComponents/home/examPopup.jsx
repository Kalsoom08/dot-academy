'use client';

import { FiChevronRight } from "react-icons/fi";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CiSearch } from "react-icons/ci";

import ilets from '../../../../public/exams/ilets.png';
import giki from '../../../../public/exams/giki.png';
import ecat from '../../../../public/exams/ecat.png';
import mdcat from '../../../../public/exams/mdcat.png';
import net from '../../../../public/exams/net.png';
import pms from '../../../../public/exams/pms.png';
import icon1 from '../../../../public/Explore/1.png';
import icon2 from '../../../../public/Explore/2.png';

const exams = [
  { name: "IELTS", icon: ilets },
  { name: "NET", icon: net },
  { name: "MDCAT", icon: mdcat },
  { name: "ECAT", icon: ecat },
  { name: "GIKI", icon: giki },
  { name: "PMS", icon: pms },
];

export default function ExamPopup() {
  const router = useRouter();

  const handleRedirectToCourses = () => {
    router.push('/AuthComponents/ExploreCourses/Courses');
  };

  return (
    <div className="h-screen lg:h-auto overflow-y-auto px-4 sm:px-4 space-y-10">
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-center">Select Exam</h2>

        <div className="flex flex-col gap-3">
        
          <div className="relative">
            <CiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            <input
              className="border border-[#282828] rounded-full w-full p-2 pl-10"
              type="search"
              placeholder="Search"
              aria-label="Search Exams"
            />
          </div>

          <div className="flex flex-col gap-3">
            <div
              className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition"
              onClick={handleRedirectToCourses}
            >
              <div className="flex items-center gap-4">
                <Image src={icon1} alt="Class Icon" width={30} height={30} />
                <span>Class 1 to Class 12</span>
              </div>
              <FiChevronRight />
            </div>

            <div
              className="bg-white rounded-xl shadow-md p-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition"
              onClick={handleRedirectToCourses}
            >
              <div className="flex items-center gap-4">
                <Image src={icon2} alt="Entrance Exam" width={30} height={30} />
                <span>Entrance Exam</span>
              </div>
              <FiChevronRight />
            </div>
          </div>
        </div>
      </section>

   
      <section>
        <h2 className="text-lg font-bold text-center mb-4">Popular Exam</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {exams.map((exam, idx) => (
            <button
              key={idx}
              className="flex items-center justify-between bg-white border rounded-lg px-4 py-2 shadow hover:shadow-md transition"
              onClick={handleRedirectToCourses}
            >
              <div className="flex items-center gap-2">
                <Image src={exam.icon} alt={exam.name} width={24} height={24} />
                <span>{exam.name}</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Others Button */}
      <section className="text-center w-full">
        <button
          className="w-full px-6 py-3 bg-[#282828] text-white rounded-md text-sm font-bold hover:bg-gray-900 transition"
          onClick={handleRedirectToCourses}
        >
          Others
          <div className="text-xs font-normal mt-1 text-purple-100">
            Graduation, Coding, Language, Startup etc.
          </div>
        </button>
      </section>
    </div>
  );
}
