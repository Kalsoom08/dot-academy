"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FaEdit, FaTrash, FaPlus, FaChevronDown, FaChevronUp, FaBars, FaHashtag } from 'react-icons/fa';
import course from '../../../../../public/Categories/category.png';
import { TbLayoutDashboardFilled } from 'react-icons/tb';
import AddCategory from '../addCategory';

const categoryTree = [
  {
    id: 1,
    name: 'MDCAT',
    type: 'Category',
    tagColor: 'bg-green-100 text-green-800',
    courses: 45,
    children: [
      {
        id: 2,
        name: 'Exam',
        type: 'Subject',
        tagColor: 'bg-blue-100 text-blue-800',
        courses: 45,
        children: [
          {
            id: 3,
            name: 'Exam',
            type: 'Topic',
            tagColor: 'bg-yellow-100 text-yellow-800',
            courses: 45,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: 'MDCAT',
    type: 'Category',
    tagColor: 'bg-green-100 text-green-800',
    courses: 45,
    children: [
      {
        id: 5,
        name: 'Exam',
        type: 'Subject',
        tagColor: 'bg-blue-100 text-blue-800',
        courses: 45,
        children: [
          {
            id: 6,
            name: 'Exam',
            type: 'Topic',
            tagColor: 'bg-yellow-100 text-yellow-800',
            courses: 45,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    name: 'NUMS',
    type: 'Category',
    tagColor: 'bg-green-100 text-green-800',
    courses: 30,
    children: [
      {
        id: 9,
        name: 'NUMS Child',
        type: 'Subject',
        tagColor: 'bg-blue-100 text-blue-800',
        courses: 10,
        children: [],
      },
    ],
  },
  {
    id: 8,
    name: 'ECAT',
    type: 'Category',
    tagColor: 'bg-green-100 text-green-800',
    courses: 25,
    children: [
      {
        id: 10,
        name: 'ECAT Child',
        type: 'Subject',
        tagColor: 'bg-blue-100 text-blue-800',
        courses: 12,
        children: [],
      },
    ],
  },
];

function CategoryCard({ category, level = 0, defaultExpanded = false }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const toggle = () => setExpanded(!expanded);

  const iconMap = {
    Category: expanded ? <FaChevronUp className="text-gray-500 cursor-pointer" onClick={toggle} /> : <FaChevronDown className="text-gray-500 cursor-pointer" onClick={toggle} />,
    Subject: <FaBars className="text-gray-500 cursor-pointer" onClick={toggle} />,
    Topic: <FaHashtag className="text-gray-500" />,
  };

  const marginLeft = level === 1 ? 'ml-6' : level === 2 ? 'ml-12' : level === 3 ? 'ml-20' : '';

  return (
    <div className="space-y-2">
      <div className={`flex flex-wrap items-center justify-between rounded-lg px-4 py-3 border border-gray-200 ${marginLeft}`}> 
        <div className="flex items-center gap-4">
          {iconMap[category.type]}
          {category.type === 'Category' && <TbLayoutDashboardFilled  className="text-gray-600" />}
          <Image src={course} alt="category" width={40} height={40} className="rounded" />
          <span className="text-lg font-medium">{category.name}</span>
          <span className={`text-sm font-semibold px-4 py-1 rounded-full ${category.tagColor}`}>{category.type}</span>
        </div>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <span className="text-sm text-gray-600">{category.courses} Courses</span>
          <FaEdit className="text-[#7d287e] cursor-pointer hover:opacity-80" />
          <FaTrash className="text-[#7d287e] cursor-pointer hover:opacity-80" />
        </div>
      </div>
      {expanded && category.children && category.children.map(child => (
        <CategoryCard key={child.id} category={child} level={level + 1} defaultExpanded={false} />
      ))}
    </div>
  );
}

function CategoryManager() {
  const [showAddPopup, setShowAddPopup] = useState(false);
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <div className="max-w-5xl mx-auto bg-white  p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-semibold">Category Manager</h1>
         <button
          onClick={() => setShowAddPopup(true)}
          className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaPlus size={14} /> Add Category
          </button>
        </div>
        <div className="space-y-4">
            <h1 className='text-[20px]'>Exam</h1>
          {categoryTree.map((cat, index) => (
            <CategoryCard key={cat.id} category={cat} defaultExpanded={index === 0} />
          ))}
        </div>
      </div>
      {showAddPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg/10 backdrop-blur-[1px]">
    <AddCategory onClose={() => setShowAddPopup(false)} />
  </div>
)}
    </div>
  );
}

export default CategoryManager;
