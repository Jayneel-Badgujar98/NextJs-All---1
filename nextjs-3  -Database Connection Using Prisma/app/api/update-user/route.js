import React from 'react'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export const PUT = async (req) => {

    const body = await req.json()
    const getUsers = await prisma.newUser.update({
        where : {
            id : body.id
        },
        data : {
            name : body.name,
            email : body.email,
            hobbies : body.hobbies
        }
    })
    return Response.json(getUsers)
}
