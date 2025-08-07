import { useState } from "react";
import Image from 'next/image';
import Exam from '../../../public/Blogs/2.png'

export default function ExamChecklist() {
  const [checkedItems, setCheckedItems] = useState([1]);

  const handleToggle = (index) => {
    setCheckedItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col gap-6 mt-6 hidden lg:block">
        <div className="w-64 p-4 bg-white rounded-lg shadow-md space-y-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <label
          key={index}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={checkedItems.includes(index)}
            onChange={() => handleToggle(index)}
            className="w-4 h-4 text-purple-600 bg-white border-2 border-purple-600 rounded focus:ring-0"
          />
          <span className="text-sm text-gray-800">Exam for 10th class</span>
        </label>
      ))}
    </div>
      <Image src={Exam} width={260} className="rounded-md mt-6"/>
    </div>
  );
}
