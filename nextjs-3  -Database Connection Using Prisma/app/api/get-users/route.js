import React from 'react'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const GET = async () => {
    const getUsers = await prisma.newUser.findMany()
    return Response.json(getUsers)
}

