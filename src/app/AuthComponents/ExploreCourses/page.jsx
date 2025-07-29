
'use client';
import Footer from '../../../components/AuthFooter';
import Explore from '../ExploreCourses/explore';

export default function ExploreCoursesPage() {
  

  return (
      <div className="flex h-screen flex-col">
     
          <main className="flex-1">
         <Explore/>

          </main>
       
    

      <Footer/>
    </div>
  );
}
