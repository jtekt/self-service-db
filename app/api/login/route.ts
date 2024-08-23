import { NextResponse } from "next/server"
import { login } from "@/app/lib/auth"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  try {
    const token = await login(username, password)
    return NextResponse.json({ token }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 })
  }
}
