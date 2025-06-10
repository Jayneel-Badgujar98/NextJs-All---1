// app/api/forgot-password/route.js
import { prisma } from '@/lib/prisma'
import { sendResetEmail } from '@/lib/resend'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req) {
  const { email } = await req.json()
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return Response.json({ message: 'No user found' }, { status: 404 })
  }

  const token = uuidv4()
  const tokenWillExpiresAt = new Date(Date.now() + 1000 * 60 * 10) // 10 min

  await prisma.User.update({
    where: { email },
    data: {
      resetToken: token,
      tokenExpiresAt: tokenWillExpiresAt,
    },
  })

  await sendResetEmail(email, token)

  return Response.json({ message: 'Reset email sent' })
}
