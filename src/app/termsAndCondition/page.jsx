"use client";

import { motion } from "framer-motion";
import Head from "next/head";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { TbWorld } from "react-icons/tb";

const TermsConditions = () => {
  return (
    <>
      <Head>
        <title>Terms & Conditions - Ecademy Dot</title>
        <meta
          name="description"
          content="Read the Terms & Conditions of Ecademy Dot to understand our policies regarding accounts, payments, refunds, and user responsibilities."
        />
      </Head>

      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="max-w-6xl mx-auto px-4 md:px-8 py-10 text-gray-800 font-sans"
      >
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="anton text-2xl md:text-3xl lg:text-4xl text-[#7D287E] mb-4 text-center">
            Terms & Conditions – Ecademy Dot
          </h1>

          <p className="mb-6 text-sm md:text-base leading-relaxed text-gray-700">
            Welcome to Ecademy Dot. These Terms & Conditions (“Terms”) govern your use of our
            website ecademydot.com and all services offered by us. By accessing or using our
            platform, you agree to comply with and be bound by these Terms. If you do not agree,
            please discontinue use of our services.
          </p>

          {/** Sections **/}
          <h2 className="anton text-xl md:text-2xl text-[#7D287E] mb-2">1. Definitions</h2>
          <ul className="list-disc ml-6 mb-4 text-sm md:text-base space-y-1">
            <li>“Platform” refers to the Ecademy Dot website and all digital services provided through it.</li>
            <li>“User/Student” means any individual who registers, purchases, or uses our services.</li>
            <li>“Content” means all study materials, courses, videos, notes, quizzes, and related intellectual property available on our platform.</li>
            <li>“Account” means a personal login created by a student to access Ecademy Dot services.</li>
          </ul>

          <h2 className="anton text-xl md:text-2xl text-[#7D287E] mb-2">2. Account Registration</h2>
          <ul className="list-disc ml-6 mb-4 text-sm md:text-base space-y-1">
            <li>Users must register with accurate information including Name, Email, and Phone Number.</li>
            <li>Each user is responsible for maintaining the confidentiality of their login credentials.</li>
            <li>Sharing, selling, or transferring account access to another individual is strictly prohibited.</li>
            <li>Ecademy Dot reserves the right to suspend or terminate accounts found in violation.</li>
          </ul>

          <h2 className="anton text-xl md:text-2xl text-[#7D287E] mb-2">3. Services & Access</h2>
          <ul className="list-disc ml-6 mb-4 text-sm md:text-base space-y-1">
            <li>Ecademy Dot provides digital educational courses, notes, and quizzes.</li>
            <li>Students may access limited free content before purchase.</li>
            <li>Upon successful payment, immediate access is granted to purchased courses on the registered account.</li>
            <li>No physical delivery or shipping is involved.</li>
          </ul>

          <h2 className="anton text-xl md:text-2xl text-[#7D287E] mb-2">4. Payments</h2>
          <ul className="list-disc ml-6 mb-4 text-sm md:text-base space-y-1">
            <li>All payments are processed securely via PayFast Payment Gateway.</li>
            <li>Ecademy Dot does not store or process financial details (credit/debit card or bank information).</li>
            <li>Prices are listed in Pakistani Rupees (PKR) and may change without prior notice.</li>
            <li>Payment must be completed in full before access to premium content is granted.</li>
          </ul>

          <h2 className="anton text-xl md:text-2xl text-[#7D287E] mb-2">5. Refunds</h2>
          <ul className="list-disc ml-6 mb-4 text-sm md:text-base space-y-1">
            <li>Refund requests must follow our Refund Policy.</li>
            <li>Refunds are only available within 7 days of purchase, provided the student has not accessed more than 20% of the course.</li>
            <li>
              Refunds are not applicable for:
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Change of mind after purchase</li>
                <li>Accounts found sharing or reselling content</li>
                <li>Discounted or promotional purchases</li>
              </ul>
            </li>
          </ul>

          <section className="mt-10">
            <h2 className="anton text-xl md:text-2xl text-[#7D287E] mb-4">Customer Support</h2>
            <p className="text-gray-700 mb-4 text-sm md:text-base">
              If you have any questions about this Privacy Policy, feel free to reach us at:
            </p>

            <div className="space-y-2">
              <p className="flex items-center gap-4">
                <MdLocationPin className="text-[#7D287E] text-xl" />
                Banglow no: A-06 Professors Cooperative Housing Society Shikarpur Road Sukkur
              </p>

              <p className="flex items-center gap-4">
                <FaPhoneAlt className="text-[#7D287E] text-xl" />
                +92 0300 7140064
              </p>

              <a
                href="mailto:Ecademydot@gmail.com"
                className="flex items-center gap-4 text-[#7D287E] hover:text-purple-700 font-medium transition-colors"
              >
                <MdEmail className="text-xl" />
                Ecademydot@gmail.com
              </a>

              <a
                href="https://ecademydot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-[#7D287E] hover:text-purple-700 font-medium transition-colors"
              >
                <TbWorld className="text-xl" />
                ecademydot.com
              </a>
            </div>
          </section>
        </motion.section>
      </motion.main>
    </>
  );
};

export default TermsConditions;
