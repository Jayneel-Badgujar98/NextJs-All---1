import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
export async function POST(req) {
    try {

        const { email, password } = await req.json();
        const user = await prisma.InternalUsers.findUnique({
            where: {
                email: email,
            }
        })
        if (user) {
            if (user.password === password) {
                return NextResponse.json({ role: user.role , name : user.name}, { status: 200 })
            }
            else {
                return NextResponse.json({ error: "Incorrect password" }, { status: 400 })
            }
        }
        else {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }
    } catch (error) {
        console.error("Error in redirectLogin API:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}