// page : app/api/verify-OTP/route.js
import { prisma } from '@/lib/prisma'

export async function POST(req) {
  const { email, otp } = await req.json()
  const record = await prisma.oTP.findFirst({
    where: { email,used: false }
  })

  if (otp !== record.otp) {
    await prisma.oTP.update({
      where: { id: record.id },
      data: { failedAttempts: { increment: 1 } }
    });
    return Response.json({ error: "Invalid OTP." }, { status: 401 });
  }
  if (record.failedAttempts >= 5) {
    return Response.json({ error: "Too many failed attempts. Try again later." }, { status: 429 });
  }

  if (new Date(record.expiresAt) < new Date()) {
    return Response.json({ message: 'OTP expired', style: 'text-red-500' }, { status: 400 })
  }

  await prisma.oTP.update({
    where: { id: record.id },
    data: {
      used: true,
      expiresAt: new Date() // Mark as used and set expiresAt to now
    }
  })

  return Response.json({ message: 'OTP verified!', style: 'text-green-500' })
}
