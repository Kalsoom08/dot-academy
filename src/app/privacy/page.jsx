"use client";

import Head from "next/head";
import { motion } from "framer-motion";
import { MdLocationPin, MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - Ecademy Dot</title>
        <meta
          name="description"
          content="Read Ecademy Dot's Privacy Policy to understand how we collect, use, and protect your personal information while using our digital learning services."
        />
      </Head>

      <main className="max-w-6xl mx-auto px-4 py-10 text-gray-800 font-sans">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.8, 0.25, 1] }}
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="anton text-2xl md:text-3xl text-[#7D287E] mb-4"
          >
            Privacy Policy <span>🔒</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-4 text-sm md:text-base leading-relaxed"
          >
            At Ecademy Dot, your privacy is our top priority. This Privacy Policy explains what
            information we collect, how we use it, and how your data is kept safe.
          </motion.p>

          <h2 className="anton text-xl md:text-2xl text-[#7D287E] mt-4">Information We Collect</h2>
          <p className="text-sm md:text-base">When you register or purchase a course, we may collect the following details:</p>
          <ul className="list-disc ml-5 mb-4 font-semibold text-sm md:text-base space-y-1">
            <li>Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
          </ul>

          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              For payments, we use the <b>PayFast Payment Gateway</b>. When you make a transaction:
            </h3>
            <ul className="list-disc ml-5 mb-4 text-sm md:text-base space-y-1">
              <li>
                Your <b>payment details (credit/debit card or bank information)</b> are securely
                processed <b>directly by PayFast</b>.
              </li>
              <li>
                <b>Ecademy Dot does not store or save your financial information</b> on our servers.
              </li>
            </ul>
          </div>

          <h2 className="anton text-xl md:text-2xl text-[#7D287E] mb-2">How We Use Your Information</h2>
          <p className="text-sm md:text-base">We use your personal data to:</p>
          <ul className="list-disc ml-5 mb-4 text-sm md:text-base space-y-1">
            <li>Create and manage your account.</li>
            <li>Provide you access to our online courses, quizzes, and study material.</li>
            <li>Communicate important updates, offers, and support services.</li>
            <li>Improve our platform and learning experience.</li>
          </ul>

          <h2 className="anton text-xl md:text-2xl text-[#7D287E] mb-2">Data Protection</h2>
          <ul className="list-disc ml-5 mb-4 text-sm md:text-base space-y-1">
            <li>
              Payment security is ensured by <b>PayFast</b>, which uses industry-standard encryption
              and fraud prevention tools.
            </li>
            <li>
              Ecademy Dot only stores your <b>Name, Email, and Phone Number</b> for account and
              communication purposes.
            </li>
            <li>
              We do not sell, rent, or share your information with third parties without your
              consent.
            </li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <h2 className="anton text-xl md:text-2xl text-[#7D287E] mb-4">Contact Us</h2>
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
          </div>
        </motion.section>
      </main>
    </>
  );
}
