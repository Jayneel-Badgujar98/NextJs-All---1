import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const {  name, email, password, role} = await req.json();
        const user = await prisma.InternalUsers.create({ data : { 
            name: name,
            email: email,
            password: password,
            role: role,
         } })
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.error("Error Creating user:", error);
        return NextResponse.json({ error: "Failed to  Create user" }, { status: 500 });
    }
}