# syntax=docker/dockerfile:1
   
# Использование официального образа node в качестве базового образа
FROM node

# Установка рабочей директории внутри контейнера
WORKDIR /app

# Копирование package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование файлов проекта внутрь контейнера
COPY . .

# Запуск сервера приложения на порту 3000
EXPOSE 3000
CMD ["npm", "run", "dev"]
