import { test, expect } from './BaseTest';
import { MainPage } from '../pages/MainPage';

  async function testSearchAndVerify(page, searchQuery) {
    const mainPage = new MainPage(page);
    await mainPage.search(searchQuery);
    await mainPage.validateSearch(searchQuery);
  }

  test.describe('Playwright Search Tests', () => {
    test('Validate search for Playwright', async ({ page }) => {
      await testSearchAndVerify(page, 'Playwright');
    });
  
    test('Validate search for Jest', async ({ page }) => {
      await testSearchAndVerify(page, 'Jest');
    });
  });