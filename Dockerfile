FROM caddy:2 AS caddy

FROM node:26-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

COPY --from=caddy /usr/bin/caddy /usr/bin/caddy
COPY Caddyfile /etc/caddy/Caddyfile
COPY --chmod=755 docker-entrypoint.sh /usr/local/bin/site-entrypoint

ENV XDG_DATA_HOME=/data \
    XDG_CONFIG_HOME=/config

EXPOSE 80 443

ENTRYPOINT ["site-entrypoint"]
