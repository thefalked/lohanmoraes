FROM oven/bun:1-alpine AS build

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run assets && bun run build

FROM oven/bun:1-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["bun", "dist/index.html", "--hostname=0.0.0.0"]
