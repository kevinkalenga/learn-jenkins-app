// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['junit', { outputFile: 'results.xml' }],
    ['html']
  ],
  use: {
    baseURL: process.env.CI_ENVIRONMENT_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npx serve -s build -l 3000',
    url: 'http://localhost:3000',
    timeout: 120 * 1000,          // Attendre jusqu'à 2 min pour que le serveur soit prêt
    reuseExistingServer: !process.env.CI,
  },
});