import { pool } from "@/db"
import format from "pg-format"
import { NextResponse } from "next/server"
import { NEXT_PUBLIC_DB_HOST, NEXT_PUBLIC_DB_PORT } from "@/config"
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

type Params = {
  name: string
}

export async function GET(request: Request, context: { params: Params }) {
  const { name } = context.params

  const xUserHeader = request.headers.get("X-User")
  if (!xUserHeader) throw "Missing X-User header"
  const { username } = JSON.parse(xUserHeader)

  const userId = await getUserIdByName(username)
  const [db] = await getDbOfUser(userId, name)

  return NextResponse.json(
    { username, db, host: NEXT_PUBLIC_DB_HOST, port: NEXT_PUBLIC_DB_PORT },
    { status: 200 }
  )
}
