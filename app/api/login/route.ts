import { Client } from "pg"
import { NextResponse } from "next/server"
import { DB_HOST, DB_PORT } from "@/config"
import { createToken } from "@/app/lib/actions"

export async function POST(request: Request) {
  const { username, password } = await request.json()
  // This client is just used for credentials verification
  const client = new Client({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: username,
    password,
    database: "postgres",
  })

  try {
    await client.connect()
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 401 })
  }

  const token = await createToken({ username })

  return NextResponse.json({ token }, { status: 200 })
}
