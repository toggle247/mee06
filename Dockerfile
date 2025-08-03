# syntax = docker/dockerfile:1.2

FROM oven/bun:latest AS base

ENV NODE_ENV="production"
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3 ca-certificates

FROM base AS builder
WORKDIR /usr/src/app

# Copy source codex
COPY . .
RUN bun install turbo --global
RUN bun install
RUN bun x turbo build

FROM base AS runner
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/servers/bot .
COPY --from=builder /usr/src/app/web/www ./public

EXPOSE 10004
ENV PORT=10004
ENV HOST="0.0.0.0"
ENV NODE_ENV=production


CMD ["bun", "x", "pm2-runtime", "start", "ecosystem.config.js"]