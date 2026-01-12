import { Pool } from "pg";
import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_USE_SSL,
  DB_INSECURE,
} from "./config";

const options = {
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: !!DB_USE_SSL
    ? { rejectUnauthorized: DB_INSECURE ? false : undefined }
    : undefined,
};

export const pool = new Pool(options);
