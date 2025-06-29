import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();
        if (!name || !email || !password) {
            return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
        }
        if (password.length < 6) {
            return NextResponse.json({ success: false, error: "Password must be at least 6 characters" }, { status: 400 })
        }
        const userExists = await prisma.User.findUnique({
            where: {
                email
            }
        })
        if (userExists) {
            return NextResponse.json({ success: false, error: "User already exists with this email go to signin instead of signup" }, { status: 400 })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.User.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        return NextResponse.json(
            {
                success: true,
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt
                }
            },
            { status: 201 } // Use 201 for resource creation
        );
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}