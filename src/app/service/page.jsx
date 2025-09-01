"use client";

import Head from "next/head";
import { FaPhoneAlt } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { MdEmail, MdLocationPin } from "react-icons/md";

const ServicePolicy = () => {
  return (
    <>
      <Head>
        <title>Service Policy (Shipping Policy) - Ecademy Dot</title>
        <meta
          name="description"
          content="Ecademy Dot's Service Policy explains how digital courses and study materials are delivered online, with account usage rules and customer support details."
        />
      </Head>
      <main className="max-w-5xl mx-auto px-4 py-10 text-gray-800 font-sans">
        <section>
          <h1 className="anton text-2xl md:text-3xl lg:text-4xl text-[#7D287E] mb-4">
            Service Policy (Shipping Policy) – Ecademy Dot
          </h1>
          <p className="mb-4 text-sm md:text-base leading-relaxed">
            <b>At Ecademy Dot,</b> all our products and services are{" "}
            <b>digital courses, notes, and study materials</b> delivered online through our
            platform. No physical shipping is involved.
          </p>

          <h2 className="anton text-xl md:text-2xl text-[#7D287E] mb-2">
            Service Delivery
          </h2>
          <ul className="list-disc ml-6 mb-4 text-sm md:text-base space-y-2">
            <li>Students first create an account on our website ecademydot.com.</li>
            <li>After registration, limited free content may be available for trial.</li>
            <li>
              Once a student purchases a course,{" "}
              <b>full access is granted instantly on the registered account.</b>
            </li>
            <li>
              No separate login details or email instructions are required; access is linked
              directly to the registered account.
            </li>
          </ul>

          <h2 className="anton text-xl md:text-2xl text-[#7D287E] mb-2">
            Account Usage & Restrictions
          </h2>
          <ul className="list-disc ml-6 mb-4 text-sm md:text-base space-y-2">
            <li>
              Each account is for <b>personal use only.</b>
            </li>
            <li>
              If a student is found <b>reselling, sharing, or distributing login credentials,</b>{" "}
              Ecademy Dot reserves the right to:
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>
                  <b>Limit account access</b>
                </li>
                <li>
                  <b>Block the account permanently</b> without refund
                </li>
              </ul>
            </li>
          </ul>

          <section>
            <h2 className="anton text-xl md:text-2xl text-[#7D287E] mb-4">
              Customer Support
            </h2>
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
        </section>
      </main>
    </>
  );
};

export default ServicePolicy;
