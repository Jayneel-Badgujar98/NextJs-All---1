// path : app/api/reset-password-OTP/route.js
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma'

export async function POST(req) {
    try {
        const { email, newPassword } = await req.json()
        const normalizedEmail = email.toLowerCase()
        const user = await prisma.user.findUnique({ where: { email: normalizedEmail } })
        if (!user) {
            return Response.json({ message: 'No user found', style: 'text-red-500' }, { status: 404 })
        }
        const hashed = await bcrypt.hash(newPassword, 10)

        await prisma.user.update({
            where: { email: normalizedEmail },
            data: {
                password: hashed,
            },
        })
        await prisma.oTP.deleteMany({
            where: {
                email: normalizedEmail,
            },
        })

        return Response.json({ message: 'Password reset successful', style: 'text-green-500' }, { status: 200 })
    } catch (error) {
        return Response.json({ message: error.message, style: 'text-red-500' }, { status: 500 })
    }

}