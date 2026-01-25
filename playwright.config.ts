/* eslint-disable max-lines */
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';


const VIEW_NORMAL = { width: 1024, height: 900 };
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VIEW_MOBILE = { width: 375, height: 667 };
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();
/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 2 * 60 * 1000,
  expect: {
    timeout: 10 * 1000,
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.3,
    },
  },
  testDir: './tests',
  // Folder for test artifacts such as screenshots, videos, traces, etc.
  outputDir: 'test-results',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 6,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.LINE_REPORT ? 'line' : [['list'], ['html']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Emulates the user locale.
    locale: 'es-ES',
    // Emulates the user timezone.
    timezoneId: 'Europe/Madrid',

    // User Agent específico para identificar tests de regresión
    userAgent: 'Mozilla/5.0 (EC; Redhat; Linux x86_64; rv:42.0) Firefox/42.0 TESTS REGRESION',

    /* Base URL to use in actions like `await page.goto('/V4')`. */
    baseURL: 'https://demo.guru99.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    screenshot: 'on',
    video: 'on',

    // Change the default data-testid attribute.
    testIdAttribute: 'data-uitest',

    headless: true,

    ignoreHTTPSErrors: true
  },

  /* Configure projects for major browsers */
  projects: [
    // SETUPS
    // TESTS - projects
    {
      name: 'Test PPIA - Chrome',
      testMatch: /.*\.generated\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: VIEW_NORMAL,
        isMobile: false
      },
      dependencies: [],
    },
    {
      name: 'Test PPIA - Firefox',
      testMatch: /.*\.generated\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        viewport: VIEW_NORMAL,
        isMobile: false
      },
      dependencies: [],
    },

    // NO LOGIN TESTS - projects
    {
      name: 'No Login Tests - Chrome',
      testMatch: /.*\.nologin\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: VIEW_NORMAL,
        isMobile: false
      },
      dependencies: [],
    },
    {
      name: 'No Login Tests - Firefox',
      testMatch: /.*\.nologin\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
        viewport: VIEW_NORMAL,
        isMobile: false
      },
      dependencies: [],
    },

    // {
    //   name: 'webkit',
    //   testMatch: /.*web.spec.ts/,
    //   use: { ...devices['Desktop Safari'],
    //     viewport: VIEW,
    //     isMobile: false },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   testMatch: /.*web.spec.ts/,
    //   use: { ...devices['Pixel 5'], isMobile: true },
    // }
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
