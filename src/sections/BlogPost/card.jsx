import Image from 'next/image';
import blog from '../../../public/Blogs/1.png'
export default function ContentCards() {
  return (
    <div className="mt-6 text-justify">
      <Image src={blog} className='my-6'/>
      <Card
        title="Chapter-wise Class 10 Maths MCQs with Solutions and Answer Keys"
        content={
            <>
            <p>You can find CBSE Class 10 Maths MCQ in PDF format here. Recently, the CBSE board announced a significant change in the Class 10 exam pattern. The board has decided to introduce more Multiple Choice Questions in the exam. Per the new exam pattern, at least 25% of the CBSE Class 10 Maths question paper will consist of MCQs.</p>
            <p>Most students are happy thinking that MCQs are easier and feel relaxed, assuming that they don't need to write descriptive answers. But it is important to remember that they need a lot of practice for solving Class 10 Maths MCQ Questions with Answers. Also, solving MCQ Questions for Class 10 Maths with Answers correctly needs a lot of critical thinking. Therefore, the CBSE Board has provided MCQs Type Questions For Maths Class 10 in this article to assist students in preparing for the exam. Solving Maths MCQ Class 10 can help students get familiar with the format and difficulty level of the MCQs, and it can also help them in developing their critical thinking skills.</p>
 

        </>
        }
      />
      
      <Card
        title="Advance in Studies with Class 10 Maths MCQ Questions with Answers PDF"
        content={
          <>
            <p className="mb-2">
              We strive to assist students in preparing effectively for the challenging Maths MCQs Questions For Class 10. By practising MCQ Questions for Class 10 Maths with Answers PDF Download, students can boost their confidence and face exams more easily. Maths MCQ Class 10 are essential for achieving a good rank in the board exams.
            </p>
            <p className="mb-2">
              This article contains a comprehensive list of chapter-wise MCQ Questions for Class 10 Maths with Answers PDF Download. Subject experts have carefully curated these questions to cover all the essential concepts and topics from each chapter. By solving Maths MCQ Class 10, students can test their knowledge and understanding of the subject and also identify their strengths and weaknesses.
            </p>
            <p>
              With regular practice and analysis of their performance, students can improve their speed, accuracy and problem-solving skills, which are crucial for scoring well in the CBSE Class 10 Maths MCQ. Our MCQs aim to provide students with the best resources to prepare for the exams, and the MCQ Questions for Class 10 Maths with Answers PDF Download is a valuable addition to their study materials.
            </p>
          </>
        }
      />
    </div>
  );
}

function Card({ title, content }) {
  return (
    <div className="bg-white">
      <h2 className="font-semibold text-lg mb-2">{title}</h2>
      <div className="text-sm text-gray-700">{content}</div>
    </div>
  );
}
