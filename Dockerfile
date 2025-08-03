# syntax = docker/dockerfile:1.2

FROM oven/bun:latest AS base

ENV NODE_ENV="production"
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3 ca-certificates

FROM base AS builder
WORKDIR /usr/src/app

COPY . .
RUN bun install
RUN cd web/www && bun install && bun run build --verbose && cd -
RUN cd servers/bot && bun install && bun run build && cd -

FROM base AS runner
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/servers/bot .
COPY --from=builder /usr/src/app/web/www ./public

EXPOSE 10004
ENV PORT=10004
ENV HOST="0.0.0.0"
ENV NODE_ENV=production


CMD ["bun", "x", "pm2-runtime", "start", "ecosystem.config.js"]