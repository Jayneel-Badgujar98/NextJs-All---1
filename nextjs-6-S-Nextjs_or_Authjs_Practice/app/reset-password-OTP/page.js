// path: app/reset-password-OTP/page.js
'use client'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function ResetPassword() {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const router = useRouter()
    const [newPassword, setNewPassword] = useState('')
    const [newConfirmPassword, setNewConfirmPassword] = useState('')
    const [messageStyle, setMessageStyle] = useState('')
    const [message, setMessage] = useState('')
    const [showLogin, setShowLogin] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        if (newPassword !== newConfirmPassword) {
            setMessage('New Password and Confirm Password do not match')
            setMessageStyle('text-red-500')
            return
        }
        const res = await fetch('/api/reset-password-OTP', {
            method: 'POST',
            body: JSON.stringify({ email, newPassword }),
        })

        const data = await res.json()
        setMessage(data.message)
        setMessageStyle(data.style || 'text-gray-700')
        if (res.ok) {
            setShowLogin(true)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-semibold text-center text-gray-700">
                    🔒 Reset Password
                </h1>
                <input
                    className="w-full px-4 py-2 border border-gray-300 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    type="password"
                    required
                />
                <input
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newConfirmPassword}
                    onChange={(e) => setNewConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    type="password"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                >
                    Reset
                </button>
                {message && (
                    <p className={`text-sm text-center ${messageStyle}`}>{message}</p>
                )}
                {showLogin && (
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">Password reset successful!</p>
                        <button
                            onClick={() => router.push('/signin')}
                            className="text-blue-600 hover:underline"
                        >
                            Go to Login
                        </button>
                    </div>
                )}
            </form>
        </div>
    )
}
