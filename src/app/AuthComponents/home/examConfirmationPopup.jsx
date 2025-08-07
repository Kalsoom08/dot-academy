import { RxCross2 } from "react-icons/rx";
import Image from 'next/image';
import LogoPic from '../../../../public/exams/logo.png';

const ExamConfirmationModal = ({ examName, onClose, onProceed }) => {
  return (
    <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4 ">
            <div className="flex justify-center  w-full">
                 <h3 className="text-lg anton ">Select Your Exam</h3>
            </div>
         
          <button onClick={onClose} className="">
            <RxCross2/>
          </button>
        </div>

        <div className="grid items-center justify-center text-center">
        <div className=" flex justify-center">
         <Image src={LogoPic} />
        </div>
           
          <h2 className="text-xl font-bold mb-3">{examName} General Training</h2>
          <p className="mb-3">You have selected {examName} General traning</p>
          <button
            onClick={onProceed}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamConfirmationModal