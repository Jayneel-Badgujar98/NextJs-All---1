'use client';
import { useState } from 'react';

export default function SendEmailPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const sendEmail = async () => {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (data.success) {
      setMessage('✅ Email sent successfully!');
    } else {
      setMessage(`❌ Error: ${data.error}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">Send a Test Email</h1>
      <input
        type="email"
        placeholder="Enter your email"
        className="border p-2 mb-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendEmail} className="bg-blue-600 text-white px-4 py-2 rounded">
        Send Email
      </button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}
