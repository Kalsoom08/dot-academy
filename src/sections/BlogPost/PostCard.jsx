// components/PostCard.jsx
import Image from "next/image";

export default function PostCard({ post }) {
  return (
    <div className="h-full bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>{post.date}</span>
          <span>{post.views}</span>
        </div>
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{post.description}</p>
      </div>
    </div>
  );
}