#! /bin/bash

cd ./my-app

if [ -d "node_modules" ]; then
rm -rf node_modules; 
else 
echo "Папка не найдена"

fi
name=test

echo "Установка зависимостей $name"
npm i


echo "Запуск приложения"
npm run dev