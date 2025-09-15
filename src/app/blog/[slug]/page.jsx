"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlogBySlug } from "../../../../APIs/BlogPostAPI";
import Image from "next/image";

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getBlogBySlug(slug);
        setPost(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

  if (!post) return <p className="p-8 text-center">Loading...</p>;

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#282828] mb-4">{post.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        {new Date(post.createdAt).toDateString()} • {post.view || 0} views
      </p>
      <div className="relative w-full h-64 mb-6">
        <Image
          src={post.featureImage?.url || "/default.png"}
          alt={post.title}
          fill
          sizes="100vw"
          className="object-cover rounded-lg"
        />
      </div>
      <div
        className="prose max-w-none text-[#282828]"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
