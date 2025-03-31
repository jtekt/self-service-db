import { Client } from "pg";
import { DB_HOST, DB_PORT, roleOptions } from "@/config";
import * as jose from "jose";
import { encodedJwtSecret } from "@/config";
import format from "pg-format";
import { pool } from "@/db";

export async function createToken(data: any) {
  const token = await new jose.SignJWT(data)
    .setProtectedHeader({ alg: "HS256" })
    .sign(encodedJwtSecret);

  return token;
}

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

  try {
    await pool.query(query);
  } catch (error: any) {}

  return await createToken({ username });
}
