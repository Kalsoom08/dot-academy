"use client";

import { motion } from "framer-motion";

const listVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const RefundPolicyContent = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.8, 0.25, 1],
      }}
      className="max-w-5xl mx-auto px-4 py-10 text-gray-800 font-sans"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="anton text-3xl md:text-4xl text-[#7D287E] mb-4 text-center"
      >
        Refund Policy – Ecademy Dot
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-6 text-base md:text-lg text-gray-700 leading-relaxed"
      >
        <b>At Ecademy Dot,</b> customer satisfaction is our priority. Since we provide{" "}
        <b>digital learning services,</b> refunds are limited.
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={listVariants}
        viewport={{ once: true }}
        className="mb-6"
      >
        <h2 className="anton text-2xl md:text-3xl text-[#7D287E] mb-3">
          Refund Eligibility
        </h2>
        <motion.ul className="list-disc ml-6 space-y-2 text-sm md:text-base">
          <motion.li variants={itemVariants}>
            Refunds may be requested <b>within 7 days of purchase.</b>
          </motion.li>
          <motion.li variants={itemVariants}>
            Refunds are not available if you have accessed <b>more than 20% of the course content</b>.
          </motion.li>
          <motion.li variants={itemVariants}>
            Technical issues must be reported immediately, and if not resolved within 72 hours, a refund may be considered.
          </motion.li>
        </motion.ul>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={listVariants}
        viewport={{ once: true }}
        className="mb-6"
      >
        <h2 className="anton text-2xl md:text-3xl text-[#7D287E] mb-3">
          Non-Refundable Cases
        </h2>
        <motion.ul className="list-disc ml-6 space-y-2 text-sm md:text-base">
          <motion.li variants={itemVariants}>Change of mind after purchase.</motion.li>
          <motion.li variants={itemVariants}>Failure to meet internet or device requirements.</motion.li>
          <motion.li variants={itemVariants}>Discounted or promotional offers.</motion.li>
        </motion.ul>
      </motion.div>

      {/* Refund Process */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={listVariants}
        viewport={{ once: true }}
      >
        <h2 className="anton text-2xl md:text-3xl text-[#7D287E] mb-3">
          Refund Process
        </h2>
        <motion.ul className="list-disc ml-6 space-y-2 text-sm md:text-base">
          <motion.li variants={itemVariants}>
            To request a refund, contact us at{" "}
            <a
              href="mailto:Ecademydot@gmail.com"
              className="text-[#7D287E] font-medium hover:underline"
            >
              Ecademydot@gmail.com
            </a>
          </motion.li>
          <motion.li variants={itemVariants}>
            Refunds will be processed within <b>7–10 business days</b> through the original payment method.
          </motion.li>
        </motion.ul>
      </motion.div>
    </motion.section>
  );
};

export default RefundPolicyContent;
