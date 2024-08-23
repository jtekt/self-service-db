import { pool } from "@/db"

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
  return res.rows.map(({ datname }) => datname)
}
