import React, { useState } from 'react';
import Image from 'next/image';
import unlimitesReattempts from '../../../../public/Courses/premium.png';
import tryToAttemptMore from '../../../../public/Courses/47.png';
import ranks from '../../../../public/Courses/icon7.png';
import percentage from '../../../../public/Courses/icon99.png';
import precentile from '../../../../public/Courses/icon8.png';
import timeTaken from '../../../../public/Courses/icon6.png';
import accuracy from '../../../../public/Courses/icon9.png';
import practice from '../../../../public/Courses/50.png';
import course from '../../../../public/Courses/2.png';
import coin from '../../../../public/Courses/coin.png';
import profile from '../../../../public/Courses/profile.png';
import { RiArrowDropRightLine } from "react-icons/ri";
import SideShow from './SideShow';
import Solutions from './Solutions';

const progress = [
    { icon: ranks, title: "Rank", description: "Among all students who attempted this test", value: 194242 },
    { icon: percentage, title: "Percentage", description: "Your percentage is 20% less than the average percentage", value: '0%' },
    { icon: precentile, title: "Percentile", description: "97.98% of all students are ahead of you", value: 2.06 },
    { icon: timeTaken, title: "Time Taken", description: "Time taken by you is 12m 0s less than the average time taken", value: '0s' },
    { icon: accuracy, title: "Accuracy", description: "Your accuracy is 60% less than the average accuracy", value: 0 },
];

const score = [
    { profile: profile, name: "Tanzilla Qurashi", score: 80, icon: coin },
    { profile: profile, name: "Abdul Rehman", score: 75, icon: coin },
    { profile: profile, name: "Ali Khan", score: 90, icon: coin },
    { profile: profile, name: "Sarah Ahmed", score: 85, icon: coin },
    { profile: profile, name: "John Doe", score: 70, icon: coin },
    { profile: profile, name: "Jane Smith", score: 88, icon: coin },
    { profile: profile, name: "Samantha Lee", score: 92, icon: coin }
];

function ScoreCard() {
    const [filter, setFilter] = useState('scoreCard');
  
    const toggleFilter = (filterType) => {
        setFilter(filterType);
    };

    return (
        <section>
            <div className="bg-gray-100 m-auto rounded-full flex my-6 py-1 px-2 gap-2 lg:w-[30%] md:w-[60%] w-[80%]">
                <button
                    onClick={() => toggleFilter('scoreCard')}
                    className={`transition-all duration-300 rounded-full flex-1 cursor-pointer px-6 py-2 ${filter === 'scoreCard' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                    ScoreCard
                </button>
                <button
                    onClick={() => toggleFilter('solutions')}
                    className={`transition-all duration-300 rounded-full flex-1 cursor-pointer px-6 py-2 ${filter === 'solutions' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
                >
                    Solutions
                </button>
            </div>
            <div className="flex">
                {filter === 'scoreCard' ? (
                    <div >
                        {/* Unlimited Reattempt Section */}
                        <div className="bg-gray-200 px-4 grid grid-cols-2 justify-between items-center py-2 rounded-md gap-2 mt-6">
                            <div className="flex justify-center items-center gap-4">
                                <Image src={unlimitesReattempts} alt="Unlimited Reattempts" />
                                <div>
                                    <h1 className="font-semibold text-[18px]">Unlimited Reattempts</h1>
                                    <p className="text-gray-400 text-[12px]">Get unlimited Reattempts with Ecademy Infinity and improve your score</p>
                                </div>
                            </div>
                            <button className="bg-black text-white py-2 rounded-md">Unlock Reattempts Mode</button>
                        </div>

                        {/* Attempt More Section */}
                        <div className="border border-gray-200 px-4 py-4 my-8 rounded-md">
                            <div className="flex justify-between items-center gap-4">
                                <div>
                                    <h1 className="text-[18px]">Try to attempt more, Abdul!</h1>
                                    <p className="text-[12px]">Keep practicing! The more questions you’ll attempt, the better you’ll get</p>
                                </div>
                                <Image src={tryToAttemptMore} alt="Try to Attempt More" />
                            </div>
                        </div>

                        {/* Progress Section */}
                        <div className="py-6 flex flex-col gap-8">
                            <h1 className="text-[25px] font-bold">Your Progress</h1>
                            <div className="flex flex-col">
                                {progress.map((item, index) => (
                                    <div key={index} className="flex justify-between px-2 py-4">
                                        <div className="flex gap-8">
                                            <Image src={item.icon} alt={item.title} />
                                            <div>
                                                <h1 className="font-semibold text-[18px]">{item.title}</h1>
                                                <p className="text-[12px] text-gray-400">{item.description}</p>
                                            </div>
                                        </div>
                                        <h1 className="font-semibold text-[18px]">{item.value}</h1>
                                    </div>
                                ))}
                                <button className="bg-black text-white py-2 rounded-md">View Complete Analysis</button>
                            </div>

                            {/* Practice Section */}
                            <div className="flex items-center justify-between bg-[#FFC966] px-4 py-6 rounded-md">
                                <div className="flex flex-col">
                                    <h1 className="font-semibold text-[18px]">Practice your incorrect Test</h1>
                                    <p className="text-[12px]">Attempt all your incorrect questions in one place</p>
                                    <button className="bg-black text-white py-2 rounded-md mt-4">View Complete Analysis</button>
                                </div>
                                <Image src={practice} alt="Practice" />
                            </div>
                        </div>

                        {/* Continue Learning Section */}
                        <div className="py-4">
                            <h1 className="text-[22px] font-semibold">Continue Learning</h1>
                            <div className="flex justify-between items-center border py-2 px-2 rounded-md mt-6">
                                <div className="flex items-center gap-4">
                                    <Image src={course} alt="Course" />
                                    <div>
                                        <h1 className="font-semibold text-[18px]">English Grammar Basic</h1>
                                        <p className="text-[12px] text-[#7D287E]">Continue Learning</p>
                                    </div>
                                </div>
                                <RiArrowDropRightLine size={36} />
                            </div>
                        </div>

                        {/* Areas of Improvement Section */}
                        <div className="py-4">
                            <h1 className="text-[22px] font-semibold">Practice Areas of Improvement</h1>
                            <div className="flex justify-between items-center border border-gray-200 py-6 px-4 rounded-md mt-6">
                                <div>
                                    <h1>The Living World</h1>
                                    <p className="text-[12px]">70+ Questions</p>
                                </div>
                                <button className="bg-black text-white py-2 rounded-md px-2">Unlock Reattempts Mode</button>
                            </div>
                        </div>

                        {/* Insights Section */}
                        <div>
                            <h1 className="text-[28px] font-bold">Insights</h1>
                            <div className="bg-[#00A1FF]/40 py-4 px-4 my-4 rounded-md">
                                <h1 className="text-[#005F96] text-[22px] font-semibold">The Good</h1>
                                <ul className="pl-4">
                                    <li className="text-[#005F96] text-[14px] list-disc">You’re a quicker thinker, and you’re only taking 2s per question</li>
                                </ul>
                            </div>
                            <div className="bg-[#FFEF5E]/40 py-4 px-4 my-4 rounded-md">
                                <h1 className="text-[#786E10] text-[22px] font-semibold">To Improve</h1>
                                <ul className="pl-4">
                                    <li className="text-[#786E10] text-[14px] list-disc">You need to attempt 10 tests to help us understand you better</li>
                                    <li className="text-[#786E10] text-[14px] list-disc">Your overall accuracy is 40%, which is 36% less than the average</li>
                                    <li className="text-[#786E10] text-[14px] list-disc">You have attempted only 33% of questions, which is 36.37% less than the average</li>
                                </ul>
                            </div>

                            {/* Score Table */}
                            <div className="my-4">
                                <table className="min-w-full table-auto border-collapse">
                                    <thead>
                                        <tr className="text-gray-400">
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Score</th>
                                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Rank</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {score.map((item, index) => (
                                            <tr key={index} className="border-b border-gray-200">
                                                <td className="flex items-center gap-4 px-4 py-2">
                                                    <Image src={item.profile} alt={item.name} className="rounded-full" />
                                                    <span>{item.name}</span>
                                                </td>
                                                <td className="px-4 py-2 text-[16px] font-semibold">{item.score}</td>
                                                <td className="px-4 py-2 text-[16px] font-semibold">
                                                    <Image src={item.icon} alt="Coin" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Solutions />
                )}
                <SideShow />
            </div>
            
        </section>
    );
}

export default ScoreCard;
