// filepath: app/api/set-token/route.js
// app/api/set-token/route.js
export const runtime = 'nodejs'; // 👈 Add this line at the top

import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const secret = "secretkey";

export async function POST(req) {
  const { username, role } = await req.json();

  const token = jwt.sign({ username, role }, secret, { expiresIn: "1h" });

  const response = NextResponse.json({ message: "Token set successfully" }, { status: 200 });

  response.cookies.set("admin-token", token, {
    httpOnly: true,
    maxAge: 3600,
  });

  return response;
}
