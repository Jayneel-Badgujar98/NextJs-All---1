// app/forgot-password/page.js
'use client'
import { useState, useEffect } from 'react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [countdown, setCountdown] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    setMessage(data.message)
    setCountdown(60) // Start 60s timer
  }

  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    }
    return () => clearTimeout(timer)
  }, [countdown])

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border rounded shadow space-y-4">
      <h1 className="text-xl font-bold text-center">Forgot Password</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Your Email"
        type="email"
        className="w-full px-3 py-2 border rounded"
      />
      <button
        type="submit"
        disabled={countdown > 0}
        className={`w-full py-2 rounded text-white ${countdown > 0 ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {countdown > 0 ? `Resend in ${countdown}s` : 'Send Reset Link'}
      </button>
      {message && <p className="text-center text-sm text-green-600">{message}</p>}
    </form>
  )
}