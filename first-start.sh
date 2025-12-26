#!/bin/bash
set -e

echo "=== Переход в папку приложения ==="
cd ./my-app

echo "=== Установка зависимостей ==="
npm install
npm install jsonwebtoken bcrypt

# Секреты для JWT генерируются автоматически при первом запуске API

echo "=== Запуск unit-тестов (Jest) ==="
npm run test

echo "=== Запуск приложения в фоне ==="
npm run dev &

echo "Ожидание старта приложения..."
sleep 10

echo "=== Возврат в корень проекта ==="
cd ..

echo "=== Запуск Playwright тестов ==="
npx playwright test --config=playwright.config.js

echo "=== Готово ==="
echo "Приложение продолжает работать в фоне"
echo "Для остановки приложения вручную используй:"
echo "  lsof -i :3000"
echo "  kill <PID>"
