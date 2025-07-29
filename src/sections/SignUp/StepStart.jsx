import { FcGoogle } from 'react-icons/fc';
import { TfiEmail } from 'react-icons/tfi';
import { IoCallOutline } from 'react-icons/io5';
import SignupButton from './SignupButton';

export default function StepStart({ onGoogle, onEmail, onPhone }) {
  return (
    <div className="space-y-4">
      <SignupButton icon={<FcGoogle />} label="Continue with Google" onClick={onGoogle} />
      <SignupButton icon={<TfiEmail />} label="Continue with Email" onClick={onEmail} />
      <SignupButton icon={<IoCallOutline />} label="Continue with Number" onClick={onPhone} />
    </div>
  );
}
