// import NextAuth from "next-auth";
// import { authOptions } from "@/lib/auth";

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

// path: app/api/auth/[...nextauth]/route.js


// import NextAuth from "next-auth"
// import GitHubProvider from "next-auth/providers/github"
// // import { PrismaAdapter } from "@auth/prisma-adapter"
// // import { PrismaClient } from "@prisma/client"

// // const prisma = new PrismaClient()

// const handler = NextAuth({
//     // adapter: PrismaAdapter(prisma),
//     providers: [
//         GitHubProvider({
//             clientId: process.env.GITHUB_ID,
//             clientSecret: process.env.GITHUB_SECRET,
//         }),
//     ],
//     session: {
//         strategy: "jwt",
//     },
//     secret: process.env.NEXTAUTH_SECRET,
// })

// export { handler as GET, handler as POST }

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // ✅ use your shared config

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
