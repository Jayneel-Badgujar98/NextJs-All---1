// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import { prisma } from '@/lib/prisma'; // Adjust if your prisma file is elsewhere

// export async function POST(req) {
//   try {
//     const { name, email, password } = await req.json();

//     if (!email || !password) {
//       return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
//     }

//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return NextResponse.json({ message: 'User already exists' }, { status: 400 });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     });

//     return NextResponse.json({ message: 'User created successfully', user });
//   } catch (error) {
//     console.error('[SIGNUP_ERROR]', error);
//     return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
//   }
// }
// path: app/api/auth/signup/route.js
import { hash } from "bcryptjs";
import {prisma}  from "@/lib/prisma"; // or however you're importing Prisma

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password)
      return Response.json({ message: "Missing fields" }, { status: 400 });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return Response.json({ message: "User already exists" }, { status: 409 });

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return Response.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.error("[SIGNUP_ERROR]", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
