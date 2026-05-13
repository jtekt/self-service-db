# Self service DB

A Next.js application which allows users to create their own databases in a PostgreSQL® instance

## Environment variables

| Variable                                 | Description                                       | Default   |
| ---------------------------------------- | ------------------------------------------------- | --------- |
| DB_HOST                                  | PostgreSQL® host                                  | localhost |
| DB_PORT                                  | PostgreSQL® port                                  | 5432      |
| DB_USER                                  | Administrator username of the PostgreSQL instance | postgres  |
| DB_PASSWORD                              | PostgreSQL® administrator password                | password  |
| DB_USE_SSL                               | Whether to connect to PostgresQL using SSL or not | false     |
| DB_INSECURE                              | Whether to allow insecure DB connections          | false     |
| NEXT_PUBLIC_DB_HOST                      | DB host as displayed to users                     |           |
| NEXT_PUBLIC_DB_PORT                      | DB port as displayed to users                     |           |
| NEXT_PUBLIC_DB_SSL_MODE                  | DB ssl mode as displayed to users                 |           |
| NEXT_PUBLIC_PREFIX_DB_NAME_WITH_USERNAME | Prefix database names with username               | false     |
| NEXT_PUBLIC_DISABLE_USER_REGISTRATION    | Prevent user registration                         | false     |
| NEXT_PUBLIC_DISABLE_DATABASE_CREATION    | Prevent database creation                         | false     |
