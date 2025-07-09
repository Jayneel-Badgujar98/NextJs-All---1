import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { userId, task, sendedByRole , sendedByName} = await req.json();
        

        const taskAssigned = await prisma.Task.create({
            data: {
                userId,
                task_info: task.trim(),
                sendedByRole,
                sendedByName 
            }
        })
        
        return NextResponse.json(taskAssigned, { status: 200 })
    } catch (error) {
        console.error("Error Assigning task:", error);
        return NextResponse.json({ error: "Failed to assing task user" }, { status: 500 });
    }
}