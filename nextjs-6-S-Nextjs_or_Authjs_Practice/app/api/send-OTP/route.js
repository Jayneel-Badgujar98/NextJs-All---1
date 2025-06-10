// path: app/api/send-OTP/route.js
import { resend } from '@/lib/resend'
import { prisma } from '@/lib/prisma'
import { randomInt } from 'crypto'

// const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  const { email } = await req.json()
  if (!email) {
    return Response.json({ message: 'Email is required', style: 'text-red-500' }, { status: 400 })
  }
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return Response.json({ message: 'No user found', style: 'text-red-500' }, { status: 404 })
  }
  const otp = String(randomInt(100000, 999999))
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000)

  await prisma.oTP.create({
    data: {
      email,
      otp,
      expiresAt,
      user: {
        connect: { id: user.id }  // 👈 Fix here
      }
    }
    //  another way :-
    //   await prisma.oTP.create({
    //   data: {
    //     otp,
    //     email,
    //     expiresAt,
    //     userId: user.id // ✅ No need to use `connect`
    //   }
    // });


  })

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #4CAF50;">Your OTP Code</h2>
      <p>Hello,${user.name || 'User'}</p>
      <p>Use the following OTP code to reset your password:</p>
      <h1 style="font-size: 28px; color: #333;">${otp}</h1>
      <p>This OTP is valid for 10 minutes. Please do not share it.</p>
    </div>
  `

  await resend.emails.send({
    from: 'Your App <onboarding@resend.dev>',
    to: [email],
    subject: 'Neo App OTP ',
    html
  })

  return Response.json({ message: 'OTP sent successfully!', style: 'text-green-500' })
}
