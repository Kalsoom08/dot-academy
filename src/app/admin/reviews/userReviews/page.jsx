import React from 'react';
import { IoIosStar } from "react-icons/io";

const reviews = [
  { id: 1, title: "Ahmad", rating: 1, comment: "only thing which i didn’t like is that there only thing which i didn’t like is that there " },
  { id: 2, title: "Ahmad", rating: 2, comment: "only thing which i didn’t like is that there only thing which i didn’t like is that there " },
  { id: 3, title: "Ahmad", rating: 3, comment: "only thing which i didn’t like is that there only thing which i didn’t like is that there " },
  { id: 4, title: "Ahmad", rating: 5 },
  { id: 5, title: "Ahmad", rating: 5 },
  { id: 6, title: "Ahmad", rating: 5 },
  { id: 7, title: "Ahmad", rating: 5 }
];

const UserReviews = () => {
  return (
    <section className='p-4 sm:p-6 md:p-8'>
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6'>
        <h1 className='text-2xl font-semibold'>Reviews</h1>
        <button className='bg-[#7D287E] text-white px-4 py-2 rounded-md mt-3 sm:mt-0 w-fit'>
          Save Changes
        </button>
      </div>

      <div className='space-y-6'>
        {reviews.map((item) => (
          <div key={item.id} className='border-b border-gray-300 pb-4'>
            <h2 className='font-medium'>{item.title}</h2>
            <div className='flex space-x-1 my-1'>
              {[...Array(5)].map((_, i) => (
                <IoIosStar
                  key={i}
                  className={i < item.rating ? 'text-[#7D287E]' : 'text-gray-400'}
                  size={20}
                />
              ))}
            </div>
            {item.comment && (
              <p className='text-sm text-gray-600 mt-1'>{item.comment}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserReviews;
