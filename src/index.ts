import { Hono } from "hono"
import {
  createDatabase,
  readDatabases,
  readDatabase,
  deleteDatabase,
} from "./controllers/databases"
import { createUser } from "./controllers/users"
import { login } from "./controllers/auth"
import { middleware } from "./controllers/auth"
import { cors } from "hono/cors"
import { DB_HOST, DB_PORT } from "./config"

const app = new Hono()
app.use(cors())
app.get("/", (c) =>
  c.json({
    application: "DB on demand",
    db: {
      host: DB_HOST,
      port: DB_PORT,
    },
  })
)
app.post("/login", login)
app.post("/users", createUser)

app.use(middleware)
app.get("/databases", readDatabases)
app.post("/databases", createDatabase)
app.get("/databases/:name", readDatabase)
app.delete("/databases/:name", deleteDatabase)

export default app
