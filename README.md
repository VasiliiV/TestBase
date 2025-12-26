# progaBaseTest v.0.1.15

Автор: Vasiliy Volgin

Полностью разработан как учебная платформа для тестировщиков с UI, API, БД, моками, Docker и автотестами (UI, API, unit).

## Цель проекта
Дать тестировщику реальную среду, в которой можно потренироваться:
- писать тест-кейсы и баг-репорты, взаимодействуя с живым UI;
- изучать фронтенд + бекенд + базу данных;
- работать с API (GET/POST/PUT/DELETE) и JWT-аутентификацией;
- запускать автотесты на Java и JavaScript, собирать Allure-отчёты;
- попробовать DevOps-рутинy: Docker, Jenkins, mock-серверы.

## Быстрый старт

### 1. Подготовка окружения
- Node.js 18+ (для локального запуска без контейнеров)
- Docker + Docker Compose (для контейнерного запуска)
- Java 11+ и Maven (для Java-автотестов в `testBaseAutoTest`)

Переменные окружения для API лежат в `my-app/.env.example`. Скопируйте файл и задайте секреты перед локальным запуском:
```bash
cp my-app/.env.example my-app/.env.local
# отредактируйте ACCESS_TOKEN_SECRET и REFRESH_TOKEN_SECRET
```

### 2. Локальный запуск без контейнеров
```bash
cd my-app
npm install
npm run dev -- --hostname 0.0.0.0 --port 3000
```
Приложение будет доступно на http://localhost:3000. API использует SQLite-базу в `my-app/sqlite/parsetags.db`.

### 3. Запуск через Docker Compose
Для быстрого старта добавлены dev-секреты в `docker-compose.yml`.
```bash
docker compose up --build
```
- `nextjs` поднимет фронт+API на `http://localhost:3000`
- `mock` запустит вспомогательный сервер на `http://localhost:4000`
- `autotests` соберёт и запустит тесты из `testBaseAutoTest` (однократно)

При необходимости подставьте свои секреты через переменные окружения или `env_file`.

### 4. Jenkins локально
1. Запустите Jenkins в Docker:
   ```bash
   docker run -d -p 8080:8080 -p 50000:50000 \
     -v jenkins_home:/var/jenkins_home \
     -v $(pwd):/workspace/TestBase \
     --name testbase-jenkins jenkins/jenkins:lts
   ```
2. После первичной настройки создайте pipeline из `testBaseAutoTest/Jenkinsfile` (repo уже монтирован в `/workspace/TestBase`).
3. В node/global tool configuration добавьте JDK и Maven, а в job задайте переменные `ACCESS_TOKEN_SECRET` и `REFRESH_TOKEN_SECRET` для API.

### 5. Запуск тестов
- Unit-тесты фронтенда (Jest):
  ```bash
  cd my-app
  npm test -- --runInBand
  ```
- UI/API тесты Playwright (Allure репорт сохраняется в `./allure-results`):
  ```bash
  # приложение должно быть запущено на baseURL
  npx playwright test --config=playwright.config.js
  npx allure generate --clean allure-results --output allure-report
  ```
  Базовый URL можно поменять переменной `PLAYWRIGHT_BASE_URL`.
- Java API автотесты (Allure):
  ```bash
  cd testBaseAutoTest
  mvn clean test allure:report
  ```

## Автотесты (структура)
- Jest unit: `my-app/__tests__`
- Playwright UI+API: `tests/*.spec.js`
  - `tests/api.spec.js` — регистрация и авторизация
  - `tests/register.spec.js` — защищённые ручки `/api/click` и `/api/create`
- Java API: `testBaseAutoTest/src`

## Обновления v.0.1.15
- JWT-аутентификация на API, хранение токена на фронте
- UI и API автотесты на Playwright + Allure
- Dockerfiles и docker-compose для приложения, моков и автотестов
- Шаги для Allure-отчёта и отдельный сервис автотестов в Compose
