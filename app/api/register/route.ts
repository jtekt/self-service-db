import { NextResponse } from "next/server"
import { createToken } from "@/app/lib/actions"
import format from "pg-format"
import { pool } from "@/db"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (!username) throw "Missing username"

  const query = format(
    `CREATE USER %I WITH LOGIN PASSWORD '%s'`,
    username,
    password
  )

  await pool.query(query)

  const token = await createToken({ username })

  return NextResponse.json({ token }, { status: 200 })
}
