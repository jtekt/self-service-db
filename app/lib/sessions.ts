import "server-only"
import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import { SESSION_SECRET, SESSION_COOKIE_NAME } from "@/config"

const encodedKey = new TextEncoder().encode(SESSION_SECRET)

type SessionPayload = {
  userId: number
  expiresAt: Date
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    console.log("Failed to verify session")
  }
}

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })

  cookies().set(SESSION_COOKIE_NAME, session, {
    path: "/",
  })
}

export async function getUserIdFromSession() {
  const cookie = cookies().get(SESSION_COOKIE_NAME)?.value
  const session = await decrypt(cookie)
  return session?.userId
}
