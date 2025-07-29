'use client';
import { Bebas_Neue } from 'next/font/google';
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
});

const stats = [
  { number: '14 Million+', label: 'Registered Students' },
  { number: '550 Million+', label: 'MCQs attempted in Test' },
  { number: '2.8 Billion+', label: 'Study Notes Viewed' },
  { number: '4.5/6', label: 'Rating on Google Play' },
];

const Stats = () => {
  return (
    <section className="bg-white shadow-md rounded-xl p-6 md:p-10 my-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 text-center ">
        {stats.map((stat, index) => (
          <div key={index} className='bg-white'>
            <h3 className={`${bebas.className} text-2xl sm:text-3xl text-black`}>{stat.number}</h3>
            <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;
