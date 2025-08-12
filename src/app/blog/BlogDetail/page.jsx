'use client';

import ExamChecklist from "@/sections/BlogPost/examCheckList";
import DropDown from "@/sections/BlogPost/dropDown";
import Card from "@/sections/BlogPost/card";
import MCQs from "@/sections/BlogPost/mcqs";

const page = () => {
  return (
    <div>
        <DropDown />
        <div className='grid grid-cols-[75%_25%] px-8 gap-6 justify-between'>
          <Card />
        </div>
        <MCQs />
        
    </div>
  )
}

export default page