FROM mongo:7.0.9-jammy

ENV LANG=${LANG}

COPY init_db.sh /docker-entrypoint-initdb.d/

EXPOSE $MONGO_PORT
