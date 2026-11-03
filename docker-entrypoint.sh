#!/bin/sh
set -eu

export SITE_ADDRESS="${SITE_DOMAIN:-:80}"
caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
node index.ts "$@"
exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile
