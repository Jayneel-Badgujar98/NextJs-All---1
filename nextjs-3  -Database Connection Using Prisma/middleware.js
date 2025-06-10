import { NextResponse } from "next/server";

export function middleware(req){

    if(req.cookies.get("isPremium")?.value === "true"){
        return NextResponse.next()
    }
    else {
        return NextResponse.redirect(new URL("/upgrade",req.url))
    }
}

export const config = {
    matcher : ["/premium/:path*"]
}