import { useRef } from 'react';

export default function StepOtp({ formData, setFormData, onSubmit }) {
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value) => {
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 1);
    const newOtpArray = formData.otp.split('')
    newOtpArray[index] = sanitizedValue;
    setFormData({ ...formData, otp: newOtpArray.join('') });

    if (sanitizedValue && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    } else if (!sanitizedValue && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <>
      <p className="text-center text-sm text-gray-700 mb-4">
        We’ve sent a code to {formData.email}
      </p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex justify-center gap-2">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="w-10 h-12 border rounded-md text-center text-xl"
              value={formData.otp[index] || ''}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <button type="submit" className="bg-[#7D287E] w-full text-white py-2 rounded-full">
          Verify OTP
        </button>
      </form>
    </>
  );
}
