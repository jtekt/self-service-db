import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { SESSION_SECRET, SESSION_COOKIE_NAME } from "@/config";

// Following https://nextjs.org/docs/app/guides/authentication#stateless-sessions

type SessionPayload = {
  userId: number;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  const encodedKey = new TextEncoder().encode(SESSION_SECRET);

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  const encodedKey = new TextEncoder().encode(SESSION_SECRET);

  // TODO: let it throw an error
  try {
    const options = { algorithms: ["HS256"] };
    const { payload } = await jwtVerify(session, encodedKey, options);
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  (await cookies()).set(SESSION_COOKIE_NAME, session);
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE_NAME);
}

// This is not in the guide
export async function getUserIdFromSession() {
  const cookie = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  const session = await decrypt(cookie);
  return session?.userId;
}
