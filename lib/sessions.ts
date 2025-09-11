import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { SESSION_SECRET, SESSION_COOKIE_NAME } from "@/config";
import { getUserNameById } from "./databases";
import { cache } from "react";

// Following https://nextjs.org/docs/app/guides/authentication#stateless-sessions

const encodedKey = new TextEncoder().encode(SESSION_SECRET);

type SessionPayload = {
  userId: number;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
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

  cookies().set(SESSION_COOKIE_NAME, session);
}

export async function deleteSession() {
  cookies().delete(SESSION_COOKIE_NAME);
}

// Those two are not in the guide
export async function getUserIdFromSession() {
  const cookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  const session = await decrypt(cookie);
  return session?.userId;
}

export const getUsernameCache = cache(async () => {
  const userId = await getUserIdFromSession();
  if (!userId) throw new Error("No user ID");
  return await getUserNameById(userId as number);
});
