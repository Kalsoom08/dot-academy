import Image from "next/image";

const PostCard = ({ post, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      <div className="w-full h-40 relative">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="text-[#282828]">{post.date}</span>
          <span className="text-[#282828] font-bold">{post.views}</span>
        </div>
        <h3 className="text-md font-bold text-[#282828] mb-2 mt-4">
          {post.title}
        </h3>
        <p className="text-[#282828] text-sm">{post.description}</p>
      </div>
    </div>
  );
};

export default PostCard;
