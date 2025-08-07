import Image from 'next/image';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <Image
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-40 "
      />
      <div className="p-4">
        <div className="flex justify-between items-center text-sm  mb-2">
          <span className='text-[#282828]'>{post.date}</span>
          <span className='text-[#282828] font-bold'>{post.views}</span>
        </div>
        <h3 className="text-md font-bold text-[#282828] mb-2 mt-4">{post.title}</h3>
        <p className="text-[#282828] text-sm">{post.description}</p>
      </div>
    </div>
  );
};

export default PostCard;
