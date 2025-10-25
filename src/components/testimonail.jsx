'use client';

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteRight } from "react-icons/fa";
import { getAllSupportMessages } from "../../APIs/SupportAPI";
import SupportMessageSkeleton from "../loaders/SupportSkeleton";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const SupportMessagesSection = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getAllSupportMessages({ page: 1, limit: 6 });
        setMessages(data.items || []);
      } catch (error) {
        console.error("Failed to fetch support messages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <section className="py-16 px-4 bg-gray-50 text-center">
      <h2 className="anton text-2xl sm:text-3xl md:text-4xl mb-12">
        Support Messages From Our Users
      </h2>

      {loading ? (
      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <SupportMessageSkeleton key={i} />
            ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {messages.map((msg, index) => (
            <motion.div
              key={msg._id || index}
              variants={cardVariants}
              className="relative bg-white rounded-3xl shadow-xl p-6 py-10 text-left border border-gray-100 hover:shadow-2xl transition-all duration-300"
            >
            
              <FaQuoteRight className="absolute top-6 right-6 text-[#7D287E] text-2xl opacity-80" />

      
              <div className="mb-4">
                <h4 className="font-bold text-base text-[#7D287E]">
                  {msg.user?.name || "Anonymous"}
                </h4>
                <p className="text-xs text-gray-500">
                  {msg.user?.email || "No email provided"}
                </p>
              </div>

         
              <p className="text-sm text-gray-700 leading-relaxed">
                {msg.message.length > 150
                  ? `${msg.message.slice(0, 150)}...`
                  : msg.message}
              </p>

        
              {/* <div className="mt-6 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
                <span>
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      msg.status === "answered"
                        ? "text-green-600"
                        : msg.status === "in-progress"
                        ? "text-yellow-600"
                        : "text-red-500"
                    }`}
                  >
                    {msg.status || "pending"}
                  </span>
                </span>
                <span>
                  {new Date(msg.createdAt).toLocaleDateString("en-PK", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div> */}
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default SupportMessagesSection;
