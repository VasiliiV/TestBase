#!/bin/bash

# Установка Jenkins
echo "Установка Jenkins..."
brew install jenkins-lts

# Запуск Jenkins
echo "Запуск Jenkins..."
brew services start jenkins-lts

# Установка Maven, если он еще не установлен
if ! type "mvn" > /dev/null; then
  echo "Установка Maven..."
  brew install maven
fi

# Печать версии Maven для проверки
mvn -v

echo "Jenkins и Maven установлены."

# Ожидание запуска Jenkins
echo "Ожидание запуска Jenkins..."
sleep 30 # Подождите некоторое время, пока Jenkins полностью запустится

# Открытие Jenkins в браузере
echo "Открытие Jenkins в браузере..."
open http://localhost:8080