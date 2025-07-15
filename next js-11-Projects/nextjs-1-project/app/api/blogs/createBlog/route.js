// file - app/api/blogs/createBlog/route.js
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { title, content } = await req.json();
        if (!title || !content) return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        console.log(title, content);
        const blog = await prisma.blog.create({
            data: {
                title, 
                content,
                userId: "123",
            }
        })
        console.log(blog);
        return NextResponse.json(blog, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}