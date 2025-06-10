import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  const hashedPassword = await bcrypt.hash('123', 10)

  const user = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@gmail.com',
      password: hashedPassword
    }
  })

  return NextResponse.json({ user })
}
