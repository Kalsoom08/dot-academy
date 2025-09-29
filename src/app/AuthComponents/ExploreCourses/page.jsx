
'use client';
import Footer from '../../../components/AuthFooter';
import Explore from '../ExploreCourses/explore';
import QuizQuestionCard from '../../../components/Quiz/QuizQuestionCard';
import Courses from '../ExploreCourses/Courses';

export default function ExploreCoursesPage() {
  

  return (
      <div className="flex h-screen flex-col">
     
          <main className="flex-1">
         <Courses />

          </main>
       
    

   
    </div>
  );
}
