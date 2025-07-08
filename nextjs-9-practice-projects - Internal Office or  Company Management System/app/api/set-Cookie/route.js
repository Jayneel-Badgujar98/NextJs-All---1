// In your API route (e.g., /api/set-cookie)
import { NextResponse } from "next/server";

export async function POST(req) {
  const { name, email, role } = await req.json();
  const response = NextResponse.json({ success: true });
  response.cookies.set("name", name, { path: "/" });
  response.cookies.set("email", email, { path: "/" });
  response.cookies.set("roleLoggedIn", role, { path: "/" });
  return response;
}
