import { Hono } from "hono"
import databaseRoutes from "./routes/databases"
import { createUser } from "./controllers/users"
import { login } from "./controllers/auth"
import { middleware } from "./controllers/auth"
import { cors } from "hono/cors"
import { DB_HOST, DB_PORT, DB_USE_SSL } from "./config"

const app = new Hono()
app.use(cors())
app.get("/", (c) =>
  c.json({
    application: "DB on demand",
    db: {
      host: DB_HOST,
      port: DB_PORT,
      ssl: !!DB_USE_SSL,
    },
  })
)
app.post("/login", login)
app.post("/users", createUser)

app.use(middleware)
app.route("/databases", databaseRoutes)

export default app
