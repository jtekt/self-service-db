import { pool } from "@/db"
import { headers } from "next/headers"
import format from "pg-format"

export const getUserIdByName = async (username: string) => {
  const query = `SELECT usesysid FROM pg_catalog.pg_user WHERE usename = $1;`

  const res = await pool.query(query, [username])
  const [user] = res.rows
  return user.usesysid
}

export const getUserNameById = async (userId: number) => {
  const query = `SELECT usename FROM pg_catalog.pg_user WHERE usesysid = $1;`

  const res = await pool.query(query, [userId])
  const [user] = res.rows
  return user.usename
}

export const getDbsOfuser = async (userId: number) => {
  const query = `SELECT datname FROM pg_catalog.pg_database WHERE pg_catalog.pg_database.datdba = $1;`
  const res = await pool.query(query, [userId])
  return res.rows.map(({ datname }) => datname)
}

export async function checkIfDbExists(database: string) {
  const query = `SELECT 1 FROM pg_catalog.pg_database WHERE pg_catalog.pg_database.datname = $1`
  const { rows } = await pool.query(query, [database])
  return !!rows.length
}

export const getDbOfUser = async (userId: number, dbName: string) => {
  const query = `SELECT datname FROM pg_catalog.pg_database WHERE pg_catalog.pg_database.datdba = $1 AND pg_catalog.pg_database.datname = $2;`

  const res = await pool.query(query, [userId, dbName] as any)
  const [db] = res.rows.map(({ datname }) => datname)
  return db
}

export const createDb = async (database: string, ownerName: string) => {
  const dbExists = await checkIfDbExists(database)
  if (dbExists) throw new Error(`DB ${database} already exists`)

  const query = format(`CREATE DATABASE %I WITH OWNER %s`, database, ownerName)

  await pool.query(query)

  return database
}

export const deleteDB = async (name: string) => {
  const query = format(`DROP DATABASE %I`, name)

  await pool.query(query)
}
