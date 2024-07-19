# Self DB

A Next.js application which allows users to create their own databases in a PostgreSQL instance

## Environment variables

| Variable          | Description                                       | Default       |
| ----------------- | ------------------------------------------------- | ------------- |
| JWT_SECRET        | Secret to encrypt JWTs host                       | sh...         |
| TOKEN_COOKIE_NAME | Cookie name for JWT                               | self_db_token |
| DB_HOST           | PostgreSQL host                                   | localhost     |
| DB_PORT           | PostgreSQL port                                   | 5432          |
| DB_USER           | Administrator username of the PostgreSQL instance | postgres      |
| DB_PASSWORD       | PostgreSQL administrator password                 | password      |
| DB_USE_SSL        | Whether to connect to PostgresQL using SSL or not | false         |
| DB_INSECURE       | Whether to allow insecure DB connections          | false         |
