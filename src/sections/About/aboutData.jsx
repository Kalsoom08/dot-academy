'use client';
import Image from 'next/image';
import aboutImg from '../../../public/About/blog.png';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const About = () => {
  return (
    <section className="px-6 md:px-10 lg:px-32 py-16 bg-white">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-xl md:text-xl font-semibold leading-tight">
              Welcome to <span className="text-[#7D287E]">Ecademy Dot</span> Your Journey<br />
              to Government Job <span className="text-[#7D287E]">Success</span> Begins Here and strengthen your exam preparation experience..
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-gray-700 text-sm md:text-base mt-5 md:mt-20">
              At Ecademy Dot, we’re on a mission to simplify and strengthen your exam preparation experience.
              Our platform is built to support ambitious individuals who are preparing for One Paper MCQs Tests —
              a crucial step toward securing government jobs in Pakistan.
            </p>
          </motion.div>
        </div>

    
        <motion.div
          className="w-full rounded-3xl overflow-hidden flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.6 } }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src={aboutImg}
            alt="Studying"
            className="w-[80%] h-[70%]"
            priority
          />
        </motion.div>


        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            className="text-sm md:text-base font-semibold text-black"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            To help you prepare smarter, not harder, for One Paper MCQs exams.
            Whether it’s <strong>General Knowledge, English, Islamiat, Pakistan Studies, or Current Affairs</strong>,
            we bring everything you need into one platform, tailored for government job aspirants.
          </motion.div>

          <motion.div
            className="text-gray-700 text-sm md:text-base max-w-4xl mt-5 md:mt-32"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            Our goal is to make Ecademy Dot a complete digital academy guiding students and job-seekers every step
            of the way. While our current focus is on One Paper MCQs Test Preparation, this is just the beginning.
            In the near future, we plan to expand our platform to cover:
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
