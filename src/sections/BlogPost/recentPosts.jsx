"use client";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getAllPublishedBlogs } from "../../../APIs/BlogPostAPI";

function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllPublishedBlogs();
        setPosts(data || []); // ✅ API returns array
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <header className="flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl sm:text-4xl text-[#282828] anton mb-6">
          Blog Post
        </h1>
      </header>

      <section className="mt-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-2xl text-[#282828] anton mb-6">Recent posts</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {posts.map((post) => (
            <motion.div
              key={post._id}
              variants={cardVariants}
              onClick={() => router.push(`/blog/${post.slug}`)}
            >
              <PostCard
                post={{
                  imageUrl: post.featureImage?.url || "/default.png",
                  date: new Date(post.createdAt).toDateString(),
                  views: `${post.view || 0} Views`,
                  title: post.title,
                  description: post.summary || post.content || "",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

export default BlogPage;
