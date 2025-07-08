import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { userId , newRole} = await req.json();
        const user = await prisma.InternalUsers.update({ where: { id: userId } , data : { role: newRole } })
        return NextResponse.json(user, { status: 200 })
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}