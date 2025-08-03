# syntax = docker/dockerfile:1.2

FROM oven/bun:latest AS base

ENV NODE_ENV="production"
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3 ca-certificates

FROM base as codegen
WORKDIR /usr/src/app

# Copy source code
COPY . .

RUN bun install turbo --global

FROM base as builder
WORKDIR /usr/src/app

# Install node modules
RUN bun install
# Build application
RUN  bun x turbo build

FROM base as runner 
WORKDIR /usr/src/app

# Copy built application f
COPY --from=builder /usr/src/app/servers/bot .
COPY --from=builder /usr/src/app/web/www ./public

ENV HOST="0.0.0.0"
ENV PORT=10004
ENV NODE_ENV=production

CMD ["bun", "x", "pm2-runtime", "start", "ecosystem.config.js"]
