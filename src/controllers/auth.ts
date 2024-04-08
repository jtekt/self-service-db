import { Context, Next } from "hono"
import { Client } from "pg"
import * as jwt from "jsonwebtoken"
import { HTTPException } from "hono/http-exception"

const {
  DB_HOST = "localhost",
  DB_PORT = "5432",
  JWT_SECRET = "sh...",
} = process.env

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
  })

  await client.connect()

  const token = jwt.sign({ username }, JWT_SECRET)

  return c.json({ token })
}

type Options = {
  url: string
}

export const middleware = (opts: Options) => async (c: Context, next: Next) => {
  const { url } = opts

  const Authorization = c.req.header("Authorization")

  if (!Authorization)
    throw new HTTPException(401, { message: "Authorization header not set" })

  const token = Authorization.split(" ")[1]
  if (!token) new HTTPException(401, { message: "Token not found" })
  const user = jwt.verify(token, JWT_SECRET)

  c.set("user", user)

  await next()
}
