'use client';
import Image from 'next/image';
import aboutImg from '../../../public/About/blog.png'; 

const About = () => {
  return (
    <section className="px-6 md:px-10 lg:px-32 py-16 bg-white">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="grid md:grid-cols-2 ">
          <div>
            <h2 className="text-xl md:text-xl font-semibold leading-tight">
              Welcome to <span className="text-[#7D287E]">Ecademy Dot</span> Your Journey<br />
              to Government Job <span className="text-[#7D287E]">Success</span> Begins Here and strengthen your exam preparation experience..
            </h2>
          </div>
          <div>
            <p className="text-gray-700 text-sm md:text-base mt-5 md:mt-20 ">
              At Ecademy Dot, we’re on a mission to simplify and strengthen your exam preparation experience.
              Our platform is built to support ambitious individuals who are preparing for One Paper MCQs Tests —
              a crucial step toward securing government jobs in Pakistan.
            </p>
          </div>
        </div>

       
        <div className="w-full rounded-3xl overflow-hidden flex justify-center">
          <Image
            src={aboutImg}
            alt="Studying"
            className="w-[80%] h-[70%]"
            priority
          />
        </div>

     
      <div className="grid md:grid-cols-2 ">
        <div className="text-sm md:text-base font-semibold text-black">
          To help you prepare smarter, not harder, for One Paper MCQs exams.
          Whether it’s <strong>General Knowledge, English, Islamiat, Pakistan Studies, or Current Affairs</strong>,
          we bring everything you need into one platform, tailored for government job aspirants.
        </div>

       
        <div className="text-gray-700 text-sm md:text-base max-w-4xl  mt-5 md:mt-32">
          Our goal is to make Ecademy Dot a complete digital academy guiding students and job-seekers every step
          of the way. While our current focus is on One Paper MCQs Test Preparation, this is just the beginning.
          In the near future, we plan to expand our platform to cover:
        </div>

        </div>
      </div>
    </section>
  );
};

export default About;
