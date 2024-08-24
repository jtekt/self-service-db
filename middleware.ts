import { type NextRequest, NextResponse } from "next/server"

import { getUserIdFromSession } from "./app/lib/sessions"

// Middleware used for authentication
export async function middleware(request: NextRequest) {
  const anonymousRoutes = ["/login", "/register"]
  if (anonymousRoutes.includes(request.nextUrl.pathname)) return

  const userId = await getUserIdFromSession()

  // TODO: also allow auth header

  // const authHeader = request.headers.get("Authorization")

  // if (!authHeader)
  //   return NextResponse.json(
  //     { message: `Authorization header not set` },
  //     { status: 401 }
  //   )

  // const [_, token] = authHeader?.split(" ")

  // if (!token)
  //   return NextResponse.json({ message: `Token not found` }, { status: 401 })

  // let verifiedJwt: any
  // try {
  //   verifiedJwt = await jose.jwtVerify(token, encodedJwtSecret)
  // } catch (error) {
  //   return NextResponse.json(
  //     { message: `Token verification failed` },
  //     { status: 401 }
  //   )
  // }
  // const currentUser = verifiedJwt.payload

  if (!userId) return NextResponse.redirect(new URL("/login", request.nextUrl))

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
