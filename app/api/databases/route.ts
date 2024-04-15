import { pool } from "@/db"
import format from "pg-format"
import { NextResponse } from "next/server"

const getUserIdByName = async (username: string) => {
  const query = `SELECT usesysid FROM pg_catalog.pg_user WHERE usename = $1;`

  const res = await pool.query(query, [username])
  const [user] = res.rows
  return user.usesysid
}
const getDbsOfuser = async (userId: number) => {
  const query = `SELECT datname FROM pg_catalog.pg_database WHERE pg_catalog.pg_database.datdba = $1;`

  const res = await pool.query(query, [userId])
  return res.rows.map(({ datname }) => datname)
}

const getDbOfUser = async (userId: number, dbName: string) => {
  const query = `SELECT datname FROM pg_catalog.pg_database WHERE pg_catalog.pg_database.datdba = $1 AND pg_catalog.pg_database.datname = $2;`

  const res = await pool.query(query, [userId, dbName] as any)
  return res.rows.map(({ datname }) => datname)
}

export async function GET(request: Request) {
  // PROBLEM: get user ID
  const xUserHeader = request.headers.get("X-User")
  if (!xUserHeader) throw "Missing X-User header"
  const { username } = JSON.parse(xUserHeader)

  const userId = await getUserIdByName(username)
  const DBs = await getDbsOfuser(userId)

  console.log(DBs)
  // return c.json({ items: DBs })
  return NextResponse.json({ items: DBs }, { status: 200 })
}
