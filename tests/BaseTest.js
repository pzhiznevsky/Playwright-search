import { test as base, expect } from '@playwright/test';
import { config } from '../config/config';
import logger from '../utils/logger';

const fs = require('fs');
const path = require('path');
const logFilePath = path.resolve(__dirname, '../logs/test.log');

export const test = base.extend({
    page: async ({ page }, use) => {
        logger.info(`Navigating to ${config.baseURL}...`);
        await page.goto(config.baseURL);
        await use(page);
    }
});

function getTestName(testInfo, page) {
    const testName = testInfo.title || 'unnamed-test';
    const browser = page.context().browser()?.browserType().name() || 'unnamed-browser';
    return `${browser}-${testInfo.title.replace(/\s+/g, '_')}`;
}

async function captureScreenshotOnFailure(testInfo, page) {
    if (testInfo.status !== 'passed') {  // Check if the test failed
        const testName = getTestName(testInfo, page).replace(/[^a-zA-Z0-9]/g, '_');
        const screenshotPath = `screenshots/${testName}.png`;
        logger.info(`❌ Test failed! Capturing screenshot: ${screenshotPath}`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        logger.info(`Screenshot saved: ${screenshotPath}`);
    }
}

test.beforeAll(async () => {
    fs.writeFileSync(logFilePath, ''); // This will empty the file
});

test.beforeEach(async ({ page }, testInfo) => {
    const testName = getTestName(testInfo, page);
    const videoPath = `videos/${testName}.webm`;
    await page.context().tracing.start({ screenshots: true, snapshots: true });
    logger.info(`Starting ${testName}...`);
});

test.afterEach(async ({ page }, testInfo) => {
    await captureScreenshotOnFailure(testInfo, page);
    const testName = getTestName(testInfo, page);
    logger.info(`Finished ${testName}`);
    await page.context().tracing.stop();
});

export { expect };