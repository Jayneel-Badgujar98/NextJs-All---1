import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   console.log("🔑 JWT Session in middleware:", session); // 🧪 Add this line to debug

  // Allow all public/static/auth/api routes
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup")  // 👈 Add this line temporarily
  ) {
    return NextResponse.next();
  }

  // If no session, redirect to /signin
  if (!session) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|images).*)"],
};
