import { Client } from "pg"

const {
  DB_HOST = "localhost",
  DB_PORT = "5432",
  DB_USER = "poketenashi",
  DB_PASSWORD = "password",
} = process.env

export const client = new Client({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
})

client.connect()
