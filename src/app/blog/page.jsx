'use client';

import DropDown from '../../sections/BlogPost/dropdown';
import Card from '../../sections/BlogPost/card';
import MCQs from '../../sections/BlogPost/mcqs';
const page = () => {
  return (
    <div>
        <DropDown/>
        <Card/>
        <MCQs/>
    </div>
  )
}

export default page