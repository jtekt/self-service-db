import { Hono } from "hono"
import { createDatabase, readDatabases } from "./controllers/databases"
import { createUser } from "./controllers/users"
import { login } from "./controllers/auth"
import { middleware } from "./controllers/auth"
const { IDENTIFICATION_URL = "http://10.115.1.100:30097/v3/users/self" } =
  process.env

const app = new Hono()

app.post("/login", login)
app.post("/users", createUser)

app.use(middleware({ url: IDENTIFICATION_URL }))
app.get("/databases", readDatabases)
app.post("/databases", createDatabase)

export default app
