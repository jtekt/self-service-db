import { Client } from "pg"
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD } from "./config"

export const client = new Client({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
})

client.connect()
