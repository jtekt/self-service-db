# Self service DB

A Next.js application which allows users to create their own databases in a PostgreSQL® instance

## Environment variables

Flags marked "any non-empty value" are enabled by any non-empty string, including `false`. Leave them unset to disable.

| Variable                                 | Description                                                                 | Default                                  |
| ---------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------- |
| DB_HOST                                  | PostgreSQL® host                                                            | localhost                                |
| DB_PORT                                  | PostgreSQL® port                                                            | 5432                                     |
| DB_USER                                  | Administrator username of the PostgreSQL instance                           | postgres                                 |
| DB_PASSWORD                              | PostgreSQL® administrator password                                          | password                                 |
| DB_USE_SSL                               | Connect to PostgreSQL using SSL (any non-empty value)                       |                                          |
| DB_INSECURE                              | With SSL, don't verify the server certificate (any non-empty value)         |                                          |
| ROLE_OPTIONS                             | Comma-separated options for created roles                                   | NOSUPERUSER,CREATEDB,CREATEROLE,INHERIT  |
| SESSION_SECRET                           | Secret used to sign the session cookie                                      |                                          |
| SESSION_COOKIE_NAME                      | Name of the session cookie                                                  | self_db_session                          |
| RDS_PROXY_NAME                           | If set, registers user credentials with this RDS Proxy                      |                                          |
| RDS_PROXY_AUTH_SECRET_PREFIX             | Prefix of the Secrets Manager secrets created for the RDS Proxy             | self-service-db-users                    |
| AWS_ACCESS_KEY                           | AWS access key for the RDS Proxy / Secrets Manager calls                    |                                          |
| AWS_SECRET_ACCESS_KEY                    | AWS secret key for the RDS Proxy / Secrets Manager calls                    |                                          |
| AWS_REGION                               | AWS region for the RDS Proxy / Secrets Manager calls                        | us-east-1                                |
| NEXT_PUBLIC_DB_HOST                      | DB host as displayed to users                                               |                                          |
| NEXT_PUBLIC_DB_PORT                      | DB port as displayed to users                                               |                                          |
| NEXT_PUBLIC_DB_SSL_MODE                  | DB ssl mode as displayed to users                                           | disable                                  |
| NEXT_PUBLIC_PREFIX_DB_NAME_WITH_USERNAME | Prefix database names with username (any non-empty value)                   |                                          |
| NEXT_PUBLIC_DISABLE_USER_REGISTRATION    | Prevent user registration (any non-empty value)                             |                                          |
| NEXT_PUBLIC_DISABLE_DATABASE_CREATION    | Prevent database creation (any non-empty value)                             |                                          |
| NEXT_PUBLIC_LOGIN_HINT                   | Optional hint shown on the login page                                       |                                          |
| NEXT_PUBLIC_HELP_URL                     | Optional help link shown in the header                                      |                                          |
| NEXT_PUBLIC_APPS_URL                     | Optional link to the apps portal shown in the header                        |                                          |

## Development

```bash
npm install
npm run dev
```

## Deployment

A release is a `vX.Y.Z` tag on `master`. GitLab CI (`.gitlab-ci.yml`) builds the Docker image, pushes it to public ECR as [`public.ecr.aws/jtekt-corporation/self-service-db`](https://gallery.ecr.aws/jtekt-corporation/self-service-db) (`:<tag>` and `:latest`), and applies `kubernetes_manifest.yml` to the cluster. Pushing `master` without a tag deploys nothing.
