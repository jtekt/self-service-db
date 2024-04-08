import { Context } from "hono"
import { client } from "../db"
import format = require("pg-format")
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config"

type NewAccount = {
  username: string
  password: string
  passwordConfirm: string
}

export const createUser = async (c: Context) => {
  const { username, password, passwordConfirm } = await c.req.json<NewAccount>()

  if (!username) throw "Missing username"
  if (password !== passwordConfirm) throw "Password mismatch"

  const query = format(
    `CREATE USER %I WITH LOGIN PASSWORD '%s'`,
    username,
    password
  )

  await client.query(query)

  const token = jwt.sign({ username }, JWT_SECRET)

  return c.json({ token })
}
