export default function StepPhoneNumber({ formData, setFormData, onSubmit }) {
  return (
    <>
      <p className="text-center text-sm text-gray-700 mb-4">We’ll send you a OTP Verification Code on your number</p>
      <form onSubmit={onSubmit} className="space-y-4">
<input
          type="tel" 
          placeholder="Number"
          className="w-full border-b p-2 "
          value={formData.phone}
          onChange={(e) => { const value = e.target.value;
            if (/^\d*$/.test(value) && value.length <= 13) {
              setFormData({ ...formData, phone: value });

        }
      }}
      maxLength={13} 
      required
    />
        <button type="submit" className="bg-[#7D287E] w-full text-white py-2 rounded-full">Get OTP</button>
      </form>
    </>
  );
}
