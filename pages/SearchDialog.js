import { BasePage as base } from './BasePage';
import { expect } from '@playwright/test';

export class SearchDialog extends base {
  constructor(page, window = "//div[contains(@class,'DocSearch-Container')]") {
    super(page);
    this.page = page;
    this.window = window;
    this.searchBoxLocator = this.window + '//input[@id="docsearch-input"]';
    this.searchBox = page.locator(this.searchBoxLocator);
    this.searchResultsLocator = this.window + '//li[@class="DocSearch-Hit"]//div[@class="DocSearch-Hit-content-wrapper"]//span';
    this.searchResults = page.locator(this.searchResultsLocator);
  }

  async waitForDialogLoad() {
    this.searchBox.waitFor();
  }

  async search(text) {
    this.waitForDialogLoad();
    await this.type(this.searchBox, text);
    this.validateTextEntered(text);
  }

  async validateTextEntered(text) {
    const valueAttr = await this.searchBox.getAttribute('value');
    expect(text).toEqual(valueAttr);
  }

  async getFirstResult() {
    const firstResult = await this.searchResults.first();
    return await firstResult.textContent();
  }

  async waitForText(text) {
    this.waitForSelector(this.searchResultsLocator);
    super.waitForText(this.searchResultsLocator, text);
  }

  async validateSearchResults(text) {
    this.waitForText(text);
    const firstResultText = await this.getFirstResult();
    expect(firstResultText).toContain(text);
  }
}