import { type NextRequest, NextResponse } from "next/server"
import { encodedJwtSecret } from "@/config"
import * as jose from "jose"

export async function middleware(request: NextRequest) {
  // Middleware used for authentication
  const anonymousRoutes = ["/login", "/register"]
  if (anonymousRoutes.includes(request.nextUrl.pathname)) return

  const authHeader = request.headers.get("Authorization")

  if (!authHeader) throw new Error("Auth header not set")

  const [_, token] = authHeader?.split(" ")

  if (!token) return Response.redirect(new URL("/login", request.url))
  const currentUser = (await jose.jwtVerify(token, encodedJwtSecret)).payload
  if (!currentUser) return Response.redirect(new URL("/login", request.url))

  // Passing user data as stringified json
  // This is quite sketchy
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("X-User", JSON.stringify(currentUser))

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: "/api/databases(.*)",
}
