'use client';
import ExamChecklist from "./examCheckList";
import DropDown from "./dropdown";
import Card from "./card";
import MCQs from "./mcqs";

const BlogDetail = () => {
  return (
    <div>
        <DropDown />
        <div className='grid grid-cols-[75%_25%] px-8 gap-6 justify-between'>
          <Card/>
          <ExamChecklist />
        </div>
        <MCQs />
        
    </div>
  )
}

export default BlogDetail