import { Client } from "pg"
import { DB_HOST, DB_PORT, JWT_SECRET } from "@/config"

type Credentials = {
  username: string
  password: string
}

export async function POST(request: Request) {
  const { username, password } = await request.json()
  // This client is just used for credentials verification

  // TODO: sign token
  // const token = jwt.sign({ username }, JWT_SECRET)

  // TODO: reply to client
}
