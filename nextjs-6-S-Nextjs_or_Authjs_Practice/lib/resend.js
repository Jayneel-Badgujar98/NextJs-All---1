// lib/sendResetEmail.js
import { Resend } from 'resend'
export const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendResetEmail(email, token) {
  const resetUrl = `http://localhost:3000/reset-password?token=${token}&email=${email}`

  await resend.emails.send({
    from: 'Neo App <onboarding@resend.dev>',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click below to reset your password:</p>
           <a href="${resetUrl}">Reset Password</a>`,
  })
}
