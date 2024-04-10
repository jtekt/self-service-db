#!/bin/sh

ROOT_DIR=/app

# Replace env vars in files served by NGINX
echo "Replacing environment variables"
for file in $ROOT_DIR/assets/*.js* $ROOT_DIR/index.html;
do
  echo "Processing $file ...";

  sed -i 's|VITE_API_URL_PLACEHOLDER|'${VITE_API_URL}'|g' $file
  sed -i 's|VITE_DB_HOST_PLACEHOLDER|'${VITE_DB_HOST}'|g' $file
  sed -i 's|VITE_DB_PORT_PLACEHOLDER|'${VITE_DB_PORT}'|g' $file

done

exec "$@"
