import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { DEFAULT_BASE_URL } from './infrastructure/constants';

// Load .env before the config below reads process.env.
dotenv.config({ path: path.resolve(__dirname, '.env') });

/** See https://playwright.dev/docs/test-configuration. */
export default defineConfig({
  testDir: './tests',

  /* Run test files in parallel. */
  fullyParallel: true,

  /* Fail the CI build if test.only is left in the source. */
  forbidOnly: !!process.env.CI,

  /* A flaky test must be fixed, not retried. */
  retries: 0,

  /* Single worker on CI for stable timing; let Playwright pick locally. */
  workers: process.env.CI ? 1 : undefined,

  reporter: [['list'], ['html', { open: 'never' }]],

  /* Generous timeouts — automationexercise.com is a public demo site and can be slow. */
  timeout: 60_000,
  expect: { timeout: 10_000 },

  /* Shared settings for all projects. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.BASE_URL ?? DEFAULT_BASE_URL,

    /* Headless by default (CI-friendly); run `npm run test:headed` to watch in a browser. */
    headless: !process.env.HEADED,

    /* The site exposes data-qa hooks, which getByTestId() targets. */
    testIdAttribute: 'data-qa',

    actionTimeout: 15_000,
    navigationTimeout: 30_000,

    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    /* Logs in once and saves storage state for the UI suite to reuse. */
    {
      name: 'setup',
      testMatch: '**/global.setup.ts',
    },
    {
      name: 'ui',
      testDir: './tests/ui',
      dependencies: ['setup'],
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'api',
      testDir: './tests/api',
    },
  ],
});
