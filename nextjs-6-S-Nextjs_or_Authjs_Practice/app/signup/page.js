// path: app/signup/page.js
 'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || 'Something went wrong.');
    } else {
      router.push('/signin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-black">Create an Account</h2>

        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded bg-slate-500 text-black outline-blue-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mb-3 p-2 border rounded bg-slate-500 text-black outline-blue-300"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded bg-slate-500 text-black outline-blue-300"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
// create a backend route for signup