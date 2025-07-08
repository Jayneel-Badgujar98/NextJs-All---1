import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { email } = await req.json();
        const user = await prisma.InternalUsers.findUnique({
            where : {
                email : email
            }
        })
        if(!user) {
           console.log("User not found for email:", email);
        }
        const tasks = await prisma.Task.findMany({where: {userId: user.id}, orderBy : {createdAt :  "desc"}});
        return NextResponse.json(tasks);
    } catch (error) {
        console.error("Error in getTasksByEmail API:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}