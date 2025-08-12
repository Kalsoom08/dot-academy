'use client'
import React from 'react'
import Image from 'next/image'
import course5 from '../../../../public/Courses/5.png'
import course from '../../../../public/Courses/4.png'
import { FiChevronRight } from 'react-icons/fi'
import {useRouter} from 'next/navigation';

const upNext = [
        { image: course, title: "Noun & its Classifications (Part-2) - English Grammar", weight: 'Docs | 5 Pages' },
        { image: course, title: "Worksheet: Noun & its classification", weight: 'Docs | 3 Pages' },
]

function SideShow() {
  const router = useRouter()
     return (
         <div className="flex flex-col gap-6 p-6 lg:block hidden">
            <div className="flex flex-col gap-3">
                <Image src={course5} alt="Course Image" />
                <h1 className="text-[18px] font-semibold">English Grammar Basic</h1>
                <p className="text-gray-700 text-[12px]">20 videos | 138 Docs | 18 Tests</p>
                <button className="border border-black text-black px-4 py-2 rounded-md">Go to Course</button>
                <button className="bg-black text-white px-4 py-2 rounded-md">Download PDF</button>
            </div>

            <div className="flex flex-col gap-3 mt-4">
                <h2 className="text-[18px] font-bold">Up Next</h2>
                {upNext.map((item, index) => (
                <div key={index} className="border border-black p-4 rounded-md flex justify-between items-center">
                <div>
                <h3 className="text-[16px] font-bold">{item.title}</h3>
                <p className="text-[12px] text-gray-600">{item.weight}</p>
            </div>
            <FiChevronRight className="text-black text-xl" />
          </div>
        ))}
      </div>
    </div>
    )
}

export default SideShow
