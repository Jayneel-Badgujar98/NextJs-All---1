import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { sendedByName } = await req.json();
    const tasks = await prisma.Task.findMany({
      where: { sendedByName },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ tasks });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch assigned tasks" }, { status: 500 });
  }
}
