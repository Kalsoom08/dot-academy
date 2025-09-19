'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../../slices/authSlice';

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const result = await dispatch(forgotPassword(email));

    if (forgotPassword.fulfilled.match(result)) {
      setMessage(result.payload); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#f5f5f5]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-[#7C287D] mb-4">Forgot Password</h1>

        <input
          type="email"
          placeholder="Email address"
          className="w-full p-3 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7C287D] text-white py-3 rounded hover:bg-[#5a1c4b] disabled:opacity-60"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        {message && <p className="text-green-600 mt-3">{message}</p>}
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </form>
    </div>
  );
}
