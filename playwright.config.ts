import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Ensure all statements end with a semicolon
  fullyParallel: true, // Run all tests in parallel
  workers: 6, // Adjust the number of workers based on your CPU (default is # of cores)
  use: {
    headless: false,
    trace: 'on-first-retry', // Captures trace when the test fails
    screenshot: 'only-on-failure', // Takes a screenshot only if the test fails
    video: 'retain-on-failure', // Records a video only on failure
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});