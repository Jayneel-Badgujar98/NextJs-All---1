// path : app/signin/page.js
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.ok) {
      router.replace('/dashboard');
    } else {
      alert("Invalid credentials or user not found");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          name="email"
          className="w-full border px-4 py-2 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          name="password"
          placeholder="Password"
          value={password}
          className="w-full border px-4 py-2 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Login
        </button>
      </form>

      <div className="text-center">OR</div>

      <button
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}

        className="bg-black text-white px-4 py-2 rounded w-full"
      >
        Sign up with GitHub
      </button>
      <div className="" >
        <div className="text-center text-amber-200 inline text-md my-20 mx-4">Not created account yet ?  </div>
        <span>
          <Link className="bg-blue-600 text-white px-4 py-2 rounded w-full mt-20 " href="/signup">Create a new One</Link>
        </span>
        <div className="text-center text-blue-400 inline-block my-6 mx-4 text-md  hover:underline hover:underline-offset-4 hover:text-gray-500 ">
          <Link className=" rounded w-full " href="/forgot-passwordOTP">Forgot Password ?</Link>
        </div>

      </div>

    </div>
  );
}

