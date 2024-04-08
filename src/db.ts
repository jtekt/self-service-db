import { Pool } from "pg"
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } from "./config"

export const pool = new Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})
