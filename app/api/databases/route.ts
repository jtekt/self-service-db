import { pool } from "@/db"
import { NextResponse } from "next/server"
import { getUserIdByName } from "@/app/lib/actions"
import format from "pg-format"

const getDbsOfuser = async (userId: number) => {
  const query = `SELECT datname FROM pg_catalog.pg_database WHERE pg_catalog.pg_database.datdba = $1;`

  const res = await pool.query(query, [userId])
  return res.rows.map(({ datname }) => datname)
}

export async function POST(request: Request) {
  const xUserHeader = request.headers.get("X-User")
  if (!xUserHeader) throw "Missing X-User header"
  const { username } = JSON.parse(xUserHeader)
  const { database } = await request.json()

  const query = format(`CREATE DATABASE %I WITH OWNER %s`, database, username)

  await pool.query(query)

  return NextResponse.json({ database, username }, { status: 200 })
}

export async function GET(request: Request) {
  const xUserHeader = request.headers.get("X-User")
  if (!xUserHeader) throw "Missing X-User header"
  const { username } = JSON.parse(xUserHeader)

  const userId = await getUserIdByName(username)
  const DBs = await getDbsOfuser(userId)

  return NextResponse.json({ items: DBs }, { status: 200 })
}
