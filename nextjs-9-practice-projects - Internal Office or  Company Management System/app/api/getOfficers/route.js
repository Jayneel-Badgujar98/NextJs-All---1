import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(){
    try {
        const officers = await prisma.InternalUsers.findMany({where: {role: "officer"}})
        return NextResponse.json(officers)
    } catch (error) {
        console.error("Error in getOfficers API:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}