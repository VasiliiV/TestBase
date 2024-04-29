#!/bin/bash

cd ./my-app

# Удаление папки node_modules, если она существует
if [ -d "node_modules" ]; then
    echo "Удаление существующей папки node_modules..."
    rm -rf node_modules
else 
    echo "Папка node_modules не найдена. Продолжение установки..."
fi

# Проверка наличия файла package.json перед установкой зависимостей
if [ -f "package.json" ]; then
    echo "Установка зависимостей..."
    npm i

    echo "Установка библиотеки для хеширования паролей и работы с JWT..."
    npm install jsonwebtoken bcrypt

    # Копирование .env.example в .env.local, если последний не существует
    if [ ! -f ".env.local" ]; then
        echo "Создание .env.local из .env.example..."
        cp .env.example .env.local
    fi

    echo "Запуск приложения..."
    npm run dev
else
    echo "Файл package.json не найден. Установка зависимостей невозможна."
fi