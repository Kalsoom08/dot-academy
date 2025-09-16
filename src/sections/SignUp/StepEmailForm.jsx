export default function StepEmailForm({ formData, setFormData, onSubmit }) {
  return (
    <>
      <p className="text-center text-sm text-gray-700 mb-4">
        We’ll send you an OTP verification code on your Email
      </p>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="yourname@gmail.com"
          className="w-full border-b p-2 text-center"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <button type="submit" className="bg-[#7D287E] w-full text-white py-2 rounded-full">
          Get OTP
        </button>
      </form>
    </>
  );
}
