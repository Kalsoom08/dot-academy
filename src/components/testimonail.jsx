'use client';

import { FaQuoteRight } from 'react-icons/fa';
import { Bebas_Neue } from 'next/font/google';
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
});

import { Anton } from 'next/font/google';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});


const testimonials = Array(6).fill({
  name: 'Alex',
  role: 'Social media manager',
  message:
    'Absolutely, Amazing! I loved how this tool generate me perfect prompt for ChatGPT.',
});

const TestimonialSection = () => {
  return (
    <section className="py-16 px-4 text-center ">
      <h2 className={`${anton.className} text-2xl sm:text-3xl md:text-4xl font-bold mb-12`}>
        Love & support around the Pakistan
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-5xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-xl p-6 py-10 text-left relative"
          >
            <FaQuoteRight className="absolute top-6 right-6 text-[#7D287E] text-2xl" />

            <div className="mb-3">
              <h4 className="font-bold text-sm">{testimonial.name}</h4>
              <p className="text-xs text-gray-500">{testimonial.role}</p>
            </div>

            <p className="text-sm text-gray-700">{testimonial.message}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
