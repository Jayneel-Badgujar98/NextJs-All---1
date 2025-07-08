import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(){
    try {
        const employee = await prisma.InternalUsers.findMany({where: {role: "employee"}})
        return NextResponse.json(employee)
        
    } catch (error) {
        console.error("Error in getEmployee API:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
