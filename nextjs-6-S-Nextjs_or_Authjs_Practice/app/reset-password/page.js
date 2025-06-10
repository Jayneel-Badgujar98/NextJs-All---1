'use client'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function ResetPassword() {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const email = searchParams.get('email')
    const router = useRouter()

    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
       
        const res = await fetch('/api/reset-password', {
            method: 'POST',
            body: JSON.stringify({ token, email, newPassword }),
        })

        const data = await res.json()
        setMessage(data.message)

        if (res.ok) {
            setTimeout(() => router.push('/signin'), 2000)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-semibold text-center text-gray-700">
                    🔒 Reset Password
                </h1>
                <input
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
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
                    <p className="text-sm text-center text-gray-600">{message}</p>
                )}
            </form>
        </div>
    )
}
