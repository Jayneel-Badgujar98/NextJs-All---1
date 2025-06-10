// app/api/reset-password/route.js
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  const { token, email, newPassword } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  // reset-password route (API)
  if (user.resetToken !== token || !user.tokenExpiresAt || new Date(user.tokenExpiresAt) < new Date()) {
    return Response.json({ message: 'Invalid or expired token' }, { status: 400 });
  }


  const hashed = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { email },
    data: {
      password: hashed,
      resetToken: null,
      tokenExpiresAt: null,
    },
  })

  return Response.json({ message: 'Password reset successful' })
}
