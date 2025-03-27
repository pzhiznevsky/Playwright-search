import { BasePage as base } from './BasePage';
import { SearchDialog } from './SearchDialog';

export class MainPage extends base {
  constructor(page, window = "//div[@id='__docusaurus']") {
    super(page);
    this.page = page;
    this.window = window;
    this.searchButton = page.locator(this.window + '//span[@class="DocSearch-Button-Placeholder"]');
    this.searchDialog = new SearchDialog(page);
  }

  async waitForPageLoad(){
    this.searchButton.waitForSelector();
  }

  async search(query) {
    await this.click(this.searchButton);
    await this.searchDialog.search(query);
  }

  async validateSearch(query) {
    this.searchDialog.validateSearchResults(query);
  }
}