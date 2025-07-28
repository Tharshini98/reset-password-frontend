import { useState } from 'react';

export default function RequestReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const requestReset = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/request-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white p-6 rounded-lg shadow-md w-80" onSubmit={requestReset}>
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="w-full bg-purple-600 text-white py-2 rounded">Send Reset Link</button>
        {message && <p className="text-green-600 mt-2 text-sm">{message}</p>}
      </form>
    </div>
  );
}
