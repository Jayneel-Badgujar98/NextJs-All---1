// file - app/api/blogs/findBlog/route.js
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userId } = await req.json();
        if (!userId) {
         console.log("Missing userid")
        }
        const findBlog = await prisma.blog.findFirst({
            where: {
                userId,
            }
        })

        return NextResponse.json({ findBlog }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}