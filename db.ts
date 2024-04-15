import { Pool } from "pg"
import {
  NEXT_PUBLIC_DB_HOST,
  NEXT_PUBLIC_DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_USE_SSL,
  DB_INSECURE,
} from "./config"

export const pool = new Pool({
  host: NEXT_PUBLIC_DB_HOST,
  port: Number(NEXT_PUBLIC_DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: !!DB_USE_SSL
    ? { rejectUnauthorized: DB_INSECURE ? false : undefined }
    : undefined,
})
