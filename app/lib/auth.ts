import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function createSession(user: {
  id: number;
  name: string;
  email: string;
}) {
  const token = await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);

  (await cookies()).set("session", token, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
}

export async function getSession() {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

export async function logoutSession() {
  (await cookies()).delete("session");
}

export async function getCurrentUser() {
  const token = (await cookies()).get("session")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch {
    return null;
  }
}
