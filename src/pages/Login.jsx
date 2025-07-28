import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    alert(data.message);
    if (res.ok) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={loginUser}>
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required
          className="w-full p-2 mb-2 border rounded" />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required
          className="w-full p-2 mb-4 border rounded" />
        <button className="w-full bg-green-600 text-white py-2 rounded">Login</button>
        <p className="mt-2 text-sm">
          <a href="/request-reset" className="text-blue-600">Forgot password?</a>
        </p>
      </form>
    </div>
  );
}
