import { Pool } from "pg";
import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_USE_SSL,
  DB_SSL_REJECT_UNAUTHORIZED,
} from "./config";
import { isDisabled, isEnabled } from "@/lib/utils";

export const commonOptions = {
  host: DB_HOST,
  port: Number(DB_PORT),
  ssl: isEnabled(DB_USE_SSL)
    ? { rejectUnauthorized: !isDisabled(DB_SSL_REJECT_UNAUTHORIZED) }
    : undefined,
};

const options = {
  ...commonOptions,
  user: DB_USER,
  password: DB_PASSWORD,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

export const pool = new Pool(options);
