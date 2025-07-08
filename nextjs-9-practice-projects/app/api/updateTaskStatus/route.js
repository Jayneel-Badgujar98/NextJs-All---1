import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export async function POST(req) {
    try {
        const { taskId, status } = await req.json();
        const updatedTask = await prisma.Task.update({
            where: { id: taskId },
            data: { status : status },
        });
        return NextResponse.json(updatedTask, { status: 200 });
    } catch (error) {
        console.error("Error updating task status:", error);
        return NextResponse.json({ error: "Failed to update task status" }, { status: 500 });
    }
}