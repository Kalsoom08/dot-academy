'use client';
import { useRef } from 'react';
import Hero from '../sections/Home/hero';
import StatsCard from '../components/stats';
import EntranceExams from '../sections/Home/entranceExams';
import ExamFeatures from '../components/examFeatures';
import AppSection from '../sections/Home/appSection';
// import Testimonial from '../components/testimonail';



export default function Home() {
  const examsRef = useRef(null);

  const scrollToExams = () => {
    examsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Hero onExploreClick={scrollToExams} />
      <StatsCard />
      <div ref={examsRef}>
        <EntranceExams />
      </div>
      <ExamFeatures/> 
      <AppSection/>
      {/* <Testimonial/> */}
    </div>
  );
}
