import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    const body = await req.json(); // Request body se data uthaya

    const user = await prisma.newUser.create({
        data: {
            name: body.name,
            email: body.email,
            hobbies: body.hobbies, // Assuming hobbies is an array of strings
        },
    });

    return Response.json(user);
}
