FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies for the Next.js app located in /my-app
COPY my-app/package*.json ./
RUN npm install

# Copy the full app source and build for production
COPY my-app/ .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Install only production dependencies to keep the runtime image slim
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

# Copy the built Next.js assets and required config/static files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/netlife.toml ./netlife.toml

EXPOSE 8080

CMD ["sh", "-c", "node node_modules/next/dist/bin/next start -H 0.0.0.0 -p ${PORT:-8080}"]
