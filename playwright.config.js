// @ts-check
// Включает проверку типов для JS/TS конфигов, помогает ловить ошибки на этапе редактирования

import { defineConfig, devices } from '@playwright/test';
// defineConfig — удобный хелпер для автокомплита и валидации конфига
// devices — набор готовых профилей браузеров и экранов

const baseURL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';

export default defineConfig({
  // Папка, где лежат e2e-тесты Playwright
  testDir: './tests',

  testMatch: [
    '**/*.spec.js',
    '**/*.spec.ts',
  ],

  // Разрешаем запуск тестов в разных файлах параллельно
  // Ускоряет прогоны локально и в CI
  fullyParallel: true,

  // Если в CI кто-то случайно оставил test.only — сборка упадёт
  // Защита от случайного коммита
  forbidOnly: !!process.env.CI,

  // Ретраи только в CI, локально — без повторов
  // В CI могут быть флаки из-за сети или нагрузки
  retries: process.env.CI ? 2 : 0,

  // В CI запускаем в один поток для стабильности
  // Локально Playwright сам подберёт количество воркеров
  workers: process.env.CI ? 1 : undefined,

  // Используем два репортера:
  // html — быстрый локальный отчёт
  // allure-playwright — основной отчёт для анализа и менеджеров
  reporter: [
    ['html'],
    ['allure-playwright'],
  ],

  // Общие настройки для всех тестов и браузеров
  use: {
    // Базовый URL приложения
    // Можно писать page.goto('/') вместо полного адреса
    baseURL,

    // Собираем trace только если тест упал и пошёл на ретрай
    // Очень помогает разбирать падения
    trace: 'on-first-retry',

    // (опционально, можно добавить позже)
    // screenshot: 'only-on-failure',
    // video: 'retain-on-failure',
  },

  // Набор браузеров, в которых будут запускаться тесты
  projects: [
    {
      // Основной браузер для автотестов
      // Используем встроенный Chromium, чтобы не тянуть внешний Chrome
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Автозапуск приложения перед тестами
  // Пока не используем, т.к. приложение поднимаем вручную
  // Когда понадобится CI — просто раскомментируем
  /*
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },
  */
});
