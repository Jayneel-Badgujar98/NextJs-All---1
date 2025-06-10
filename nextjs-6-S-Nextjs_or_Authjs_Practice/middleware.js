// import { NextResponse } from "next/server";

// export function middleware(req){

//     if(req.cookies.get("isPremium")?.value === "true"){
//         return NextResponse.next()
//     }
//     else {
//         return NextResponse.redirect(new URL("/upgrade",req.url))
//     }
// }

// export const config = {
//     matcher : ["/premium/:path*"]
// }
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isAuth = !!token;
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (!isAuth && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (pathname.startsWith("/admin")) {
    if (!isAuth || token.role !== "admin") {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
