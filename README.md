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

Секреты для JWT теперь создаются автоматически при первом обращении к API и сохраняются в `my-app/.local-secrets.json`. При желании можно переопределить их через `ACCESS_TOKEN_SECRET` и `REFRESH_TOKEN_SECRET` в окружении (или в `my-app/.env.local`).

### 2. Локальный запуск без контейнеров
```bash
cd my-app
npm install
export DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<db>?sslmode=disable" # например, из Railway или локального postgres
npm run dev -- --hostname 0.0.0.0 --port 3000
```
Приложение будет доступно на http://localhost:3000. API использует PostgreSQL (переменная `DATABASE_URL`). Если переменную не задать, приложение не сможет подключиться к БД.

### 3. Запуск через Docker Compose
Для быстрого старта добавлены dev-секреты и локальный PostgreSQL в `docker-compose.yml`.
```bash
docker compose up --build
```
- `postgres` поднимет локальную БД с пользователем/паролем/БД `testbase`
- `nextjs` поднимет фронт+API на `http://localhost:3000` и автоматически подключится к `postgres` через `DATABASE_URL`
- `mock` запустит вспомогательный сервер на `http://localhost:4000`
- `autotests` соберёт и запустит тесты из `testBaseAutoTest` (однократно)

При необходимости подставьте свои секреты или изменить креды БД через переменные окружения или `env_file`.

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
  - `tests/api.spec.js` — регистрация/авторизация, `/api/hello`, проверка доступа к защищённым ручкам
  - `tests/register.spec.js` — эндпоинты `/api/click`, `/api/create`, `/api/tasks`, `/api/bags`
- Java API: `testBaseAutoTest/src`

## Обновления (срез текущей работы)
- Переезд API на PostgreSQL с автоматическим созданием таблиц и индексом уникальности пользователей.
- Миграция таблиц: `create_task` → `task`, добавлена `bags`, перенос legacy-данных.
- Новые API ручки `/api/tasks` и `/api/bags` (GET/POST/DELETE), защита через JWT.
- Добавлены Playwright API-тесты, покрывающие все текущие эндпоинты приложения.
- Обучающие окна для практики DevTools/БД и заданий для junior QA.
- Экзамен расширен на 15 вопросов, отдельная страница `/exam`.

Предыдущие обновления из README удалены, чтобы не переполнять файл информацией.
