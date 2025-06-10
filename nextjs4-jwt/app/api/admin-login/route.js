// filepath: app/api/admin-login/route.js
import { NextResponse } from "next/server";
import { createtoken } from "@/utils/jwt";

export function POST(req) {
  const token =  createtoken({
    id: 1,
    username: "admin",
    role: "admin",
  });

  const res = NextResponse.json({ message: "Admin login successful" });

  res.cookies.set("admin-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });

  console.log("Token set:", token); // will now be actual string, not [object Promise]

  return res;
}

