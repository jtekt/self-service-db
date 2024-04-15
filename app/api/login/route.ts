import { Client } from "pg"
import { NextResponse } from "next/server"
import { DB_HOST, DB_PORT, JWT_SECRET } from "@/config"
import { createToken } from "@/app/lib/actions"
type Credentials = {
  username: string
  password: string
}

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

  await client.connect()

  const token = await createToken({ username })

  return NextResponse.json({ token }, { status: 200 })
}
