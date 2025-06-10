// path: app/forgot-passwordOTP/page.js
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
export default function ForgotPasswordOTP() {

  const router = useRouter()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [messageStyle, setMessageStyle] = useState('')
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [timer, setTimer] = useState(0)


  const handleSendOTP = async (e) => {
    e.preventDefault()
    setMessage('')
    const res = await fetch('/api/send-OTP', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    setMessage(data.message)
    setMessageStyle(data.style || 'text-gray-700')
    if (res.ok) {
      setShowOtpInput(true)
      setTimer(60)
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    setMessage('')
    const res = await fetch('/api/verify-OTP', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    })
    const data = await res.json()
    setMessage(data.message)
    setMessageStyle(data.style || 'text-gray-700')

    if(res.status === 429) {
      setMessage(data.message)
      setMessageStyle(data.style || 'text-red-500')
      setTimer(300)
      return
    }
    if (res.ok) {
      setTimeout(() => {
        router.push(`/reset-password-OTP?email=${email}`)
      }, 2000);
    }
  }

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000)
      return () => clearInterval(interval)
    }
  }, [timer])

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-xl font-bold mb-4">Forgot Password (OTP)</h1>

      <form onSubmit={handleSendOTP} className="space-y-4">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email to recover password"
          required
          type="email"
          name="email"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={timer > 0}
          className={`w-full p-2 rounded text-white ${timer > 0 ? 'bg-gray-500' : 'bg-blue-600'}`}
        >
          {timer > 0 ? `Resend in ${timer}s` : 'Send OTP'}
        </button>
      </form>

      {showOtpInput && (
        <form onSubmit={handleVerifyOTP} className="space-y-4 mt-6">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            type="text"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full p-2 bg-green-600 text-white rounded"
          >
            Verify OTP
          </button>
        </form>
      )}

      {message && (
        <p className={`mt-4 text-center text-sm font-medium ${messageStyle}`}>
          {message}
        </p>
      )}
    </div>
  )
}
