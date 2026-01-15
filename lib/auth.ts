import { Client } from "pg";
import { roleOptions, DB_USER, RDS_PROXY_NAME, usernameRegex } from "@/config";
import { format } from "node-pg-format";
import { commonOptions, pool } from "@/db";
import { registerUserInRdsProxy } from "./rds";
import z from "zod";

export type Credentials = {
  username: string;
  password: string;
};

export async function login(credentials: Credentials) {
  const schema = z.object({
    username: z.string(),
    password: z.string(),
  });

  const { username, password } = schema.parse(credentials);
  const client = new Client({
    ...commonOptions,
    user: username,
    password,
    database: "postgres",
  });

  await client.connect();
}

export async function register(credentials: Credentials) {
  const schema = z.object({
    username: z.string().min(6).regex(usernameRegex),
    password: z.string(),
  });

  const { username, password } = schema.parse(credentials);

  if (RDS_PROXY_NAME) await registerUserInRdsProxy(username, password);

  const query = format(
    `CREATE ROLE %I WITH LOGIN PASSWORD '%s' %s;`,
    username,
    password,
    roleOptions
  );

  await pool.query(query);

  // Somehow needed for RDS
  await pool.query(format(`GRANT %s TO %s;`, username, DB_USER));
}
