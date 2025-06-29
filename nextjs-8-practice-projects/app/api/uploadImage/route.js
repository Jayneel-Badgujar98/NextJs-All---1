import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import prisma from "@/lib/prisma"
export async function POST(req) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
    }
    const { imageUrl, title } = await req.json();
    if (!imageUrl || !title) {
        return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 })
    }

    try {
        // ✅ Get userId from DB via email
        const user = await prisma.User.findUnique({
            where: { email: session.user.email },
        })

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 })
        }
        const newImage = await prisma.ImagePost.create({
            data: {
                imageUrl,
                title,
                userId: user.id,
            },
        })

        return new Response(JSON.stringify({ success: true, data: newImage }), { status: 200 })
    } catch (err) {
        console.error("Upload error:", err)
        return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 })
    }
}
