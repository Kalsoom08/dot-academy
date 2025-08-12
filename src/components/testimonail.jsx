'use client';

import { FaQuoteRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const testimonials = Array(6).fill({
  name: 'Alex',
  role: 'Social media manager',
  message:
    'Absolutely, Amazing! I loved how this tool generate me perfect prompt for ChatGPT.',
});

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // delay between cards
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const TestimonialSection = () => {
  return (
    <section className="py-16 px-4 text-center">
      <h2 className="anton text-2xl sm:text-3xl md:text-4xl mb-12">
        Love & support around the Pakistan
      </h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // triggers when 20% of section is visible
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="bg-white rounded-3xl shadow-xl p-6 py-10 text-left relative"
          >
            <FaQuoteRight className="absolute top-6 right-6 text-[#7D287E] text-2xl" />

            <div className="mb-3">
              <h4 className="font-bold text-sm">{testimonial.name}</h4>
              <p className="text-xs text-gray-500">{testimonial.role}</p>
            </div>

            <p className="text-sm text-gray-700">{testimonial.message}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TestimonialSection;
