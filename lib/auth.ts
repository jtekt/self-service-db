import { Client } from "pg";
import { DB_HOST, DB_PORT, roleOptions } from "@/config";
import { format } from "node-pg-format";
import { pool } from "@/db";

export async function login(username: string, password: string) {
  const client = new Client({
    host: DB_HOST,
    port: Number(DB_PORT),
    user: username,
    password,
    database: "postgres",
  });

  await client.connect();
}

export async function register(username: string, password: string) {
  if (!username) throw "Missing username";

  const query = format(
    `CREATE ROLE %I WITH LOGIN PASSWORD '%s' %s;`,
    username,
    password,
    roleOptions
  );

  await pool.query(query);
}
