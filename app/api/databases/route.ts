import { pool } from "@/db"
import { NextResponse } from "next/server"
import { getUserIdByName } from "@/app/lib/actions"
import { checkIfDbExists, getDbsOfuser } from "@/app/lib/databases"
import format from "pg-format"

export async function POST(request: Request) {
  const xUserHeader = request.headers.get("X-User")
  if (!xUserHeader) throw "Missing X-User header"
  const { username } = JSON.parse(xUserHeader)
  const { database } = await request.json()

  const dbExists = await checkIfDbExists(database)
  if (dbExists)
    return NextResponse.json(
      { message: `DB ${database} already exists` },
      { status: 400 }
    )

  const query = format(`CREATE DATABASE %I WITH OWNER %s`, database, username)

  try {
    await pool.query(query)
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }

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
