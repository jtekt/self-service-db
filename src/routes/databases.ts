import { Hono } from "hono"
import {
  createDatabase,
  readDatabases,
  readDatabase,
  deleteDatabase,
} from "../controllers/databases"

const router = new Hono()

router.get("/", readDatabases)
router.post("/", createDatabase)
router.get("/:name", readDatabase)
router.delete("/:name", deleteDatabase)

export default router
