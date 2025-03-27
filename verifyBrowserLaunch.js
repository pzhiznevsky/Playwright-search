const { chromium } = require('playwright'); // or firefox, webkit

(async () => {
  try {
    console.log('Launching Chromium...');
    const browser = await chromium.launch({ headless: false }); // Change to true for headless mode
    const page = await browser.newPage();
    await page.goto('https://www.google.com');
    console.log('Browser launched and page loaded!');
    await browser.close();
  } catch (error) {
    console.error('Error launching the browser:', error);
  }
})();