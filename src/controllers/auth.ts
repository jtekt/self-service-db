import { Context, Next } from "hono"
import { Client } from "pg"
import * as jwt from "jsonwebtoken"
import { HTTPException } from "hono/http-exception"
import { DB_HOST, DB_PORT, JWT_SECRET } from "../config"

type Credentials = {
  username: string
  password: string
}
export const login = async (c: Context) => {
  const { username, password } = await c.req.json<Credentials>()
  const client = new Client({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: username,
    password,
    database: "postgres",
  })

  await client.connect()

  const token = jwt.sign({ username }, JWT_SECRET)

  return c.json({ token })
}

export const middleware = async (c: Context, next: Next) => {
  const Authorization = c.req.header("Authorization")

  if (!Authorization)
    throw new HTTPException(401, { message: "Authorization header not set" })

  const token = Authorization.split(" ")[1]
  if (!token) throw new HTTPException(401, { message: "Token not found" })

  try {
    const user = jwt.verify(token, JWT_SECRET)
    c.set("user", user)
    await next()
  } catch (error) {
    throw new HTTPException(401, { message: "Token validation failed" })
  }
}
