"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';


const Page = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const router = useRouter()
    const redirectDecide = {
        head: "/HeadDashboard",
        officer: "/OfficerDashboard",
        employee: "/EmployeeDashboard"
    }
    const handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const res = await fetch("/api/redirectLogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        const data = await res.json();
        if (!res.ok) {
            setLoading(false);
            setError(data.error || "Something went wrong");
            return;
        }
        setLoading(false);
        setSuccess("Login successful!");
        // After successful login, in your client-side code:
        document.cookie = `roleLoggedIn=${redirectDecide[data.role]}; path=/;`;
        // document.cookie = `email=${data.email}; path=/;`;
        // document.cookie = `name=${data.name}; path=/;`;
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", formData.email);

        setTimeout(() => {
            router.push(redirectDecide[data.role])
            console.log("redirecting to", redirectDecide[data.role]);
        }, 2000)
    }
    return (
        <div>
            <h1>login</h1>
            <form
                onSubmit={handleLogin}
                className="flex flex-col gap-6 bg-white/90 shadow-xl p-8 rounded-2xl max-w-md mx-auto mt-16 border border-gray-200"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Sign In</h2>

                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="p-3 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        placeholder="Enter your email"
                        autoComplete="email"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="p-3 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow transition disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-600 text-center">Login successful!</p>}
            </form>

        </div>
    )
}

export default Page
