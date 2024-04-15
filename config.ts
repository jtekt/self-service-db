export const {
  NEXT_PUBLIC_DB_HOST = "localhost",
  NEXT_PUBLIC_DB_PORT = "5432",
  DB_USER = "postgres",
  DB_PASSWORD = "password",
  DB_USE_SSL,
  DB_INSECURE,
  JWT_SECRET = "sh...",
  TOKEN_COOKIE_NAME = "self_db_token",
} = process.env

export const encodedJwtSecret = new TextEncoder().encode(JWT_SECRET)
