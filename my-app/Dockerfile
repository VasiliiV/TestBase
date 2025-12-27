# этап сборки
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm ci
RUN npm run build

# этап запуска
FROM node:18-alpine

WORKDIR /app

# устанавливаем только продакшн-зависимости, чтобы избежать предупреждений npm о флаге production
COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

# используем заранее собранные артефакты вместо повторной сборки на этапе запуска
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

CMD ["node", "node_modules/next/dist/bin/next", "start"]
