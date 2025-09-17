"use client";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getAllPublishedBlogs } from "../../../APIs/BlogPostAPI";
import Image from "next/image"; 

function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getAllPublishedBlogs();
        console.log("Fetched posts:", data);
        setPosts(data || []); 
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return (
      <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-sans flex items-center justify-center">
        <p className="text-lg">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
      <header className="flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl sm:text-4xl text-[#282828] anton mb-6">
          Blog Post
        </h1>
      </header>

      <section className="mt-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-2xl text-[#282828] anton mb-6">Recent posts</h2>
        
        {/* <div className="mb-4 p-2 bg-gray-100 rounded">
          <p className="text-sm">Posts count: {posts.length}</p>
        </div>
         */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No blog posts found.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {posts.map((post) => (
              <motion.div
                className="border border-gray-100  cursor-pointer  rounded-lg shadow-md"
                key={post._id}
                variants={cardVariants}
                onClick={() => router.push(`/blog/${post.slug}`)}
              >
                <div className="relative h-42 w-full mb-4">
                  <Image
                    src={post.featureImage?.url || "/default.png"}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded"
                  />
                </div>
                <div className="p-2">
                <div className="flex justify-between mb-2">
                <p className="text-gray-600 text-sm">{new Date(post.createdAt).toDateString()}</p>
                <p className="text-gray-500 text-xs">{post.view || 0} views</p>
                
                </div>
                <h3 className="font-bold text-lg mb-2 text-black">{post.title}</h3>
                <p className="text-s text-gray-600 ">{post.content}</p>
                </div>

                {/* <div className="mt-2 p-2 bg-yellow-100">
                  <p className="text-xs">DEBUG: Post ID: {post._id}</p>
                </div> */}
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}

export default BlogPage;