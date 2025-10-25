"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAllPublishedBlogs } from "../../../APIs/BlogPostAPI";
import BlogCardSkeleton from "../../loaders/BlogSkeleton";

function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllPublishedBlogs();
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

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 font-sans bg-gradient-to-b from-gray-50 to-white">
      <header className="flex flex-col items-center justify-center py-10">
        <h1 className="text-3xl sm:text-4xl anton text-[#282828] mb-4">
          Blog Post
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Explore the latest updates, stories, and insights from our blog.
        </p>
      </header>

      <section className="mt-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-2xl anton text-[#282828] mb-6">Recent Posts</h2>

        {loading ? (
          // Skeleton grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <BlogCardSkeleton key={i} />
              ))}
          </div>
        ) : posts.length === 0 ? (
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
                key={post._id}
                variants={cardVariants}
                onClick={() => router.push(`/blog/${post.slug}`)}
                className="cursor-pointer bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-44 w-full">
                  <Image
                    src={post.featureImage?.url || "/default.png"}
                    alt={post.title}
                    fill
                    className="object-cover rounded-t-2xl"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <p className="text-gray-500 text-xs">
                      {new Date(post.createdAt).toDateString()}
                    </p>
                    <p className="text-gray-400 text-xs">{post.view || 0} views</p>
                  </div>
                  <h3 className="font-bold text-lg text-black mb-1 line-clamp-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {post.content || "No description available."}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}

export default BlogPage;
