import { pool } from "@/db"
import { NextResponse } from "next/server"
import { DB_HOST, DB_PORT } from "@/config"
import { getUserIdByName } from "@/app/lib/databases"
import format from "pg-format"
import { getDbOfUser } from "@/app/lib/databases"

type Params = {
  name: string
}

export async function GET(request: Request, context: { params: Params }) {
  const { name } = context.params

  const xUserHeader = request.headers.get("X-User")
  if (!xUserHeader)
    return NextResponse.json(
      { message: `Missing X-User header` },
      { status: 401 }
    )
  const { username } = JSON.parse(xUserHeader)

  const userId = await getUserIdByName(username)
  const db = await getDbOfUser(userId, name)

  if (!db)
    return NextResponse.json(
      { message: `DB ${name} not found for user ${username}` },
      { status: 404 }
    )

  return NextResponse.json(
    { username, db, host: DB_HOST, port: DB_PORT },
    { status: 200 }
  )
}

export async function DELETE(request: Request, context: { params: Params }) {
  const { name } = context.params

  const xUserHeader = request.headers.get("X-User")
  if (!xUserHeader)
    return NextResponse.json(
      { message: `Missing X-User header` },
      { status: 401 }
    )
  const { username } = JSON.parse(xUserHeader)

  const userId = await getUserIdByName(username)
  const [db] = await getDbOfUser(userId, name)
  if (!db)
    return NextResponse.json(
      { message: `DB ${name} not found for user ${username}` },
      { status: 404 }
    )

  const query = format(`DROP DATABASE %I`, name)

  await pool.query(query)

  return NextResponse.json(
    { username, db, host: DB_HOST, port: DB_PORT },
    { status: 200 }
  )
}
