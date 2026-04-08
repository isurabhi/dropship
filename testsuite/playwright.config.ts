import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'ui',
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        baseURL: process.env.UI_BASE_URL ?? 'http://localhost:5173',
        headless: true,
      },
    },
    {
      name: 'api',
      testMatch: /api\/.*\.spec\.ts/,
      use: {
        baseURL: process.env.API_BASE_URL ?? 'http://localhost:4000',
      },
    },
  ],
})
