import { Context } from "hono"
import { client } from "../db"
import format = require("pg-format")

const getUserIdByName = async (username: string) => {
  const query = `SELECT usesysid FROM pg_catalog.pg_user WHERE usename = $1;`

  const res = await client.query(query, [username])
  const [user] = res.rows
  return user.usesysid
}
const getDbsOfuser = async (userId: number) => {
  const query = `SELECT datname FROM pg_catalog.pg_database WHERE pg_catalog.pg_database.datdba = $1;`

  const res = await client.query(query, [userId])
  return res.rows.map(({ datname }) => datname)
}

export const readDatabases = async (c: Context) => {
  const user = c.get("user")
  const { username } = user
  const userId = await getUserIdByName(username)
  const DBs = await getDbsOfuser(userId)
  return c.json({ items: DBs })
}

export const createDatabase = async (c: Context) => {
  const { database } = await c.req.json<{ database: string }>()
  const user = c.get("user")
  const { username } = user

  const query = format(`CREATE DATABASE %I WITH OWNER %s`, database, username)

  await client.query(query)

  return c.json({ database, username })
}
