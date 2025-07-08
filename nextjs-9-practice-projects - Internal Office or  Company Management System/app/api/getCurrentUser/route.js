import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req) {
    try {


        const name = req.cookies.get('name')?.value, email = req.cookies.get('email')?.value, role = req.cookies.get('name')?.value;

        if (!name || !email || !role) {
            return NextResponse.json({ error: "User not logged in" }, { status: 401 });
        }

        return NextResponse.json({ name, email, role }, { status: 200 });
    }
    catch (error) {
        console.error("Error getting current user:", error);
        return NextResponse.json({ error: "Failed to get current user" }, { status: 500 });
    }
}