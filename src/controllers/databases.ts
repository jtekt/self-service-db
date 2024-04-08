import { Context } from "hono"
import { client } from "../db"
import format = require("pg-format")
import { HTTPException } from "hono/http-exception"
import { DB_HOST, DB_PORT } from "../config"

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

const getDbOfUser = async (userId: number, dbName: string) => {
  const query = `SELECT datname FROM pg_catalog.pg_database WHERE pg_catalog.pg_database.datdba = $1 AND pg_catalog.pg_database.datname = $2;`

  const res = await client.query(query, [userId, dbName] as any)
  return res.rows.map(({ datname }) => datname)
}

export const readDatabases = async (c: Context) => {
  const user = c.get("user")
  const { username } = user
  const userId = await getUserIdByName(username)
  const DBs = await getDbsOfuser(userId)
  return c.json({ items: DBs })
}

export const readDatabase = async (c: Context) => {
  const name = c.req.param("name")
  const user = c.get("user")
  const { username } = user
  const userId = await getUserIdByName(username)
  const [db] = await getDbOfUser(userId, name)
  return c.json({ username, db, host: DB_HOST, port: DB_PORT })
}

export const createDatabase = async (c: Context) => {
  const { database } = await c.req.json<{ database: string }>()
  const user = c.get("user")
  const { username } = user

  const query = format(`CREATE DATABASE %I WITH OWNER %s`, database, username)

  await client.query(query)

  return c.json({ database, username })
}

export const deleteDatabase = async (c: Context) => {
  const name = c.req.param("name")
  const user = c.get("user")
  const { username } = user
  const userId = await getUserIdByName(username)
  const [db] = await getDbOfUser(userId, name)
  if (!db)
    throw new HTTPException(400, {
      message: `DB ${name} not found for user ${user}`,
    })
  const query = format(`DROP DATABASE %I`, name)

  await client.query(query)
  return c.json({ db })
}
