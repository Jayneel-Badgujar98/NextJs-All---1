// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";

// const handler = NextAuth({
//     providers: [
//       GithubProvider({
//         clientId: process.env.GITHUB_ID,
//         clientSecret: process.env.GITHUB_SECRET,
//       }),
//     ],
//   })
  
//   export { handler as GET, handler as POST }

// app/api/auth/[...nextauth]/route.js
// import NextAuth from 'next-auth'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import prisma from '@/lib/prisma'
// import { compare } from 'bcryptjs'

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials) {
//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email }
//         })

//         if (!user) throw new Error('No user found')

//         const isValid = await compare(credentials.password, user.password)

//         if (!isValid) throw new Error('Invalid password')

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name
//         }
//       }
//     })
//   ],
//   session: { strategy: 'jwt' },
//   pages: {
//     signIn: '/login'
//   }
// })

// export { handler as GET, handler as POST }

// app/api/auth/[...nextauth]/route.js
import { handler } from "@/lib/auth";
export { handler as GET, handler as POST };
