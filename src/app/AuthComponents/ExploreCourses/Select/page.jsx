'use client';
import React from 'react';
import { 
  Book, Pencil, GraduationCap, Calculator, Atom, Globe, 
  FlaskConical, Laptop, PenTool, Music, Paintbrush, Languages, 
  ChevronRight
} from "lucide-react";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";

const classData = [
  { icon: Book, title: "LKG" },
  { icon: Pencil, title: "UKG" },
  { icon: GraduationCap, title: "Class 1" },
  { icon: Calculator, title: "Class 2" },
  { icon: Atom, title: "Class 3" },
  { icon: Globe, title: "Class 4" },
  { icon: FlaskConical, title: "Class 5" },
  { icon: Laptop, title: "Class 6" },
  { icon: PenTool, title: "Class 7" },
  { icon: Music, title: "Class 8" },
  { icon: Paintbrush, title: "Class 9" },
  { icon: Languages, title: "Class 10" },
];

// Simple fade-in animation
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.8, ease: "easeInOut" }
  }
};

const Page = () => {
  const router = useRouter();
  const handleCourses = () => {
    router.push('/AuthComponents/ExploreCourses/Courses');
  };

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Choose Your Class</h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 lg:px-20 px-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {classData.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              variants={fadeIn}
              className="bg-white border border-gray-200 rounded-md px-4 py-2 flex justify-between items-center hover:scale-105 transition-all cursor-pointer"
              onClick={handleCourses}
            >
              <div className="flex gap-6 items-center">
                <Icon size={25} className="text-[#7D287E]" />
                <h2 className="text-lg font-medium">{item.title}</h2>
              </div>
              <ChevronRight size={22} className="text-gray-400" />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Page;
