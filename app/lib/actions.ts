import * as jose from "jose"
import { encodedJwtSecret } from "@/config"
import { pool } from "@/db"
export async function createToken(data: any) {
  const token = await new jose.SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedJwtSecret)

  return token
}

export const getUserIdByName = async (username: string) => {
  const query = `SELECT usesysid FROM pg_catalog.pg_user WHERE usename = $1;`

  const res = await pool.query(query, [username])
  const [user] = res.rows
  return user.usesysid
}
