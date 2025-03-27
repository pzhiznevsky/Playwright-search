import { config } from '../config/config';
import logger from '../utils/logger';

export class BasePage {

    constructor(page) {
      this.page = page;
      this.baseURL = config.baseURL;
    }

    async navigateTo(path) {
      const url = `${this.baseURL}${path}`;
      logger.info(`Navigating to: ${url}`);
      await this.page.goto(url);
    }
  
    async click(locator) {
      logger.info(`click on ${locator}...`);
      await locator.click();
    }
  
    async type(locator, text) {
      logger.info(`type ${text} into ${locator}...`);
      await locator.fill(text);
    }
  
    async getText(locator) {
      logger.info(`getText ${locator}...`);
      return await this.page.locator(locator).innerText();
    }
  
    async waitForElement(locator) {
      logger.info(`waitForElement ${locator}...`);
      await this.page.locator(locator).waitFor();
    }

    async waitForText(locator, expectedText, timeout = 5000) {
      logger.info(`waitForText "${expectedText}" in ${locator} with timeout ${timeout}...`);
      const startTime = Date.now();
      let i= 1;
      while (Date.now() - startTime < timeout) {
        let text = "";
        try{
          text = await this.page.locator(locator).first().innerText();
        } catch(error){
          logger.warn("ERROR: waitForText:" + i++ + " : " + error);
        }
        if (text && text.includes(expectedText)) {
          logger.info(`Text "${expectedText}" found in element.`);
          return;
        }
        await this.sleep(500);
      }
      const errorMessage = `Timeout: Element ${locator} did not contain "${expectedText}" within ${timeout}ms`;
      logger.error(errorMessage);
      throw new Error(errorMessage);
      }

      async waitForSelector(locator, timeout = 5000) {
        logger.info(`waitForSelector by ${locator} with timeout ${timeout}...`);
          const startTime = Date.now();
          let i= 1;
          while (Date.now() - startTime < timeout) {
            try{
              await this.page.locator(locator).first().waitFor({
                state: 'attached',
                timeout: timeout,
            });
              if (await this.page.locator(locator).count() > 0) {
                return;
              }
            } catch(error){
              logger.warn("ERROR: waitForSelector: " + i++ + " : " + error);
            }
            await this.sleep(500);
          }
          const errorMessage = `Timeout: Element ${locator} did not become visible within ${timeout}ms`;
          logger.error(errorMessage);
          throw new Error(errorMessage);
        }

        async sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
  }