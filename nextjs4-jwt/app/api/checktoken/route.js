import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function GET(req) {
    const token = req.cookies.get("admin-token")?.value;
    const secret = new TextEncoder().encode("secretkey");
    try {
        if (!token) {
            return NextResponse.json({ message: "Token not found" }, { status: 401 });
        }

        const info = await jwtVerify(token, secret);
        return NextResponse.json({ message: "Token is valid", info }, { status: 200 });
    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ message: "Token is invalid" }, { status: 401 });
    }
}