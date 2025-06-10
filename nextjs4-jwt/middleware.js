// filepath: c:\Users\ASUS\OneDrive\Desktop\Practice Of Websites 2\POW-4 Website 4 Next js all\nextjs4-jwt\middleware.js
// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // 👈 Use jose instead of jsonwebtoken

const secret = new TextEncoder().encode("secretkey");

export async function middleware(req) {
  const token = req.cookies.get("admin-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    console.log("Verified user:", payload);

    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/normal-user", req.url));
    }

    return NextResponse.next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
