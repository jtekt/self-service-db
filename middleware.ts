import { type NextRequest, NextResponse } from "next/server"
import { encodedJwtSecret, TOKEN_COOKIE_NAME } from "@/config"
import * as jose from "jose"

export async function middleware(request: NextRequest) {
  // Middleware used for authentication
  const anonymousRoutes = ["/login", "/register"]
  if (anonymousRoutes.includes(request.nextUrl.pathname)) return

  let token: string | undefined = undefined

  const authHeader = request.headers.get("Authorization")

  if (authHeader) token = authHeader?.split(" ")[1]
  if (!token) token = request.cookies.get(TOKEN_COOKIE_NAME)?.value

  if (!token)
    return NextResponse.json({ message: `Token not found` }, { status: 401 })

  let verifiedJwt: any
  try {
    verifiedJwt = await jose.jwtVerify(token, encodedJwtSecret)
  } catch (error) {
    return NextResponse.json(
      { message: `Token verification failed` },
      { status: 401 }
    )
  }
  const currentUser = verifiedJwt.payload

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
  matcher: ["/api/databases(.*)", "/databases/new"],
}
