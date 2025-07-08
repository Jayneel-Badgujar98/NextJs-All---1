import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

// export async function DELETE(req) {
//     try {
//         const { userId } = await req.json();
//         const user = await prisma.InternalUsers.delete({ where: { id: userId } })
//         return NextResponse.json(user, { status: 200 })
//     } catch (error) {
//         console.error("Error deleting user:", error);
//         return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
//     }
// }

export async function DELETE(req) {
    try {
        const body = await req.json();
        console.log("DELETE Request Body:", body);

        const { userId } = body;
        // if (!userId) {
        //     console.error("Missing userId in request body");
        //     return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        // }

        const user = await prisma.InternalUsers.delete({
            where: { id: userId },
        });

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}
