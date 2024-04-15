import { Client } from "pg"
import { NextResponse } from "next/server"
import { NEXT_PUBLIC_DB_HOST, NEXT_PUBLIC_DB_PORT } from "@/config"
import { createToken } from "@/app/lib/actions"

export async function POST(request: Request) {
  const { username, password } = await request.json()
  // This client is just used for credentials verification
  const client = new Client({
    host: NEXT_PUBLIC_DB_HOST,
    port: Number(NEXT_PUBLIC_DB_PORT),
    user: username,
    password,
    database: "postgres",
  })

  await client.connect()

  const token = await createToken({ username })

  return NextResponse.json({ token }, { status: 200 })
}
