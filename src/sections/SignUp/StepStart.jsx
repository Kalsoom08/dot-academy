import { FcGoogle } from 'react-icons/fc';
import { TfiEmail } from 'react-icons/tfi';
import { IoCallOutline } from 'react-icons/io5';
import SignupButton from './SignupButton';


export default function StepStart({ onGoogle, onEmail, onPhone , onSwitchToLogin}) {
  
  return (
    <div className="space-y-4 flex flex-col items-center">
 
      <SignupButton icon={<FcGoogle />} label="Continue with Google" onClick={onGoogle} />
      <SignupButton icon={<TfiEmail />} label="Continue with Email" onClick={onEmail} />
      <SignupButton icon={<IoCallOutline />} label="Continue with Number" onClick={onPhone} />
             <p className="text-center text-sm text-gray-700 mt-6">
          Already a User?{' '}
          <button onClick={onSwitchToLogin} className="text-[#7D287E] font-medium hover:underline">
            Login
          </button>
        </p>
    </div>
  );
}
