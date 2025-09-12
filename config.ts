export const {
  DB_HOST = "localhost",
  DB_PORT = "5432",
  DB_USER = "postgres",
  DB_PASSWORD = "password",
  DB_USE_SSL,
  DB_INSECURE,
  SESSION_COOKIE_NAME = "self_db_session",
  SESSION_SECRET = "",
  ROLE_OPTIONS = "NOSUPERUSER,CREATEDB,CREATEROLE,INHERIT",
  NEXT_PUBLIC_PREFIX_DB_NAME_WITH_USERNAME,
} = process.env;

// export const encodedJwtSecret = new TextEncoder().encode(JWT_SECRET);
export const roleOptions = ROLE_OPTIONS.split(",").join(" ");
