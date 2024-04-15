export const {
  DB_HOST = "localhost",
  DB_PORT = "5432",
  DB_USER = "postgres",
  DB_PASSWORD = "password",
  DB_USE_SSL,
  DB_INSECURE,
  JWT_SECRET = "sh...",
  TOKEN_COOKIE = "self_db_token",
} = process.env
