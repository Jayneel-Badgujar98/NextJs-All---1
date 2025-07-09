import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const user = await prisma.InternalUsers.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const tasks = await prisma.Task.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: { user: true },
    });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error in getTasksByEmail API:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
