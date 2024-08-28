"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const key = new TextEncoder().encode(process.env.NEXT_JWT_SECRET_KEY);

export async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10h") //it was 10h before
    .sign(key);
}

export async function decrypt(input) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    // console.log("session decrypt : ", payload);
    return payload;
  } catch (error) {
    console.error("Session decryption error:", error);
    return null;
  }
}

export async function setCookies(session, expires) {
  try {
    // console.log("SESSION VALUE FROM /UTILS/LIB  = ", session, expires);

    cookies().set("session", session, {
      expires: expires,
      httpOnly: true,
    });
  } catch (error) {
    console.log("Error in setting cookies : ", error);
  }
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;
  const parsed = await decrypt(session);
  // parsed.expires = new Date(Date.now() + 10 * 60 * 60 * 1000);
  parsed.expires = new Date(Date.now() + 10 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}


export async function logout() {
  try {
    cookies().set("session", "", { expires: new Date(0) });
    return { success: true };
  } catch (error) {
    return { success: false, error: error };
  }
}
