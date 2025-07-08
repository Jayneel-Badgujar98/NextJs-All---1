import { NextResponse } from "next/server"
export function middleware(req) {
    const roleLoggedIn = req.cookies.get('roleLoggedIn')?.value;
    const { pathname } = req.nextUrl;
    if (pathname.startsWith("/login") || (roleLoggedIn && pathname.startsWith(`${roleLoggedIn}`))) {
        return NextResponse.next()
    }
    else {
        return NextResponse.redirect(new URL("/login", req.url))
    }
}
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        // Exclude API routes, static files, and the favicon
    ],
}