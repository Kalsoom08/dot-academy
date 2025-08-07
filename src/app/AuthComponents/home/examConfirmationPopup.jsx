
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import LogoPic from '../../../../public/exams/logo.png';
import {useRouter} from 'next/navigation';

const ExamConfirmationModal = ({ examName, onClose, onProceed }) => {
  const router = useRouter()
  return (
 
    <div> 
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-center w-full">
          <h3 className="text-xl anton ">Select Your Exam</h3>
        </div>
      </div>
      <div className="grid items-center justify-center text-center">
        <div className="flex justify-center mb-4">
          <Image src={LogoPic} alt="Exam Image" width={120} height={120} />
        </div>
        <h2 className="text-xl font-bold mb-3">{examName} General Training</h2>
        <p className="mb-3">You have selected {examName} General Training</p>
        <button
          onClick={()=> router.push('/AuthComponents/ExploreCourses')}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Proceed
        </button>
      </div>
    </div>
  );
};

export default ExamConfirmationModal;