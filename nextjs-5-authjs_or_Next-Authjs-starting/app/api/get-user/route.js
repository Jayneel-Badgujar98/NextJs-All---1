import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const prisma = new PrismaClient();
export async function GET(req) {
    const token = req.cookies.get("admin-token")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const finduser = await prisma.user.findUnique({
            where: {
                email: payload.email
            },
            select: {
                id: true,
                email: true,
                password: true
            }
        })
        return NextResponse.json({ message: "User found", user: finduser }, { status: 200 });
    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}