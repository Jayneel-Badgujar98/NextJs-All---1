// filepath: utils/jwt.js
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode("secretkey"); // Must be Uint8Array

export async function createtoken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
}

export async function verifytoken(token) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return null;
  }
}

