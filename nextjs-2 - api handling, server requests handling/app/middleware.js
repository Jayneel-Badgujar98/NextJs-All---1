// import { NextResponse } from "next/server";

// export function middleware(request){
//     const isloggedin = request.cookies.get("loggedin")

//     if(isloggedin !== "true"){
//         return NextResponse.redirect(new URL("/login",request.url))
//     }
//     return NextResponse.next()
// }
// export const config = {
//     matcher : ["/profile/:path*"]
// }
import { NextResponse } from "next/server";

export function middleware(request){
    const isAdmin = request.cookies.get("role")

    if(role !== "admin"){
        // Redirect to a not authorized page if the user is not an admin
        return NextResponse.redirect(new URL("/not-authorized",request.url))
    }
    return NextResponse.next()
}
export const config = {
    matcher : ["/admin/:path*"]
}