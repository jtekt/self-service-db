import { pool } from "@/db"

export const getUserIdByName = async (username: string) => {
  const query = `SELECT usesysid FROM pg_catalog.pg_user WHERE usename = $1;`

  const res = await pool.query(query, [username])
  const [user] = res.rows
  return user.usesysid
}
