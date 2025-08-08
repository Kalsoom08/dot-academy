import React from "react";
import Icon from "../../../public/Quiz/1.png";
import Icon2 from "../../../public/Quiz/2.png";
import Icon3 from "../../../public/Quiz/3.png";
import Icon4 from "../../../public/Quiz/4.png";
import Image from "next/image";
import {useRouter} from 'next/navigation';

import { PiRankingFill } from "react-icons/pi";
import { FaPercentage } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { GiArcheryTarget } from "react-icons/gi";
import { FcIdea } from "react-icons/fc";
import { redirect } from "next/dist/server/api-utils";


export default function TestResultPopup({ isVisible, onClose, testData, playerName }) {
  const router = useRouter()
  if (!isVisible) return null;

  const {
    totalScore = "-4/80",
    correct = 5,
    incorrect = 10,
    unattempted = 5,
    rank = "19848/192290",
    percentile = "1.03%",
    accuracy = "1.03%",
    timeTaken = "01hr 45m 20s",
  } = testData || {};

  const statItems = [
    { label: "Total", value: totalScore, color: "text-[#00A0FF]", icon: Icon },
    { label: "Correct", value: correct, icon: Icon2 },
    { label: "Incorrect", value: incorrect, color: "text-[#D96060]", icon: Icon3 },
    { label: "Unattempt", value: unattempted, color: "text-[#A3A3A3]", icon: Icon4 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[1px]">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-4 pt-4">
          <h2 className="text-lg sm:text-xl font-bold">Practice Test Result</h2>
        </div>

    
        <div className="bg-[#F2F2F2] m-2 rounded-2xl p-2 overflow-x-auto sm:overflow-visible">
          <div className="flex gap-6 sm:grid sm:grid-cols-1 sm:gap-3">
            {statItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-3 min-w-[140px] sm:min-w-0"
              >
                <div className="flex gap-2 items-center">
                  <Image src={item.icon} height={20} width={20} alt={item.label} />
                  <span className={`${item.color || "text-gray-700"} font-semibold`}>
                    {item.label}
                  </span>
                </div>
                <span className={`${item.color || "text-gray-700"} font-bold`}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-3">
          <div className="flex items-center gap-2"><PiRankingFill size={20} className="text-blue-600"/> <ResultRow label="Rank" value={rank} /></div>
          <div className="flex items-center gap-2"><FaPercentage size={20} className="text-red-400"/> <ResultRow label="Percentile" value={percentile} /></div>
          <div className="flex items-center gap-2"><GiArcheryTarget size={20} className="text-red-600"/> <ResultRow label="Accuracy" value={accuracy} /></div>
          <div className="flex items-center gap-2"><IoIosTime  size={20} className="text-blue-600"/> <ResultRow label="Time Taken" value={timeTaken} /></div>
        </div>

        <div className="bg-[#ffbb00b5] rounded-lg p-4 mx-6 my-4 flex justify-center items-center gap-x-3 text-white">
          <FcIdea size={52} className=""/>
          <p className="text-xs ">
            
            Hey {playerName}, attempt more questions to improve your score — the
            more you attempt, the better you will get.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 p-2 pb-3 ">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-2 bg-white text-gray-600 font-semibold rounded-lg shadow-sm border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              redirect('/components/Quiz/QuizQuestionCard')
              onClose();
            }}
            className="flex-1 px-6 py-2 text-white font-semibold rounded-lg shadow-lg bg-purple-600 hover:bg-purple-700"
          >
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
}

function ResultRow({ label, value }) {
  return (
    <div className="flex items-center justify-between w-full">
      <span className="font-semibold text-gray-700">{label}</span>
      <span className="text-gray-900 font-bold">{value}</span>
    </div>
  );
}
